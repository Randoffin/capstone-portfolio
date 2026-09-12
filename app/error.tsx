"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-16">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-700">
                    !
                </div>

                <h1 className="mt-5 text-xl font-semibold text-gray-900">
                    Something went wrong
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                    We couldn't load this page correctly. Please try again.
                </p>

                <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-6 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Try again
                </button>
            </div>
        </main>
    );
}