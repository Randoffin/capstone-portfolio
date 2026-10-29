"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import type { ReactNode } from "react";
import type * as THREE from "three";

interface LampProps {
  color: string;
  isOn: boolean;
}

function WebGLFallback() {
  return (
    <div className="flex h-full min-h-[320px] w-full items-center justify-center rounded-2xl border border-gray-200 bg-gray-100 p-6 text-center text-gray-700">
      <div>
        <p className="text-lg font-semibold">
          3D preview is unavailable
        </p>
        <p className="mt-2 text-sm">
          Your browser or device could not start WebGL.
          Try enabling hardware acceleration or using a
          browser that supports WebGL.
        </p>
      </div>
    </div>
  );
}

function LampModel({
  color,
  isOn,
}: LampProps) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.2}
      />

      <group position={[0, -0.7, 0]}>
        {/* Desk lamp base */}
        <mesh
          position={[0, 0.12, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.85, 0.95, 0.22, 32]} />
          <meshStandardMaterial
            color="#303744"
            metalness={0.65}
            roughness={0.3}
          />
        </mesh>

        {/* Base collar */}
        <mesh
          position={[0, 0.28, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.2, 0.24, 0.16, 24]} />
          <meshStandardMaterial
            color="#687386"
            metalness={0.7}
            roughness={0.28}
          />
        </mesh>

        {/* Upright stem */}
        <mesh
          position={[0, 1.05, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.075, 0.11, 1.45, 20]} />
          <meshStandardMaterial
            color="#687386"
            metalness={0.65}
            roughness={0.3}
          />
        </mesh>

        {/* Adjustable joint */}
        <mesh
          position={[0, 1.82, 0]}
          castShadow
        >
          <sphereGeometry args={[0.19, 20, 16]} />
          <meshStandardMaterial
            color="#303744"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Angled lamp arm */}
        <mesh
          position={[0.32, 2.02, 0]}
          rotation={[0, 0, -Math.PI / 4]}
          castShadow
        >
          <cylinderGeometry args={[0.065, 0.065, 0.95, 16]} />
          <meshStandardMaterial
            color="#687386"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Lamp head */}
        <group
          position={[0.67, 2.35, 0]}
          rotation={[0, 0, -Math.PI / 5]}
        >
          <mesh castShadow>
            <cylinderGeometry
              args={[0.24, 0.55, 0.55, 32, 1, false]}
            />
            <meshStandardMaterial
              color={color}
              metalness={0.35}
              roughness={0.32}
            />
          </mesh>

          {/* Light-emitting underside */}
          <mesh
            position={[0, -0.28, 0]}
            rotation={[Math.PI, 0, 0]}
          >
            <circleGeometry args={[0.42, 32]} />
            <meshStandardMaterial
              color={isOn ? "#fff4c2" : "#b8bdc7"}
              emissive={isOn ? "#ffe7a0" : "#000000"}
              emissiveIntensity={isOn ? 1.4 : 0}
              side={2}
            />
          </mesh>

          {/* Visible light when switched on */}
          {isOn && (
            <pointLight
              position={[0, -0.35, 0.12]}
              color="#ffe5a3"
              intensity={28}
              distance={5}
              decay={2}
            />
          )}
        </group>
      </group>

      {/* Desk surface */}
      <mesh
        position={[0, -0.73, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <shadowMaterial opacity={0.18} />
      </mesh>

      <ContactShadows
        position={[0, -0.71, 0]}
        opacity={0.4}
        scale={5}
        blur={2}
        far={3}
        resolution={256}
      />
    </>
  );
}

export default function InteractiveLamp({
  color,
  isOn,
}: LampProps) {
  const [webGLAvailable, setWebGLAvailable] =
    useState<boolean | null>(null);

  const [reducedMotion, setReducedMotion] =
    useState(false);

  useEffect(() => {
    let available = false;

    try {
      const canvas = document.createElement("canvas");

      const gl =
        (canvas.getContext(
          "webgl2"
        ) as WebGL2RenderingContext | null) ??
        (canvas.getContext(
          "webgl"
        ) as WebGLRenderingContext | null) ??
        (canvas.getContext(
          "experimental-webgl"
        ) as WebGLRenderingContext | null);

      available = Boolean(gl);

      if (gl) {
        gl
          .getExtension("WEBGL_lose_context")
          ?.loseContext();
      }
    } catch {
      available = false;
    }

    setWebGLAvailable(available);

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener(
      "change",
      updateMotionPreference
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMotionPreference
      );
    };
  }, []);

  if (webGLAvailable === null) {
    return (
      <div
        className="flex min-h-[320px] w-full items-center justify-center rounded-2xl bg-gray-100"
        role="status"
      >
        <span className="text-sm text-gray-600">
          Preparing 3D preview...
        </span>
      </div>
    );
  }

  if (!webGLAvailable) {
    return <WebGLFallback />;
  }

  const canvasFallback: ReactNode = <WebGLFallback />;

  return (
    <div className="h-full min-h-[320px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-slate-200">
      <Canvas
        shadows
        dpr={[1, 1.25]}
        camera={{
          position: [4, 3.5, 5],
          fov: 42,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: false,
          powerPreference: "low-power",
        }}
        fallback={canvasFallback}
      >
        <color attach="background" args={["#f1f5f9"]} />

        <LampModel color={color} isOn={isOn} />

        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping={!reducedMotion}
          dampingFactor={0.08}
          minDistance={3}
          maxDistance={9}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2 - 0.05}
          rotateSpeed={0.7}
        />
      </Canvas>
    </div>
  );
}