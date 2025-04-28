import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useColorMode } from '@docusaurus/theme-common';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  // Primary and accent colors based on theme - much softer now
  const primaryColor = isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(59, 59, 59, 0.05)';
  const accentColor = isDarkTheme ? 'rgba(88, 166, 255, 0.15)' : 'rgba(9, 105, 218, 0.1)';

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="particles-canvas"
      options={{
        fullScreen: {
          enable: false,
          zIndex: -1
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: false,
            },
            resize: true,
          },
        },
        particles: {
          color: {
            value: [primaryColor, accentColor],
          },
          links: {
            color: primaryColor,
            distance: 150,
            enable: true,
            opacity: 0.15,
            width: 0.8,
            triangles: {
              enable: false,
            },
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1.2,
            straight: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            density: {
              enable: true,
              area: 500,
            },
            value: 100,
            limit: 200,
          },
          opacity: {
            value: 0.1,
            random: true,
            anim: {
              enable: true,
              speed: 0.3,
              opacity_min: 0.5,
              sync: false,
            },
          },
          shape: {
            type: ["circle"],
          },
          size: {
            value: { min: 1, max: 3 },
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 0.3,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
} 