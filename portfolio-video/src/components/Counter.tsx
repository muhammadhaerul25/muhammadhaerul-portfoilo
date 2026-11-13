import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../content';

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  fontSize?: number;
}

export const Counter: React.FC<CounterProps> = ({
  from = 0,
  to,
  duration = 35,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  label,
  fontSize = 72,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const currentValue = from + (to - from) * progress;
  const formattedNumber =
    decimals > 0
      ? currentValue.toFixed(decimals)
      : Math.round(currentValue).toLocaleString('en-US');

  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame - delay, [0, 16], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${translateY}px)`,
        padding: '16px 24px',
        borderRadius: 24,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
        minWidth: 260,
      }}
    >
      <div
        style={{
          fontFamily: THEME.fonts.primary,
          fontSize,
          fontWeight: 800,
          color: THEME.colors.textPrimary,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'baseline',
          textShadow: '0 4px 20px rgba(26, 115, 232, 0.4)',
        }}
      >
        {prefix && <span style={{ color: THEME.colors.accentCyan, marginRight: 2 }}>{prefix}</span>}
        <span>{formattedNumber}</span>
        {suffix && (
          <span
            style={{
              color: THEME.colors.accentCyan,
              fontSize: fontSize * 0.72,
              fontWeight: 700,
              marginLeft: 4,
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      <div
        style={{
          marginTop: 8,
          fontFamily: THEME.fonts.primary,
          fontSize: 24,
          fontWeight: 600,
          color: THEME.colors.textSecondary,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        {label}
      </div>
    </div>
  );
};

