import { useEffect, useState } from "react";
import { Lover } from "./useReactLovers";
import { Vector3 } from "three";

export const useSphericalPoints = (lovers: Lover[]) => {
  const [points, setPoints] = useState(() =>
    generateSpherePoints(lovers.length, 5).map((point, i) => ({
      point,
      lover: lovers[i],
    }))
  );

  useEffect(() => {
    // Update the points and keep the old position if it was present before
    setPoints((oldPoints) => {
      const newPoints: { lover: Lover; point: Vector3 }[] = [];
      for (const lover of lovers) {
        const old = oldPoints.find(
          (p) => p.lover.github_username === lover.github_username
        );
        if (old) {
          newPoints.push(old);
        } else {
          newPoints.push({ point: generateSpherePoints(1, 5)[0]!, lover });
        }
      }
      return newPoints;
    });
  }, [lovers]);

  return points;
};

// Thank you Gemini (I'm too stupid to do math by myself now 🥲)
function generateSpherePoints(numPoints: number, radius: number) {
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    // Generate random values for theta and phi
    const theta = Math.random() * 2 * Math.PI; // 0 to 2*PI for even distribution
    const phi = Math.acos(2 * Math.random() - 1); // 0 to PI for full sphere

    // Calculate random points on a unit sphere (radius 1)
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);

    // Scale points to desired radius
    points.push(new Vector3(radius * x, radius * y, radius * z));
  }
  return points;
}
