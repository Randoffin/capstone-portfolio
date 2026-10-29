"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const InteractiveLamp = dynamic(
  () => import("@/components/fe-aa2/InteractiveLamp"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[380px] items-center justify-center rounded-2xl bg-slate-100 text-slate-600 sm:h-[480px]">
        Loading 3D studio...
      </div>
    ),
  }
);

const lampColors = [
  { name: "Ocean Blue", value: "#2563eb" },
  { name: "Forest Green", value: "#16805d" },
  { name: "Sunset Orange", value: "#ea580c" },
  { name: "Midnight Black", value: "#252a34" },
];

export default function FEAA2Page() {
  const [color, setColor] = useState(lampColors[0].value);
  const [isOn, setIsOn] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Frontend AI Engineering · FE-AA2
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Your lamp. Your studio.
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Explore a real-time 3D desk lamp. Change its finish, switch on the
            light, and drag the scene to inspect your design from different
            angles.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <InteractiveLamp
              key={resetKey}
              color={color}
              isOn={isOn}
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
              <span>Drag to rotate · Scroll or pinch to zoom</span>

              <button
                type="button"
                onClick={() => setResetKey((key) => key + 1)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Reset view
              </button>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Customize your lamp</h2>

            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-slate-600">
                Choose a finish
              </p>

              <div className="grid grid-cols-2 gap-3">
                {lampColors.map((lampColor) => {
                  const selected = color === lampColor.value;

                  return (
                    <button
                      key={lampColor.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setColor(lampColor.value)}
                      className={`rounded-xl border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                        selected
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      <span
                        className="mb-2 block h-8 w-8 rounded-full border border-black/10"
                        style={{ backgroundColor: lampColor.value }}
                      />

                      <span className="text-sm font-medium">
                        {lampColor.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 border-t border-slate-200 pt-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">Lamp illumination</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {isOn ? "Light is on" : "Light is off"}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={isOn}
                  aria-label="Lamp power"
                  onClick={() => setIsOn((value) => !value)}
                  className={`relative h-7 w-12 rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    isOn ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                      isOn ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-7 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold">Studio controls</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Rotate the lamp with your mouse or finger. Use the zoom gesture
                to get a closer look. Select a different finish to update the
                3D model instantly.
              </p>
            </div>
          </aside>
        </section>

        <footer className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500">
          FE-AA2 · Interactive 3D experience built with Three.js and React Three
          Fiber.
        </footer>
      </div>
    </main>
  );
}