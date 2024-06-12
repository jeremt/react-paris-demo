import { Billboard, Text } from "@react-three/drei";
import { useEffect, useState } from "react";

type Props = {
  username: string;
};

export function ReactLover({ username }: Props) {
  const fontProps = {
    fontSize: 0.8,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <Billboard>
      <Text
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={() => setHovered(false)}
        color="turquoise"
        onClick={() => window.open(`https://github.com/${username}`)}
        {...fontProps}
      >
        {username}
      </Text>
    </Billboard>
  );
}
