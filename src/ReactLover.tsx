import { Billboard, useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { Lover } from "./useReactLovers";

type Props = {
  lover: Lover;
  position: Vector3;
};

export function ReactLover({ lover, position }: Props) {
  const texture = useTexture(lover.avatar_url);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <Billboard position={position}>
      <mesh
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={() => setHovered(false)}
        onClick={() =>
          window.open(`https://github.com/${lover.github_username}`)
        }
      >
        <circleGeometry args={[0.25]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </Billboard>
  );
}
