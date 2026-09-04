import { useEffect, useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { SVGLoader } from "three-stdlib";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Cylinder, Text, Center, Environment, Float } from "@react-three/drei";

const DART_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 208 208">
  <path fill="#00c4b3" d="M35.2 34.9l-8.3-8.3v59.7l.1 2.8c0 1.3.2 2.8.7 4.3l65.6 23.1 16.3-7.2-74.4-74.4z"/>
  <path fill="#22d3c5" d="M27.7 93.4zm81.9 15.9l-16.3 7.2-65.4-23.1c1.3 4.8 4 10.1 7 13.2l21.3 21.2 47.6.1 5.8-18.6z"/>
  <path fill="#0075c9" d="M1.7 65.1C-.4 67.3.7 72 4 75.5l14.7 14.8 9.2 3.3c-.3-1.5-.7-3-.7-4.3l-.1-2.8-.2-59.8m82.7 82.6l7.2-16.4-23-65.6c-1.5-.3-3-.6-4.3-.7l-2.9-.1-59.6.1"/>
  <path fill="#00a8e1" d="M93.6 27.3c.2 0 .2 0 0 0 .2 0 .2 0 0 0zm16 82l17.7-5.8V54.8l-20.4-20.5c-3-3-8.3-5.8-13.2-7l23.1 65.6"/>
  <path fill="#00c4b3" d="M90.5 18.2L75.7 3.5c-3.4-3.4-8-4.4-10.4-2.3L26.9 26.6h59.5l2.9.1c1.3 0 2.8.2 4.3.7l-3.1-9.2z"/>
</svg>`;

const FLUTTER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path fill="#54C5F8" d="M14 26L28 12H40L20 32L14 26Z" />
  <path fill="#01579B" d="M20 32L28 40H40L26 26L20 32Z" />
  <path fill="#29B6F6" d="M14 26L20 32L26 26L20 20L14 26Z" />
</svg>`;

