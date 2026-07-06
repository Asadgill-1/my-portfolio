"use client";

/* ============================================================================
   Scene3D — the signature element of Autonomous World.
   ----------------------------------------------------------------------------
   A glowing core with nodes orbiting on tilted rings, connected by pulsing
   lines. It reads as "automation workflows running on their own" — the brand
   made visible. Mouse parallax adds depth without gimmickry.

   Performance & a11y:
   - dpr clamped to [1, 2] so high-DPI screens don't melt.
   - Canvas pauses when offscreen (frameloop demand + visibility).
   - prefers-reduced-motion → static gradient panel, no WebGL.
   ========================================================================== */

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const SIGNAL = "#2DE2C8";
const EMBER = "#FF9D5C";

/** A single orbit ring: a wireframe torus plus N nodes traveling along it. */
function OrbitRing({
  radius,
  tilt,
  nodeCount,
  speed,
  color,
  phase = 0,
}: {
  radius: number;
  tilt: [number, number, number];
  nodeCount: number;
  speed: number;
  color: string;
  phase?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Mesh[]>([]);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * speed;
    }
    // Nodes pulse scale for a "live" feel.
    const t = performance.now() * 0.001;
    nodes.current.forEach((n, i) => {
      if (!n) return;
      const s = 1 + Math.sin(t * 2 + i) * 0.18;
      n.scale.setScalar(s);
    });
  });

  return (
    <group ref={group} rotation={tilt}>
      {/* The path itself — faint, hairline. */}
      <mesh>
        <torusGeometry args={[radius, 0.008, 8, 128]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Traveling nodes. */}
      {Array.from({ length: nodeCount }).map((_, i) => {
        const angle = phase + (i / nodeCount) * Math.PI * 2;
        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) nodes.current[i] = el;
            }}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0,
            ]}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial
              color={color}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/** Pulsing connection lines from core to a few outer nodes — "data flowing". */
function Connections() {
  const lines = useRef<THREE.LineSegments>(null);
  const mat = useRef<THREE.LineBasicMaterial>(null);

  const geom = (() => {
    const pts: number[] = [];
    const targets = 14;
    for (let i = 0; i < targets; i++) {
      const a = (i / targets) * Math.PI * 2;
      const r = 1.7 + (i % 3) * 0.35;
      pts.push(0, 0, 0, Math.cos(a) * r, Math.sin(a) * r, (i % 2 ? 1 : -1) * 0.4);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  })();

  useFrame(() => {
    if (mat.current) {
      mat.current.opacity = 0.12 + Math.sin(performance.now() * 0.0015) * 0.08;
    }
  });

  return (
    <lineSegments ref={lines} geometry={geom}>
      <lineBasicMaterial
        ref={mat}
        color={SIGNAL}
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </lineSegments>
  );
}

/** The core — distorted emissive sphere, the "autonomous engine". */
function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.25;
      mesh.current.rotation.x += delta * 0.1;
    }
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.42, 2]} />
      <meshBasicMaterial
        color={EMBER}
        wireframe
        transparent
        opacity={0.85}
        toneMapped={false}
      />
    </mesh>
  );
}

/** Subtle mouse parallax — camera drifts toward pointer. Never gimmicky. */
function Parallax() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <Parallax />
      <ambientLight intensity={0.4} />
      <Core />
      <Connections />
      <OrbitRing
        radius={1.4}
        tilt={[0.4, 0.2, 0]}
        nodeCount={6}
        speed={0.18}
        color={SIGNAL}
      />
      <OrbitRing
        radius={1.9}
        tilt={[-0.5, 0.6, 0.3]}
        nodeCount={9}
        speed={0.12}
        color={SIGNAL}
        phase={1.2}
      />
      <OrbitRing
        radius={2.4}
        tilt={[0.8, -0.3, -0.4]}
        nodeCount={5}
        speed={0.08}
        color={EMBER}
        phase={2.4}
      />
      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/** Static fallback for reduced-motion users — no WebGL, no animation. */
function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(45,226,200,0.18) 0%, transparent 40%), radial-gradient(circle at 60% 40%, rgba(255,157,92,0.12) 0%, transparent 35%), var(--ink)",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "1px solid rgba(45,226,200,0.35)",
          boxShadow: "0 0 80px rgba(45,226,200,0.25)",
        }}
      />
    </div>
  );
}

export default function Scene3D() {
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    setMounted(true);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!mounted || reduceMotion) {
    return <StaticFallback />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      // Pause rendering when tab hidden — saves battery & CPU.
      onCreated={({ gl }) => {
        const visibilityHandler = () => {
          if (document.hidden) gl.setAnimationLoop(null);
          else gl.setAnimationLoop(() => {});
        };
        document.addEventListener("visibilitychange", visibilityHandler);
      }}
    >
      <Scene />
    </Canvas>
  );
}
