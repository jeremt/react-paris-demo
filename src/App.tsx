import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ReactLogo } from "./ReactLogo";
import { supabase } from "./main";
import { useEffect, useState } from "react";

function App() {
  const [lovers, setLovers] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const result = await supabase
        .from("react_lovers")
        .select("github_username");
      if (!result.data) return;
      setLovers(result.data.map((d) => d.github_username as string));
    })();
  }, []);

  useEffect(() => {
    const subscription = supabase
      //
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          table: "react_lovers",
          schema: "public",
        },
        (payload) => {
          console.log("Event received!", payload);
        }
      );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <color attach="background" args={["#151515"]} />
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <ReactLogo />
        </Float>
        <Stars saturation={1} count={400} speed={0.5} />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </>
  );
}

export default App;
