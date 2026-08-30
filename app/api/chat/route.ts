import {
    convertToModelMessages,
    streamText,
    type UIMessage,
} from "ai";

import { chatModel, chatSystemPrompt } from "../../../lib/ai/config";

export async function POST(req: Request) {
    try {
        const { messages }: { messages: UIMessage[] } = await req.json();

        const result = streamText({
            model: chatModel,
            system: chatSystemPrompt,
            messages: await convertToModelMessages(messages),

            // Allows the client Stop button to abort the server-side
            // model request through the request signal.
            abortSignal: req.signal,
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("Chat route error:", error);

        return new Response(
            JSON.stringify({
                error: "Unable to process the chat request.",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }
}