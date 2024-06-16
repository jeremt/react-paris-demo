import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ReactLogo } from "./ReactLogo";
import { useReactLovers } from "./useReactLovers";
import { ReactLover } from "./ReactLover";
import { useSphericalPoints } from "./useSphericalPoints";

function App() {
  const { lovers, addLover } = useReactLovers();

  const points = useSphericalPoints(lovers);

  const joinTheCrew = () => {
    const username = prompt("What's your github username?");
    if (username) {
      addLover(username);
    }
  };

  return (
    <>
      <header>
        <h1>React lovers</h1>
        <button onClick={joinTheCrew}>Join the crew</button>
        <a href="https://github.com/jeremt/react-paris-demo" target="_blank">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 0C6.7175 0 0 6.88604 0 15.3792C0 22.1743 4.2975 27.9389 10.2587 29.9728C11.0075 30.115 11.25 29.6383 11.25 29.2333V26.3702C7.0775 27.3007 6.20875 24.5555 6.20875 24.5555C5.52625 22.7779 4.5425 22.305 4.5425 22.305C3.18125 21.3502 4.64625 21.3707 4.64625 21.3707C6.1525 21.4783 6.945 22.956 6.945 22.956C8.2825 25.3065 10.4538 24.6272 11.31 24.2338C11.4438 23.2405 11.8325 22.5613 12.2625 22.1781C8.93125 21.7872 5.42875 20.4684 5.42875 14.5769C5.42875 12.8967 6.015 11.5254 6.97375 10.4489C6.81875 10.0606 6.305 8.49573 7.12 6.37853C7.12 6.37853 8.38 5.96585 11.2462 7.95489C12.4425 7.61399 13.725 7.44354 15 7.43713C16.275 7.44354 17.5587 7.61399 18.7575 7.95489C21.6212 5.96585 22.8787 6.37853 22.8787 6.37853C23.695 8.49701 23.1812 10.0618 23.0262 10.4489C23.9887 11.5254 24.57 12.898 24.57 14.5769C24.57 20.4838 21.0612 21.7846 17.7213 22.1653C18.2588 22.642 18.75 23.5776 18.75 25.013V29.2333C18.75 29.6421 18.99 30.1227 19.7512 29.9715C25.7075 27.935 30 22.1717 30 15.3792C30 6.88604 23.2837 0 15 0Z"
              fill="turquoise"
            />
          </svg>
        </a>
      </header>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <color attach="background" args={["#151515"]} />
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <ReactLogo />
        </Float>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          {points.map((point, i) => (
            <ReactLover key={i} lover={point.lover} position={point.point} />
          ))}
        </Float>
        <Stars saturation={1} count={400} speed={0.5} />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>
        <OrbitControls enableZoom={false} />
      </Canvas>
      <footer>
        Click on any picture to open the corresponding Github profile 👀
      </footer>
    </>
  );
}

export default App;
