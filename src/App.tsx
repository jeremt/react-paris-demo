import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { ReactLogo } from "./ReactLogo";

function App() {
  console.log(import.meta.env);
  return (
    <>
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
