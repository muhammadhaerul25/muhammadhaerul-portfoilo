import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import captionsData from '../../captions.json';
import { THEME } from '../content';

export type SubtitleLanguage = 'en' | 'id';

interface SubtitleProps {
  language?: SubtitleLanguage;
}

export const Subtitle: React.FC<SubtitleProps> = ({ language = 'en' }) => {
  const frame = useCurrentFrame();

  const activeCaption = captionsData.captions.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame,
  );

  if (!activeCaption) return null;

  const text = language === 'id' ? activeCaption.id : activeCaption.en;
  const progressIntoCaption = frame - activeCaption.startFrame;
  const remainingInCaption = activeCaption.endFrame - frame;

  // Smooth fade-in and fade-out at caption boundaries
  const fadeIn = interpolate(progressIntoCaption, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(remainingInCaption, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = Math.min(fadeIn, fadeOut);

  const translateY = interpolate(progressIntoCaption, [0, 8], [8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 495, // Inside content-safe boundary (safe bottom is 480px, so 495px from bottom = Y ~= 1375px)
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px)`,
        maxWidth: 860,
        width: 'auto',
        zIndex: 50,
        opacity,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          padding: '12px 28px',
          borderRadius: 20,
          backgroundColor: 'rgba(6, 9, 15, 0.88)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65), 0 0 20px rgba(26, 115, 232, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.primary,
            fontSize: 34,
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

