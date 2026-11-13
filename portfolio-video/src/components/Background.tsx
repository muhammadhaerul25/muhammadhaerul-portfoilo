import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../content';

export const Background: React.FC<{ accentIntensity?: number }> = ({ accentIntensity = 1 }) => {
  const frame = useCurrentFrame();

  // Slow subtle drift for ambient lights
  const light1X = interpolate(frame, [0, 1800], [200, 350]);
  const light1Y = interpolate(frame, [0, 1800], [300, 500]);
  const light2X = interpolate(frame, [0, 1800], [800, 650]);
  const light2Y = interpolate(frame, [0, 1800], [1400, 1200]);
  const gridShift = (frame * 0.4) % 60;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bgNavyDark,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Primary Radial Glow 1 (Top Left) */}
      <div
        style={{
          position: 'absolute',
          left: light1X,
          top: light1Y,
          width: 900,
          height: 900,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(26, 115, 232, ${0.28 * accentIntensity}) 0%, rgba(26, 115, 232, 0.05) 50%, transparent 75%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Radial Glow 2 (Bottom Right) */}
      <div
        style={{
          position: 'absolute',
          left: light2X,
          top: light2Y,
          width: 1000,
          height: 1000,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(56, 189, 248, ${0.18 * accentIntensity}) 0%, rgba(14, 165, 233, 0.04) 55%, transparent 75%)`,
          filter: 'blur(90px)',
        }}
      />

      {/* Subtle Technical Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: `0px ${gridShift}px`,
          opacity: 0.7,
        }}
      />

      {/* Subtle Technical Corner Accents */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 64,
          width: 40,
          height: 40,
          borderTop: '2px solid rgba(255, 255, 255, 0.15)',
          borderLeft: '2px solid rgba(255, 255, 255, 0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 100,
          right: 64,
          width: 40,
          height: 40,
          borderTop: '2px solid rgba(255, 255, 255, 0.15)',
          borderRight: '2px solid rgba(255, 255, 255, 0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 64,
          width: 40,
          height: 40,
          borderBottom: '2px solid rgba(255, 255, 255, 0.15)',
          borderLeft: '2px solid rgba(255, 255, 255, 0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          right: 64,
          width: 40,
          height: 40,
          borderBottom: '2px solid rgba(255, 255, 255, 0.15)',
          borderRight: '2px solid rgba(255, 255, 255, 0.15)',
        }}
      />

      {/* Vignette Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(6, 9, 15, 0.75) 100%)',
        }}
      />
    </div>
  );
};

