"use client";

import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

type ButtonState = "idle" | "loading" | "success" | "error";

export type StatefulButtonHandle = {
    trigger: (result?: "success" | "error") => void;
    reset: () => void;
};

type StatefulButtonProps = {
    onComplete?: (success: boolean) => void;
};

const StatefulButton = forwardRef<
    StatefulButtonHandle,
    StatefulButtonProps
>(function StatefulButton({ onComplete }, ref) {
    const [state, setState] = useState<ButtonState>("idle");

    const actionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );
    const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const clearTimers = () => {
        if (actionTimerRef.current) {
            clearTimeout(actionTimerRef.current);
            actionTimerRef.current = null;
        }

        if (successTimerRef.current) {
            clearTimeout(successTimerRef.current);
            successTimerRef.current = null;
        }
    };

    const runAction = (forcedResult?: "success" | "error") => {
        if (state === "loading") {
            return;
        }

        clearTimers();
        setState("loading");

        const delay = 800 + Math.random() * 1000;

        actionTimerRef.current = setTimeout(() => {
            const success =
                forcedResult !== undefined
                    ? forcedResult === "success"
                    : Math.random() >= 0.2;

            setState(success ? "success" : "error");

            onComplete?.(success);

            if (success) {
                successTimerRef.current = setTimeout(() => {
                    setState("idle");
                }, 1200);
            }
        }, delay);
    };

    const reset = () => {
        clearTimers();
        setState("idle");
    };

    useImperativeHandle(
        ref,
        () => ({
            trigger: runAction,
            reset,
        }),
        [state],
    );

    useEffect(() => {
        return () => {
            clearTimers();
        };
    }, []);

    const handleClick = () => {
        if (state === "error") {
            runAction("success");
            return;
        }

        runAction();
    };

    const isLoading = state === "loading";

    return (
        <button
            type="button"
            disabled={isLoading}
            onClick={handleClick}
            aria-label={
                state === "loading"
                    ? "Sending"
                    : state === "success"
                      ? "Message sent"
                      : state === "error"
                        ? "Retry sending"
                        : "Send message"
            }
            className={`
                relative inline-flex min-w-[150px] items-center justify-center
                gap-2 overflow-hidden rounded-xl px-5 py-3
                text-sm font-semibold text-white
                shadow-sm
                transition-all duration-200 ease-out
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-80
                motion-reduce:transition-none
                ${
                    state === "error"
                        ? "bg-red-600 hover:bg-red-700 motion-safe:animate-[shake_400ms_ease-in-out]"
                        : state === "success"
                          ? "bg-accent"
                          : "bg-primary hover:scale-[1.02] hover:opacity-95 active:scale-[0.98]"
                }
            `}
        >
            <span
                className="
                    inline-flex items-center justify-center gap-2
                    transition-all duration-200 ease-out
                    motion-reduce:transition-none
                "
            >
                {state === "idle" && (
                    <>
                        <span>Send</span>
                        <span aria-hidden="true">→</span>
                    </>
                )}

                {state === "loading" && (
                    <>
                        <span
                            aria-hidden="true"
                            className="
                                h-4 w-4 animate-spin rounded-full
                                border-2 border-white/40 border-t-white
                                motion-reduce:animate-none
                            "
                        />
                        <span>Sending...</span>
                    </>
                )}

                {state === "success" && (
                    <>
                        <span
                            aria-hidden="true"
                            className="text-base"
                        >
                            ✓
                        </span>
                        <span>Sent</span>
                    </>
                )}

                {state === "error" && (
                    <>
                        <span
                            aria-hidden="true"
                            className="text-base"
                        >
                            ↻
                        </span>
                        <span>Retry</span>
                    </>
                )}
            </span>
        </button>
    );
});

export default StatefulButton;