import { useMemo } from "react";
import { Line, Sphere } from "@react-three/drei";
import { EllipseCurve } from "three";

export function ReactLogo() {
  const points = useMemo(
    () =>
      new EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100),
    []
  );
  return (
    <group>
      <Line worldUnits points={points} color="turquoise" lineWidth={0.3} />
      <Line
        worldUnits
        points={points}
        color="turquoise"
        lineWidth={0.3}
        rotation={[0, 0, 1]}
      />
      <Line
        worldUnits
        points={points}
        color="turquoise"
        lineWidth={0.3}
        rotation={[0, 0, -1]}
      />
      <Sphere args={[0.55, 64, 64]}>
        <meshBasicMaterial color="turquoise" toneMapped={false} />
      </Sphere>
    </group>
  );
}
