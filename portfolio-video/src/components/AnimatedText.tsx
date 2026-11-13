import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../content';

interface AnimatedBadgeProps {
  text: string;
  delay?: number;
  color?: string;
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  text,
  delay = 0,
  color = THEME.colors.accentCyan,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame - delay, [0, 14], [-12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 20px',
        borderRadius: 999,
        backgroundColor: 'rgba(26, 115, 232, 0.14)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 4px 16px rgba(26, 115, 232, 0.2)',
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      <span
        style={{
          fontFamily: THEME.fonts.primary,
          fontSize: 26,
          fontWeight: 700,
          color,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {text}
      </span>
    </div>
  );
};

interface AnimatedHeadlineProps {
  children: React.ReactNode;
  delay?: number;
  fontSize?: number;
  align?: 'left' | 'center' | 'right';
  maxWidth?: number;
}

export const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({
  children,
  delay = 0,
  fontSize = 84,
  align = 'center',
  maxWidth = 920,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame - delay, [0, 18], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <h1
      style={{
        margin: 0,
        fontFamily: THEME.fonts.primary,
        fontSize,
        fontWeight: 800,
        color: THEME.colors.textPrimary,
        letterSpacing: '-0.03em',
        lineHeight: 1.12,
        textAlign: align,
        maxWidth,
        opacity,
        transform: `translateY(${translateY}px)`,
        textShadow: '0 8px 32px rgba(0, 0, 0, 0.7)',
      }}
    >
      {children}
    </h1>
  );
};

