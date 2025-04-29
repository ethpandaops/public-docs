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

  // Network node colors
  const nodeColor = isDarkTheme ? '#4a5568' : '#e2e8f0';
  const activeNodeColor = isDarkTheme ? '#63b3ed' : '#3182ce';
  const ethNodeColor = isDarkTheme ? '#48bb78' : '#38a169';
  
  // Connection colors
  const linkColor = isDarkTheme ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.09)';
  const activeLinkColor = isDarkTheme ? 'rgba(66, 153, 225, 0.3)' : 'rgba(49, 130, 206, 0.2)';

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
        fpsLimit: 30,
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: true,
              mode: "connect",
              parallax: {
                enable: false,
                force: 60,
                smooth: 10
              }
            },
            resize: true,
          },
          modes: {
            connect: {
              distance: 180,
              links: {
                opacity: 0.3
              },
              radius: 120
            }
          }
        },
        particles: {
          color: {
            value: [nodeColor, activeNodeColor, ethNodeColor],
          },
          collisions: {
            enable: false,
          },
          links: {
            color: linkColor,
            distance: 150,
            enable: true,
            opacity: 0.18,
            width: 1,
            warp: true,
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
            random: false,
            speed: 0.5,
            straight: false,
            path: {
              enable: true,
              delay: {
                value: 0.1
              },
              options: {
                size: 5,
                draw: false,
                increment: 0.001
              }
            },
            trail: {
              enable: true,
              length: 3,
              fillColor: {
                value: "transparent"
              }
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 55,
            limit: 70,
          },
          opacity: {
            value: 0.7,
            random: {
              enable: true,
              minimumValue: 0.3
            },
            animation: {
              enable: true,
              speed: 0.4,
              minimumValue: 0.1,
              sync: false,
            },
          },
          shape: {
            type: ["circle"],
          },
          size: {
            value: { min: 1.5, max: 3.5 },
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 1,
              sync: false,
            },
          },
          twinkle: {
            particles: {
              enable: false,
              color: activeLinkColor,
              frequency: 0.05,
              opacity: 1
            },
            lines: {
              enable: false,
              color: activeLinkColor,
              frequency: 0.005,
              opacity: 0.4
            }
          }
        },
        detectRetina: true,
      }}
    />
  );
} 