function Git3D({ scale = 1, ...props }: any) {
  const color = "#F05032";
  const materialProps = { color, roughness: 0.15, metalness: 0.4, clearcoat: 1.0, clearcoatRoughness: 0.1 };

  return (
    <group scale={scale} {...props}>
      <Center>
        {/* Center Node */}
        <Sphere args={[4, 32, 32]} castShadow receiveShadow position={[0, 0, 0]}>
          <meshPhysicalMaterial {...materialProps} />
        </Sphere>
        {/* Top-Left Node */}
        <Sphere args={[3.2, 32, 32]} castShadow receiveShadow position={[-10, 10, 0]}>
          <meshPhysicalMaterial {...materialProps} />
        </Sphere>
        {/* Top-Right Node */}
        <Sphere args={[3.2, 32, 32]} castShadow receiveShadow position={[10, 10, 0]}>
          <meshPhysicalMaterial {...materialProps} />
        </Sphere>
        {/* Bottom-Left Node */}
        <Sphere args={[3.2, 32, 32]} castShadow receiveShadow position={[-10, -10, 0]}>
          <meshPhysicalMaterial {...materialProps} />
        </Sphere>

        {/* Top-Left Branch */}
        <Cylinder args={[1.2, 1.2, 14.14, 16]} castShadow receiveShadow position={[-5, 5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <meshPhysicalMaterial {...materialProps} />
        </Cylinder>
        {/* Top-Right Branch */}
        <Cylinder args={[1.2, 1.2, 14.14, 16]} castShadow receiveShadow position={[5, 5, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <meshPhysicalMaterial {...materialProps} />
        </Cylinder>
        {/* Bottom-Left Branch */}
        <Cylinder args={[1.2, 1.2, 14.14, 16]} castShadow receiveShadow position={[-5, -5, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <meshPhysicalMaterial {...materialProps} />
        </Cylinder>
      </Center>
    </group>
  );
}

function Svg3D({ svgString, depth = 3, scale = 1, layerSpacing = 0, ...props }: any) {
  const shapesData = useMemo(() => {
    const loader = new SVGLoader();
    const data = loader.parse(svgString);
    return data.paths.map((path) => {
      // @ts-ignore
      const shapes = path.toShapes(true);
      return { shapes, color: path.color };
    });
  }, [svgString]);

  // Very sharp, premium bevel
  const bevelThickness = 0.5 / scale;
  const bevelSize = 0.5 / scale;

  return (
    <group scale={[scale, -scale, scale]} {...props}>
      <Center>
        {shapesData.map((d, i) => (
          <mesh key={i} castShadow receiveShadow position={[0, 0, i * layerSpacing]}>
            <extrudeGeometry 
              args={[d.shapes, { 
                depth, 
                bevelEnabled: true, 
                bevelThickness, 
                bevelSize, 
                bevelSegments: 6, 
                curveSegments: 32 
              }]} 
            />
            <meshPhysicalMaterial 
              color={d.color} 
              roughness={0.15} 
              metalness={0.4} 
              clearcoat={1.0}
              clearcoatRoughness={0.1}
            />
          </mesh>
        ))}
      </Center>
    </group>
  );
}

function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      camera.zoom = size.width / 460;
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);
  return null;
}

function OrbitSystem({ mouseTilt, reducedMotion }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const centerRef = useRef<THREE.Group>(null);
  const dartRef = useRef<THREE.Group>(null);
  const gitRef = useRef<THREE.Group>(null);
  const flutterRef = useRef<THREE.Group>(null);
  
  const currentTilt = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!reducedMotion) {
      currentTilt.current.x += (mouseTilt.current.x - currentTilt.current.x) * 0.1;
      currentTilt.current.y += (mouseTilt.current.y - currentTilt.current.y) * 0.1;
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.set(
        THREE.MathUtils.degToRad(-62 + currentTilt.current.x),
        THREE.MathUtils.degToRad(currentTilt.current.y),
        THREE.MathUtils.degToRad(-6),
        "XYZ"
      );
    }
    
    if (centerRef.current) {
      centerRef.current.rotation.set(
        THREE.MathUtils.degToRad(62 - currentTilt.current.x),
        THREE.MathUtils.degToRad(-currentTilt.current.y),
        THREE.MathUtils.degToRad(6),
        "ZYX"
      );
    }
    
    const t = state.clock.getElapsedTime();
    
    if (dartRef.current) {
      const angle = 0 + (reducedMotion ? 0 : t * 0.5);
      dartRef.current.position.x = Math.cos(angle) * 105;
      dartRef.current.position.y = Math.sin(angle) * 105;
      dartRef.current.rotation.set(
        THREE.MathUtils.degToRad(62 - currentTilt.current.x),
        THREE.MathUtils.degToRad(-currentTilt.current.y) + (reducedMotion ? 0 : t * 2),
        THREE.MathUtils.degToRad(6),
        "ZYX"
      );
    }
    
    if (gitRef.current) {
      const angle = (120 * Math.PI) / 180 + (reducedMotion ? 0 : t * 0.3);
      gitRef.current.position.x = Math.cos(angle) * 155;
      gitRef.current.position.y = Math.sin(angle) * 155;
      gitRef.current.rotation.set(
        THREE.MathUtils.degToRad(62 - currentTilt.current.x),
        THREE.MathUtils.degToRad(-currentTilt.current.y) + (reducedMotion ? 0 : t * 2),
        THREE.MathUtils.degToRad(6),
        "ZYX"
      );
    }
    
    if (flutterRef.current) {
      const angle = (240 * Math.PI) / 180 + (reducedMotion ? 0 : t * 0.2);
      flutterRef.current.position.x = Math.cos(angle) * 205;
      flutterRef.current.position.y = Math.sin(angle) * 205;
      flutterRef.current.rotation.set(
        THREE.MathUtils.degToRad(62 - currentTilt.current.x),
        THREE.MathUtils.degToRad(-currentTilt.current.y) + (reducedMotion ? 0 : t * 2),
        THREE.MathUtils.degToRad(6),
        "ZYX"
      );
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[105, 0.5, 8, 64]} />
          <meshBasicMaterial color="#FF4B1F" transparent opacity={0.6} />
        </mesh>
        <group ref={dartRef}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.1}>
            <Svg3D svgString={DART_SVG} scale={0.3} depth={12} />
          </Float>
        </group>

        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[155, 0.5, 8, 64]} />
          <meshBasicMaterial color="#FF4B1F" transparent opacity={0.6} />
        </mesh>
        <group ref={gitRef}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.1}>
            <Git3D scale={1.5} />
          </Float>
        </group>

        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[205, 0.5, 8, 64]} />
          <meshBasicMaterial color="#FF4B1F" transparent opacity={0.6} />
        </mesh>
        <group ref={flutterRef}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.1}>
            <Svg3D svgString={FLUTTER_SVG} scale={1.35} depth={2.5} />
          </Float>
        </group>

        <group ref={centerRef}>
          <Sphere args={[48, 64, 64]}>
            <meshStandardMaterial color="#1a202c" roughness={0.4} metalness={0.7} />
          </Sphere>
          <Text position={[0, 0, 49]} fontSize={28} fontWeight="bold" color="white">
            SDK
          </Text>
        </group>
      </group>
    </>
  );
}

export default function TechOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseTilt = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;

    const handlePointer = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const relX = (clientX - rect.left) / rect.width - 0.5;
      const relY = (clientY - rect.top) / rect.height - 0.5;
      mouseTilt.current = { x: relY * -20, y: relX * 24 };
    };

    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    const reset = () => { mouseTilt.current = { x: 0, y: 0 }; };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", reset);
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("touchend", reset);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", reset);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", reset);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-square select-none mx-auto overflow-hidden"
      aria-hidden="true"
    >
      <Canvas orthographic camera={{ position: [0, 0, 500] }} shadows>
        <ResponsiveCamera />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 30]} intensity={1.5} castShadow />
        <directionalLight position={[-10, -20, -30]} intensity={0.5} />
        <Environment preset="city" />
        
        <OrbitSystem mouseTilt={mouseTilt} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}


