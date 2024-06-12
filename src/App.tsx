import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { ReactLogo } from "./ReactLogo";
import { supabase } from "./main";
import { useEffect, useState } from "react";

function App() {
  const [lovers, setLovers] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const result = await supabase.from("react_lovers").select("github_username");
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
      {lovers.map((lover) => (
        <div key={lover}>{lover}</div>
      ))}
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <Float>
          <ReactLogo />
        </Float>
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </>
  );
}

export default App;
