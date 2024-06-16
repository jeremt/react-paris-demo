import { Billboard, Text, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import { Lover } from "./useReactLovers";
import { useFrame } from "@react-three/fiber";
import { lerp } from "three/src/math/MathUtils.js";
import { Easing } from "three/examples/jsm/libs/tween.module.js";
import { generateSpherePoint } from "./useSphericalPoints";

type Props = {
  lover: Lover;
  position: Vector3;
  justAdded: boolean;
};

const appearanceDuration = 1;

export function ReactLover({ lover, justAdded: newLover, position }: Props) {
  const texture = useTexture(lover.avatar_url);
  const [scale, setScale] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [duration, setDuration] = useState(appearanceDuration);

  // compute initialPosition only once
  const initialPosition = useMemo(() => generateSpherePoint(10), []);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame((_, dt) => {
    if (duration > 0) {
      // apppearance animations
      if (newLover) {
        setCurrentPosition(
          initialPosition
            .clone()
            .lerp(
              position,
              Easing.Back.Out(
                (appearanceDuration - duration) / appearanceDuration
              )
            )
        );
      }
      setScale(
        lerp(
          0,
          1,
          Easing.Back.Out((appearanceDuration - duration) / appearanceDuration)
        )
      );
      setDuration((duration) => duration - dt);
    }
  });

  return (
    <Billboard
      position={currentPosition}
      scale={new Vector3(scale, scale, scale)}
    >
      <Text
        position={new Vector3(0, 0.7, 0)}
        visible={hovered}
        anchorY="top"
        fontSize={0.2}
      >
        {lover.github_username}
      </Text>
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
