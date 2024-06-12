import { Billboard, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Color } from "three";

type Props = {
  text: string;
};

export function ReactLover({ text }: Props) {
  //   const color = new Color();
  const fontProps = {
    fontSize: 0.8,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef();
  //   const [hovered, setHovered] = useState(false);
  //   const over = (e) => (e.stopPropagation(), setHovered(true));
  //   const out = () => setHovered(false);
  // Change the mouse cursor on hover¨
  //   useEffect(() => {
  //     if (hovered) document.body.style.cursor = "pointer";
  //     return () => (document.body.style.cursor = "auto");
  //   }, [hovered]);
  //   // Tie component to the render-loop
  //   useFrame(({ camera }) => {
  //     ref.current!.material.color.lerp(
  //       color.set(hovered ? "#fa2720" : "white"),
  //       0.1
  //     );
  //   });
  return (
    <Billboard>
      <Text
        ref={ref}
        // onPointerOver={over}
        // onPointerOut={out}
        color="turquoise"
        onClick={() => console.log("clicked")}
        {...fontProps}
      >
        {text}
      </Text>
    </Billboard>
  );
}
