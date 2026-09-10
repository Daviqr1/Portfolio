import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import CanvasLoader from "./Loader";

// Import the model to let Vite handle the path and hashing
import spacemanScene from "../assets/3d/spaceman.glb";

const Spaceman = ({ scale, position, rotationX, rotationY }) => {
  const spacemanRef = useRef();
  const { scene, animations } = useGLTF(spacemanScene);
  const { actions } = useAnimations(animations, spacemanRef);

  useEffect(() => {
    if (actions["Idle"]) {
      actions["Idle"].play();
    }
  }, [actions]);

  return (
    <mesh 
      ref={spacemanRef} 
      position={position} 
      scale={scale} 
      rotation={[rotationX || 0, 2.2, rotationY || 0]}
    >
      <primitive object={scene} />
    </mesh>
  );
};

// ... existing SpacemanCanvas code ...

const SpacemanCanvas = ({ scrollContainer }) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState([0.2, -0.7, 0]);

  useEffect(() => {
    // O <main> recebido em scrollContainer não é um contêiner de rolagem: quem
    // rola é a janela. Ler .scrollTop dele devolvia 0 para sempre e o
    // astronauta nunca girava. Só usamos o elemento se ele de fato rolar.
    const lerScrollTop = () => {
      const el = scrollContainer && scrollContainer.current;
      if (el && el.scrollHeight > el.clientHeight + 1) return el.scrollTop;
      return window.scrollY || document.documentElement.scrollTop || 0;
    };

    let frame = null;
    const handleScroll = () => {
      // Sem o rAF, cada evento de scroll disparava dois setState e um
      // re-render do Canvas inteiro.
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const scrollTop = lerScrollTop();
        setRotationX(scrollTop * -0.0006);
        setRotationY(scrollTop * -0.00075);
      });
    };

    // A FOV vertical é fixa, então o modelo é sempre uma fração da ALTURA do
    // canvas — mudar a largura só corta nas laterais. Como o Hero passou a dar
    // ao astronauta um contêiner próprio, as escalas seguem esse contêiner:
    // abaixo de 1024px ele é uma faixa baixa e larga (embaixo do texto), e o
    // modelo precisa de escala alta para não sumir; de 1024px para cima é a
    // coluna direita inteira, alta, e a escala volta a ser pequena.
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setScale([2.75, 2.75, 2.75]);
        setPosition([0, -0.35, 0]);
      } else if (w < 1024) {
        setScale([2.45, 2.45, 2.45]);
        setPosition([0, -0.15, 0]);
      } else if (w < 1280) {
        setScale([1.3, 1.3, 1.3]);
        setPosition([0, -0.3, 0]);
      } else if (w < 1536) {
        setScale([1.45, 1.45, 1.45]);
        setPosition([0, -0.4, 0]);
      } else {
        setScale([1.7, 1.7, 1.7]);
        setPosition([0, -0.55, 0]);
      }
    };

    handleResize();
    handleScroll();

    const el = scrollContainer && scrollContainer.current;
    window.addEventListener("scroll", handleScroll, { passive: true });
    if (el) el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      if (el) el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollContainer]);

  return (
    // h-full (não h-screen): o canvas agora preenche o contêiner que o Hero
    // reserva para ele, e não a altura da janela. Sem z-index aqui — a ordem
    // de empilhamento do hero está toda no index.css.
    <Canvas className="w-full h-full bg-transparent" camera={{ near: 0.1, far: 1000 }}>
      <Suspense fallback={<CanvasLoader />}>
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 5, 10]} intensity={2} />
        <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2} />
        <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

        <Spaceman 
          rotationX={rotationX} 
          rotationY={rotationY} 
          scale={scale} 
          position={position} 
        />
      </Suspense>
    </Canvas>
  );
};

export default SpacemanCanvas;
