/* NodeWeb renders the home-page network background.
 * The scene keeps its graph data memoized, caps renderer cost, and falls back to a static gradient on mobile or reduced motion.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface NodeData {
  position: [number, number, number];
  phase: number;
  tintBias: number;
}

interface GraphData {
  positions: Float32Array;
  colors: Float32Array;
  edges: Float32Array;
  nodes: NodeData[];
}

const NODE_COUNT = 80;
const NODE_SPREAD_X = 20;
const NODE_SPREAD_Y = 20;
const NODE_SPREAD_Z = 10;
const MAX_EDGE_DISTANCE = 3.05;
const MAX_NEIGHBORS = 3;
const CAMERA_MIN_Z = 6;
const CAMERA_MAX_Z = 12;
const CAMERA_DRIFT_X = 0.12;
const CAMERA_DRIFT_Y = 0.08;
const CAMERA_LERP = 0.045;
const POINT_SIZE = 0.14;

const createGraph = (): GraphData => {
  const nodes: NodeData[] = [];
  const positions = new Float32Array(NODE_COUNT * 3);
  const colors = new Float32Array(NODE_COUNT * 3);

  for (let index = 0; index < NODE_COUNT; index += 1) {
    const position: [number, number, number] = [
      Math.random() * NODE_SPREAD_X - NODE_SPREAD_X / 2,
      Math.random() * NODE_SPREAD_Y - NODE_SPREAD_Y / 2,
      Math.random() * NODE_SPREAD_Z - NODE_SPREAD_Z / 2,
    ];

    nodes.push({
      position,
      phase: Math.random() * Math.PI * 2,
      tintBias: Math.random() > 0.5 ? 1 : 0,
    });

    positions[index * 3 + 0] = position[0];
    positions[index * 3 + 1] = position[1];
    positions[index * 3 + 2] = position[2];
    colors[index * 3 + 0] = 0.56;
    colors[index * 3 + 1] = 0.52;
    colors[index * 3 + 2] = 0.66;
  }

  const edgePairs: Array<[number, number]> = [];
  const edgeKeys = new Set<string>();

  for (let source = 0; source < NODE_COUNT; source += 1) {
    const nearest = nodes
      .map((node, target) => {
        if (target === source) {
          return null;
        }

        const dx = nodes[source].position[0] - node.position[0];
        const dy = nodes[source].position[1] - node.position[1];
        const dz = nodes[source].position[2] - node.position[2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        return { target, distance };
      })
      .filter((value): value is { target: number; distance: number } => value !== null)
      .sort((left, right) => left.distance - right.distance)
      .slice(0, MAX_NEIGHBORS);

    for (const candidate of nearest) {
      if (candidate.distance > MAX_EDGE_DISTANCE) continue;

      const low = Math.min(source, candidate.target);
      const high = Math.max(source, candidate.target);
      const key = `${low}-${high}`;

      if (edgeKeys.has(key)) continue;
      edgeKeys.add(key);
      edgePairs.push([low, high]);
    }
  }

  const edges = new Float32Array(edgePairs.length * 6);

  edgePairs.forEach(([start, end], edgeIndex) => {
    const startOffset = edgeIndex * 6;
    const startNode = nodes[start];
    const endNode = nodes[end];

    edges[startOffset + 0] = startNode.position[0];
    edges[startOffset + 1] = startNode.position[1];
    edges[startOffset + 2] = startNode.position[2];
    edges[startOffset + 3] = endNode.position[0];
    edges[startOffset + 4] = endNode.position[1];
    edges[startOffset + 5] = endNode.position[2];
  });

  return { positions, colors, edges, nodes };
};

const NodeWebScene = ({ graph }: { graph: GraphData }) => {
  const pointsGeometryRef = useRef<THREE.BufferGeometry>(null);
  const { camera } = useThree();
  const nodesRef = useRef(graph.nodes);

  useEffect(() => {
    nodesRef.current = graph.nodes;
  }, [graph]);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;
    const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollPercent = Math.min(1, Math.max(0, window.scrollY / scrollRange));
    const targetZ = CAMERA_MAX_Z - (CAMERA_MAX_Z - CAMERA_MIN_Z) * scrollPercent;

    camera.position.x = Math.sin(elapsed * 0.3) * CAMERA_DRIFT_X;
    camera.position.y = Math.cos(elapsed * 0.25) * CAMERA_DRIFT_Y;
    camera.position.z += (targetZ - camera.position.z) * CAMERA_LERP;
    camera.lookAt(0, 0, 0);

    const colorAttribute = pointsGeometryRef.current?.getAttribute("color") as
      | THREE.BufferAttribute
      | undefined;

    if (!colorAttribute) return;

    const colors = colorAttribute.array as Float32Array;

    for (let index = 0; index < nodesRef.current.length; index += 1) {
      const node = nodesRef.current[index];
      const pulse = 0.22 + 0.14 * Math.sin(elapsed * 0.9 + node.phase);
      const accentMix = node.tintBias ? 0.82 : 0.48;
      const brightness = 0.44 + pulse * 0.5;

      colors[index * 3 + 0] = brightness + accentMix * pulse * 0.24;
      colors[index * 3 + 1] = brightness * (0.96 + accentMix * 0.03);
      colors[index * 3 + 2] = brightness + (1 - accentMix) * pulse * 0.22;
    }

    colorAttribute.needsUpdate = true;
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 5, 6]} intensity={2.1} color="#8b5cf6" />
      <pointLight position={[-6, -4, 4]} intensity={1.6} color="#d946ef" />
      <pointLight position={[0, 0, 10]} intensity={0.55} color="#22c55e" />

      <points frustumCulled={false}>
        <bufferGeometry ref={pointsGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[graph.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[graph.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={POINT_SIZE}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.95}
        />
      </points>

      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[graph.edges, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial transparent opacity={0.14} color="#8b5cf6" />
      </lineSegments>
    </>
  );
};

const NodeWeb = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const graph = useMemo(createGraph, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    const updateViewport = () => setIsMobile(window.innerWidth < 768);

    updateMotionPreference();
    updateViewport();

    mediaQuery.addEventListener("change", updateMotionPreference);
    window.addEventListener("resize", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  if (prefersReducedMotion || isMobile) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-void)] via-[var(--bg-surface)] to-[var(--bg-void)]" />
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0, 12], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <NodeWebScene graph={graph} />
      </Canvas>
    </div>
  );
};

export default NodeWeb;
