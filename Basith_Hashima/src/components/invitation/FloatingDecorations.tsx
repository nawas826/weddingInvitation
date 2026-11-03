import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function makeDot() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,240,200,1)");
  grad.addColorStop(0.3, "rgba(230,195,120,0.7)");
  grad.addColorStop(1, "rgba(230,195,120,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(makeDot, []);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 14;
      p[i * 3 + 1] = (Math.random() - 0.5) * 12;
      p[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return p;
  }, [count]);
  useFrame((_, d) => {
    const dt = Math.min(d, 0.05);
    const pts = ref.current;
    if (!pts) return;
    const a = pts.geometry.attributes["position"] as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = a.getY(i) + dt * (0.12 + (i % 5) * 0.03);
      if (y > 6) y = -6;
      a.setY(i, y);
      a.setX(i, a.getX(i) + Math.sin(y + i) * dt * 0.05);
    }
    a.needsUpdate = true;
    pts.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial map={tex} size={0.12} transparent depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

function Petals({ count }: { count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 12,
        y: Math.random() * 12 - 6,
        z: (Math.random() - 0.5) * 4,
        s: 0.4 + Math.random() * 0.6,
        r: Math.random() * Math.PI,
        sp: 0.2 + Math.random() * 0.3,
      })),
    [count],
  );
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.08, 0.06, 0.08, 0.16, 0, 0.22);
    shape.bezierCurveTo(-0.08, 0.16, -0.08, 0.06, 0, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);
  const m = useMemo(() => new THREE.Object3D(), []);
  useFrame((st, d) => {
    const dt = Math.min(d, 0.05);
    const t = st.clock.elapsedTime;
    data.forEach((p, i) => {
      p.y -= dt * p.sp;
      if (p.y < -6) p.y = 6;
      m.position.set(p.x + Math.sin(t * 0.5 + i) * 0.4, p.y, p.z);
      m.rotation.set(t * 0.6 + p.r, t * 0.4 + i, p.r);
      m.scale.setScalar(p.s);
      m.updateMatrix();
      ref.current?.setMatrixAt(i, m.matrix);
    });
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[geo, undefined, count]}>
      <meshStandardMaterial color="#f3e6cf" side={THREE.DoubleSide} transparent opacity={0.75} roughness={0.6} />
    </instancedMesh>
  );
}

export default function FloatingDecorations({ petals = true }: { petals?: boolean }) {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <div className="pointer-events-none fixed inset-0 z-10" aria-hidden>
      <Canvas dpr={[1, mobile ? 1.25 : 1.75]} camera={{ position: [0, 0, 6], fov: 60 }} gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 4, 3]} intensity={1.2} color="#ffe8b8" />
        <Dust count={mobile ? 120 : 260} />
        {petals && <Petals count={mobile ? 10 : 18} />}
      </Canvas>
    </div>
  );
}
