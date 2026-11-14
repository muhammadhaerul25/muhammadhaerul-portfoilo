import React from 'react';
import { Img, staticFile } from 'remotion';
import { THEME } from '../content';

interface LaptopFrameProps {
  imageSrc: string; // e.g. "screenshots/laptop/01-hero.png"
  width?: number;
  height?: number;
  scale?: number;
  translateX?: number;
  translateY?: number;
  opacity?: number;
  objectPosition?: string;
  badge?: string;
}

export const LaptopFrame: React.FC<LaptopFrameProps> = ({
  imageSrc,
  width = 920,
  height = 575, // 920 * (900/1440) = 575 (exact 16:10 laptop ratio)
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
      {/* Outer Display Bezel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 20,
          padding: 8,
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(30, 41, 59, 0.85) 40%, rgba(15, 23, 42, 0.98) 100%)',
          boxShadow: `
            0 40px 90px rgba(0, 0, 0, 0.9),
            0 12px 35px rgba(0, 0, 0, 0.7),
            0 0 60px ${THEME.colors.accentBlueGlow}
          `,
          border: '1.5px solid rgba(255, 255, 255, 0.18)',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Browser / Window Header Bar */}
        <div
          style={{
            height: 28,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            backgroundColor: '#0F172A',
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            boxSizing: 'border-box',
          }}
        >
          {/* Window Traffic Lights */}
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: '#EF4444' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: '#10B981' }} />
          </div>

          {/* URL Pill */}
          <div
            style={{
              padding: '2px 14px',
              borderRadius: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#38BDF8' }} />
            <span
              style={{
                fontFamily: THEME.fonts.primary,
                fontSize: 11,
                color: '#94A3B8',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              muhammadhaerul.tech
            </span>
          </div>

          {badge ? (
            <span
              style={{
                fontFamily: THEME.fonts.primary,
                fontSize: 10,
                fontWeight: 700,
                color: THEME.colors.accentCyan,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </span>
          ) : (
            <div style={{ width: 30 }} />
          )}
        </div>

        {/* Screen Display Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'calc(100% - 28px)',
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
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
            }}
          />
        </div>
      </div>

      {/* Laptop Stand / Base Chin */}
      <div
        style={{
          width: width * 0.4,
          height: 8,
          background: 'linear-gradient(180deg, #334155 0%, #1e293b 100%)',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.7)',
        }}
      />
    </div>
  );
};

