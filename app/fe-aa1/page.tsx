"use client";

import { useRef, useState } from "react";
import StatefulButton, {
    type StatefulButtonHandle,
} from "../../components/StatefulButton";

type DemoState = "idle" | "success" | "error";

export default function FEAA1Page() {
    const buttonRef = useRef<StatefulButtonHandle>(null);
    const [demoState, setDemoState] = useState<DemoState>("idle");

    const handleComplete = (success: boolean) => {
        setDemoState(success ? "success" : "error");
    };

    const triggerSuccess = () => {
        setDemoState("idle");
        buttonRef.current?.trigger("success");
    };

    const triggerError = () => {
        setDemoState("idle");
        buttonRef.current?.trigger("error");
    };

    const resetDemo = () => {
        buttonRef.current?.reset();
        setDemoState("idle");
    };

    return (
        <main className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-16">
            <div className="mx-auto w-full max-w-3xl">
                <header className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        FE-AA1
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                        Buttons with a Brain
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                        Motion & State Micro-interactions
                    </p>
                </header>

                <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900">
                            AI Send Button
                        </h2>

                        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
                            A reusable stateful button that communicates its
                            complete lifecycle from idle to loading, success,
                            or error.
                        </p>
                    </div>

                    <div className="mt-8 flex min-h-32 items-center justify-center">
                        <StatefulButton
                            ref={buttonRef}
                            onComplete={handleComplete}
                        />
                    </div>

                    <div
                        className="mt-6 rounded-xl bg-gray-50 p-4 text-center"
                        aria-live="polite"
                    >
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Last completed state
                        </p>

                        <p
                            className={`mt-2 text-sm font-semibold ${
                                demoState === "success"
                                    ? "text-accent"
                                    : demoState === "error"
                                      ? "text-red-600"
                                      : "text-gray-700"
                            }`}
                        >
                            {demoState === "idle" && "Idle"}
                            {demoState === "success" && "Success"}
                            {demoState === "error" && "Error"}
                        </p>
                    </div>

                    <div className="mt-6">
                        <p className="text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                            Demo controls
                        </p>

                        <div className="mt-3 flex flex-wrap justify-center gap-3">
                            <button
                                type="button"
                                onClick={triggerSuccess}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
                            >
                                Force Success
                            </button>

                            <button
                                type="button"
                                onClick={triggerError}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
                            >
                                Force Error
                            </button>

                            <button
                                type="button"
                                onClick={resetDemo}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </section>

                <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Motion decisions
                    </h2>

                    <div className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                        <p>
                            <strong>Hover and focus:</strong> short 200ms
                            transitions provide immediate feedback without
                            making the button feel slow.
                        </p>

                        <p>
                            <strong>Loading:</strong> the spinner uses a
                            continuous animation while the simulated action is
                            processing.
                        </p>

                        <p>
                            <strong>Success:</strong> the successful state
                            remains visible briefly before returning to idle,
                            giving the user time to recognize the result.
                        </p>

                        <p>
                            <strong>Error:</strong> the button changes to a
                            retry action and uses a short shake to draw
                            attention to the failed operation.
                        </p>

                        <p>
                            <strong>Motion properties:</strong> interaction
                            feedback primarily uses transform and opacity,
                            avoiding unnecessary layout changes.
                        </p>

                        <p>
                            <strong>Reduced motion:</strong>{" "}
                            <code>prefers-reduced-motion</code> disables
                            unnecessary movement while preserving the visual
                            state feedback.
                        </p>
                    </div>
                </section>

                <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-lg font-semibold text-gray-900">
                        States covered
                    </h2>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {[
                            ["Idle", "Ready for interaction"],
                            ["Hover / Focus", "Interactive feedback"],
                            ["Loading", "Action in progress"],
                            ["Success", "Action completed"],
                            ["Error", "Action failed with retry"],
                            ["Disabled", "Unavailable while loading"],
                        ].map(([name, description]) => (
                            <div
                                key={name}
                                className="rounded-xl border border-gray-200 p-4"
                            >
                                <p className="text-sm font-semibold text-gray-900">
                                    {name}
                                </p>
                                <p className="mt-1 text-sm text-gray-600">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}