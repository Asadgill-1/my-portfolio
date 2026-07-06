"use client";

/* ============================================================================
   Scene3D — "Autonomous World" signature.
   ----------------------------------------------------------------------------
   A wireframe icosahedron "world" wraps three tilted orbital rings. Saffron
   nodes travel the rings; cobalt data-pulses run along the connection lines
   from the core outward. A slow camera dolly + mouse parallax add depth.

   The palette uses the WARM saffron + COOL cobalt internally (warm/cool
   contrast), distinct from the cyan-glow AI default.

   Performance & a11y:
   - dpr clamped [1, 1.75]
   - pauses when tab hidden
   - prefers-reduced-motion → static gradient panel (no WebGL)
   ========================================================================== */

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const SAFFRON = "#F5A524";
const COBALT = "#818CF8";
const BONE = "#ECE4D6";

/** Wireframe "world" sphere — the literal autonomous world. */
function WorldSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.05;
      mesh.current.rotation.x += delta * 0.02;
    }
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[3.1, 2]} />
      <meshBasicMaterial
        color={COBALT}
        wireframe
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/** Central core — saffron wireframe icosahedron, the "autonomous engine". */
function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.4;
      mesh.current.rotation.x += delta * 0.15;
    }
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.45, 1]} />
      <meshBasicMaterial
        color={SAFFRON}
        wireframe
        toneMapped={false}
      />
    </mesh>
  );
}

/** One orbital ring with traveling nodes. */
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
  const nodeRefs = useRef<THREE.Mesh[]>([]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * speed;
    const t = performance.now() * 0.001;
    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      const s = 1 + Math.sin(t * 2 + i) * 0.22;
      n.scale.setScalar(s);
    });
  });

  return (
    <group ref={group} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.007, 8, 128]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {Array.from({ length: nodeCount }).map((_, i) => {
        const angle = phase + (i / nodeCount) * Math.PI * 2;
        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) nodeRefs.current[i] = el;
            }}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0,
            ]}
          >
            <sphereGeometry args={[0.055, 16, 16]} />
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

/**
 * Data pulses — small bright sprites traveling from the core outward along
 * fixed radial paths. Reads as "data flowing through the system".
 */
function DataPulses({ count = 8 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<
    { mesh: THREE.Mesh; dir: THREE.Vector3; speed: number; t: number }[]
  >([]);

  useFrame((_, delta) => {
    pulses.current.forEach((p) => {
      if (!p.mesh) return;
      p.t += delta * p.speed;
      if (p.t > 1) p.t = 0; // loop back to core
      const r = p.t * 2.6;
      p.mesh.position.set(p.dir.x * r, p.dir.y * r, p.dir.z * r);
      const mat = p.mesh.material as THREE.MeshBasicMaterial;
      // Brighten mid-flight, dim near core/edge.
      mat.opacity = Math.sin(p.t * Math.PI) * 0.9;
    });
  });

  // Build pulses once.
  if (pulses.current.length === 0) {
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      );
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({
          color: BONE,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          toneMapped: false,
        })
      );
      pulses.current.push({ mesh, dir, speed: 0.3 + Math.random() * 0.4, t: Math.random() });
    }
  }

  return (
    <group ref={group}>
      {pulses.current.map((p, i) => (
        <primitive key={i} object={p.mesh} />
      ))}
    </group>
  );
}

/** Slow camera dolly + mouse parallax — depth without gimmick. */
function CameraRig() {
  const { camera, pointer } = useThree();
  const t = useRef(0);
  useFrame((_, delta) => {
    t.current += delta;
    // Slow orbit + pointer drift.
    const dx = pointer.x * 0.7 + Math.sin(t.current * 0.15) * 0.3;
    const dy = -pointer.y * 0.5 + Math.cos(t.current * 0.12) * 0.2;
    camera.position.x += (dx - camera.position.x) * 0.03;
    camera.position.y += (dy - camera.position.y) * 0.03;
    camera.position.z = 5.4 + Math.sin(t.current * 0.1) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.35} />
      <WorldSphere />
      <Core />
      <DataPulses count={10} />
      <OrbitRing
        radius={1.45}
        tilt={[0.4, 0.2, 0]}
        nodeCount={6}
        speed={0.2}
        color={COBALT}
      />
      <OrbitRing
        radius={1.95}
        tilt={[-0.5, 0.6, 0.3]}
        nodeCount={9}
        speed={0.13}
        color={SAFFRON}
        phase={1.2}
      />
      <OrbitRing
        radius={2.45}
        tilt={[0.8, -0.3, -0.4]}
        nodeCount={5}
        speed={0.09}
        color={COBALT}
        phase={2.4}
      />
      <EffectComposer>
        <Bloom
          intensity={0.85}
          luminanceThreshold={0.12}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/** Static fallback for reduced-motion users. */
function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(245,165,36,0.16) 0%, transparent 42%), radial-gradient(circle at 62% 38%, rgba(129,140,248,0.14) 0%, transparent 38%), var(--ink)",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring"
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          border: "1px solid rgba(245,165,36,0.4)",
          boxShadow: "0 0 90px rgba(245,165,36,0.25)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "1px solid rgba(129,140,248,0.18)",
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

  if (!mounted || reduceMotion) return <StaticFallback />;

  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
