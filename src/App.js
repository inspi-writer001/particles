import logo from "./logo.svg";
import "./App.css";
import LN from "./assets/ln.png";
import { useEffect, useState } from "react";
import ParticleImage, { forces, ParticleOptions } from "react-particle-image";

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    // Get pixel
    const pixel = image.get(x, y);
    // Make a particle for this pixel if blue > 50 (range 0-255)
    return pixel.b > 50;
  },
  // particle color
  color: ({ x, y, image }) => "#61dafb"
};

const motionForce = (x, y) => {
  // 70 --> radius of mouse hover size
  return forces.disturbance(x, y, 70);
};

function App() {
  const { height, width } = useWindowSize();
  return (
    <div className="App">
      <ParticleImage
        src={LN}
        // height={Number(height)}
        height={500}
        // width={Number(width)}
        width={500}
        // view zoom... low scale makes particles appear more
        scale={0.13}
        // disorderliness in the particles vibration
        entropy={17}
        // number of particles
        maxParticles={5800}
        // mouse move force
        mouseMoveForce={motionForce}
        // mouse force duration in ms
        mouseMoveForceDuration={1000}
        touchMoveForce={motionForce}
        particleOptions={particleOptions}
        backgroundColor={"transparent"}
      />
      <div style={{ display: "flex" }} />
    </div>
  );
}

// currently implemented size based on window viewport

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default App;
