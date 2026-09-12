"use client";

import { useEffect, useRef, useState } from "react";
import {
    DefaultChatTransport,
    type ToolUIPart,
} from "ai";
import { useChat } from "@ai-sdk/react";

import MetaTagsCard from "./MetaTagsCard";

// ============================================================
// PHASE 5C Typed tool part
// ============================================================

type FetchMetaTagsUIPart = ToolUIPart<{
    fetchMetaTags: {
        input: {
            url: string;
        };
        output: {
            url: string;
            title: string | null;
            description: string | null;
            canonical: string | null;
            ogTitle: string | null;
            ogDescription: string | null;
            ogImage: string | null;
            twitterCard: string | null;
        };
    };
}>;

// ============================================================
// PHASE 5D Tool lifecycle renderer
// ============================================================

function FetchMetaTagsPart({
    part,
}: {
    part: FetchMetaTagsUIPart;
}) {
    switch (part.state) {
        case "input-streaming":
            return (
                <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <span
                            className="h-2 w-2 animate-pulse rounded-full bg-blue-500"
                            aria-hidden="true"
                        />

                        <span className="text-sm font-medium text-blue-800">
                            Preparing webpage analysis...
                        </span>
                    </div>

                    {part.input?.url && (
                        <p className="mt-2 break-all text-xs text-blue-700">
                            {part.input.url}
                        </p>
                    )}
                </div>
            );

        case "input-available":
            return (
                <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-sm font-semibold text-amber-800">
                        Tool ready
                    </p>

                    <p className="mt-1 break-all text-xs text-amber-700">
                        Analyzing: {part.input.url}
                    </p>
                </div>
            );

        case "output-available":
            return <MetaTagsCard result={part.output} />;

        case "output-error":
            return (
                <div
                    role="alert"
                    className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4"
                >
                    <div className="flex items-start gap-3">
                        <span
                            className="text-lg"
                            aria-hidden="true"
                        >
                        
                        </span>

                        <div>
                            <h3 className="font-semibold text-red-800">
                                Tool execution failed
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-red-700">
                                We couldn't fetch metadata from this
                                webpage. Please check the URL and try
                                again.
                            </p>

                            {part.errorText && (
                                <p className="mt-2 text-xs text-red-600">
                                    {part.errorText}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            );

        default:
            return null;
    }
}

// ============================================================
// EXISTING CHAT COMPONENT
// ============================================================

export default function Chat() {
    const [input, setInput] = useState("");

    const {
        messages,
        sendMessage,
        status,
        stop,
        error,
        regenerate,
    } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/chat",
        }),
    });

    const messagesRef = useRef<HTMLDivElement | null>(null);
    const shouldAutoScrollRef = useRef(true);

    const isBusy =
        status === "submitted" ||
        status === "streaming";

    const scrollToBottom = () => {
        const container = messagesRef.current;

        if (!container) {
            return;
        }

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });
    };

    const handleScroll = () => {
        const container = messagesRef.current;

        if (!container) {
            return;
        }

        const distanceFromBottom =
            container.scrollHeight -
            container.scrollTop -
            container.clientHeight;

        shouldAutoScrollRef.current =
            distanceFromBottom < 80;
    };

    useEffect(() => {
        if (shouldAutoScrollRef.current) {
            scrollToBottom();
        }
    }, [messages]);

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const trimmedInput = input.trim();

        if (!trimmedInput || isBusy) {
            return;
        }

        sendMessage({
            text: trimmedInput,
        });

        setInput("");
        shouldAutoScrollRef.current = true;
    };

    const handleSuggestedPrompt = (prompt: string) => {
        if (isBusy) {
            return;
        }

        sendMessage({
            text: prompt,
        });

        shouldAutoScrollRef.current = true;
    };

    return (
        <section className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <header className="border-b border-gray-200 px-4 py-4 sm:px-6">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                    AI Portfolio Assistant
                </h1>

                <p className="mt-1 text-sm text-gray-600">
                    Ask about the projects, technologies, and development
                    approach presented in this portfolio.
                </p>
            </header>

            <div
                ref={messagesRef}
                onScroll={handleScroll}
                className="min-h-[420px] max-h-[60vh] flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6"
            >
                {messages.length === 0 && (
                    <div className="flex min-h-[320px] items-center justify-center text-center">
                        <div className="w-full max-w-md">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Start a conversation
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Choose a question below or type your own
                                message to explore this portfolio.
                            </p>

                            <div className="mt-5 flex flex-col gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSuggestedPrompt(
                                            "What technologies are used in this portfolio?",
                                        )
                                    }
                                    disabled={isBusy}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm text-gray-700 transition hover:border-primary hover:bg-blue-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    What technologies are used in this
                                    portfolio?
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSuggestedPrompt(
                                            "Tell me about the projects in this portfolio.",
                                        )
                                    }
                                    disabled={isBusy}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm text-gray-700 transition hover:border-primary hover:bg-blue-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Tell me about the projects in this
                                    portfolio.
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSuggestedPrompt(
                                            "How was this portfolio developed?",
                                        )
                                    }
                                    disabled={isBusy}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm text-gray-700 transition hover:border-primary hover:bg-blue-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    How was this portfolio developed?
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {messages.map((message) => {
                    const isUser = message.role === "user";

                    return (
                        <div
                            key={message.id}
                            className={`flex ${
                                isUser
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[75%] ${
                                    isUser
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-900"
                                }`}
                            >
                                <div className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-70">
                                    {isUser
                                        ? "You"
                                        : "AI Assistant"}
                                </div>

                                <div className="space-y-2">
                                    {/* ==================================================
                                        PHASE 5E Render typed message parts
                                    ================================================== */}

                                    {message.parts.map(
                                        (part, index) => {
                                            if (
                                                part.type ===
                                                "text"
                                            ) {
                                                return (
                                                    <p
                                                        key={`${message.id}-${index}`}
                                                        className="whitespace-pre-wrap"
                                                    >
                                                        {part.text}
                                                    </p>
                                                );
                                            }

                                            if (
                                                part.type ===
                                                "tool-fetchMetaTags"
                                            ) {
                                                return (
                                                    <FetchMetaTagsPart
                                                        key={`${message.id}-${index}`}
                                                        part={
                                                            part as FetchMetaTagsUIPart
                                                        }
                                                    />
                                                );
                                            }

                                            return null;
                                        },
                                    )}

                                    {message.role ===
                                        "assistant" &&
                                        message.parts.length ===
                                            0 &&
                                        status ===
                                            "submitted" && (
                                            <div
                                                className="flex items-center gap-2"
                                                aria-live="polite"
                                            >
                                                <span
                                                    className="h-2 w-2 animate-pulse rounded-full bg-gray-500"
                                                    aria-hidden="true"
                                                />

                                                <span>
                                                    Thinking...
                                                </span>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isBusy && (
                <div className="border-t border-gray-100 px-4 py-2 sm:px-6">
                    <button
                        type="button"
                        onClick={() => stop()}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        Stop
                    </button>
                </div>
            )}

            {error && (
                <div
                    role="alert"
                    className="border-t border-red-200 bg-red-50 px-4 py-4 sm:px-6"
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-red-800">
                                Something went wrong
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-red-700">
                                We couldn't complete that response. Please try again.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => regenerate()}
                            className="shrink-0 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="border-t border-gray-200 p-3 sm:p-4"
            >
                <div className="flex items-end gap-2">
                    <textarea
                        value={input}
                        onChange={(event) =>
                            setInput(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (
                                event.key === "Enter" &&
                                !event.shiftKey
                            ) {
                                event.preventDefault();

                                if (
                                    input.trim() &&
                                    !isBusy
                                ) {
                                    event.currentTarget.form?.requestSubmit();
                                }
                            }
                        }}
                        rows={2}
                        placeholder="Ask about this portfolio..."
                        aria-label="Chat message"
                        disabled={isBusy}
                        className="min-h-[52px] flex-1 resize-none rounded-xl border border-gray-300 px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100"
                    />

                    <button
                        type="submit"
                        disabled={!input.trim() || isBusy}
                        className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Send
                    </button>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                    Enter to send · Shift + Enter for a new line
                </p>
            </form>
        </section>
    );
}

                  