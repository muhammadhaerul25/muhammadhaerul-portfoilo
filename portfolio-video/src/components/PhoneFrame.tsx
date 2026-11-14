import React from 'react';
import { Video, Img, staticFile } from 'remotion';
import { THEME } from '../content';

interface PhoneFrameProps {
  clipSrc?: string; // e.g. "clips/hero.mp4"
  imageSrc?: string; // e.g. "screenshots/mobile/01-hero.png"
  width?: number;
  height?: number;
  scale?: number;
  translateX?: number;
  translateY?: number;
  opacity?: number;
  startFromFrame?: number;
  objectPosition?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  clipSrc,
  imageSrc,
  width = 620,
  height = 1344, // 620 * (932/430) ~= 1344 (exact 430:932 mobile ratio)
  scale = 1,
  translateX = 0,
  translateY = 0,
  opacity = 1,
  startFromFrame = 0,
  objectPosition = 'top center',
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
      {/* Outer Metallic / Glass Bezel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 48,
          padding: 8,
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.22) 0%, rgba(30, 41, 59, 0.8) 40%, rgba(15, 23, 42, 0.95) 100%)',
          boxShadow: `
            0 35px 80px rgba(0, 0, 0, 0.85),
            0 10px 30px rgba(0, 0, 0, 0.6),
            0 0 50px ${THEME.colors.accentBlueGlow}
          `,
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxSizing: 'border-box',
        }}
      >
        {/* Inner Phone Screen Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 40,
            overflow: 'hidden',
            backgroundColor: '#000000',
          }}
        >
          {/* Dynamic Island / Pill Camera at Top */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 110,
              height: 28,
              borderRadius: 20,
              backgroundColor: '#000000',
              zIndex: 30,
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 10,
            }}
          >
            {/* Camera sensor dot */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #1e293b 30%, #090d16 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            />
          </div>

          {/* Website Media Display (Image or Video) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            {imageSrc ? (
              <Img
                src={staticFile(imageSrc)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition,
                  display: 'block',
                }}
              />
            ) : clipSrc ? (
              <Video
                src={staticFile(clipSrc)}
                startFrom={startFromFrame}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : null}
          </div>

          {/* Screen Glass Reflection Gradient Accent */}
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

          {/* Subtle Inner Screen Border Highlight */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 40,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              pointerEvents: 'none',
              zIndex: 25,
            }}
          />
        </div>
      </div>
    </div>
  );
};
