import { useMemo } from "react";
import { Line, Sphere } from "@react-three/drei";
import { type ColorRepresentation, EllipseCurve } from "three";

export function ReactLogo() {
  const points = useMemo(
    () =>
      new EllipseCurve(0, 0, 3, 1.3, 0, 2 * Math.PI, false, 0).getPoints(100),
    []
  );
  const color = [0.43, 1.49, 1.39] as unknown as ColorRepresentation;
  return (
    <group>
      <Line
        worldUnits
        points={points}
        color={color}
        toneMapped={false}
        lineWidth={0.3}
      />
      <Line
        worldUnits
        points={points}
        color={color}
        lineWidth={0.3}
        rotation={[0, 0, 1]}
        toneMapped={false}
      />
      <Line
        worldUnits
        points={points}
        lineWidth={0.3}
        color={color}
        rotation={[0, 0, -1]}
        toneMapped={false}
      />
      <Sphere args={[0.55, 64, 64]}>
        <meshBasicMaterial color={color} />
      </Sphere>
    </group>
  );
}
