import React from 'react';
import { Img, staticFile } from 'remotion';
import { THEME } from '../content';

interface TabletFrameProps {
  imageSrc: string; // e.g. "screenshots/ipad/01-hero.png"
  width?: number;
  height?: number;
  scale?: number;
  translateX?: number;
  translateY?: number;
  opacity?: number;
  objectPosition?: string;
  badge?: string;
}

export const TabletFrame: React.FC<TabletFrameProps> = ({
  imageSrc,
  width = 640,
  height = 920, // 640 * (1180/820) ~= 920 (exact 820:1180 iPad ratio)
  scale = 1,
  translateX = 0,
  translateY = 0,
  opacity = 1,
  objectPosition = 'top center',
  badge,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width,
        height,
        transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${scale})`,
        opacity,
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer Metallic Bezel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 32,
          padding: 10,
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.2) 0%, rgba(30, 41, 59, 0.8) 40%, rgba(15, 23, 42, 0.95) 100%)',
          boxShadow: `
            0 35px 80px rgba(0, 0, 0, 0.85),
            0 10px 30px rgba(0, 0, 0, 0.6),
            0 0 50px ${THEME.colors.accentBlueGlow}
          `,
          border: '1.5px solid rgba(255, 255, 255, 0.18)',
          boxSizing: 'border-box',
        }}
      >
        {/* Front Camera Dot */}
        <div
          style={{
            position: 'absolute',
            top: 5,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#0F172A',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 30,
          }}
        />

        {/* Screen Display Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 24,
            overflow: 'hidden',
            backgroundColor: '#0A0E17',
          }}
        >
          <Img
            src={staticFile(imageSrc)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition,
              display: 'block',
            }}
          />

          {/* Screen Glass Reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '35%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />

          {badge && (
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                padding: '4px 12px',
                borderRadius: 8,
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                zIndex: 25,
              }}
            >
              <span
                style={{
                  fontFamily: THEME.fonts.primary,
                  fontSize: 11,
                  fontWeight: 700,
                  color: THEME.colors.accentCyan,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {badge}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

