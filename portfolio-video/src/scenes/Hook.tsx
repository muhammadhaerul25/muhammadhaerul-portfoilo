import React from 'react';
import { Img, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import { THEME, PROFILE_DATA } from '../content';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Eyebrow badge animation
  const eyebrowOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eyebrowY = interpolate(frame, [0, 16], [-15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Headline entrance (within first second)
  const headlineOpacity = interpolate(frame, [6, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [6, 26], [28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Portrait entrance & subtle slow zoom (Ken Burns)
  const portraitOpacity = interpolate(frame, [12, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const portraitScale = interpolate(frame, [0, 120], [1.0, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // Outro transition cross-fade in the last 10 frames
  const sceneOutOpacity = interpolate(frame, [110, 120], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: sceneOutOpacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 300, // Inside content-safe boundary (top: 270px)
        boxSizing: 'border-box',
      }}
    >
      {/* Eyebrow Badge */}
      <div
        style={{
          opacity: eyebrowOpacity,
          transform: `translateY(${eyebrowY}px)`,
          padding: '8px 24px',
          borderRadius: 999,
          backgroundColor: 'rgba(26, 115, 232, 0.16)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 4px 20px rgba(26, 115, 232, 0.3)',
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.primary,
            fontSize: 26,
            fontWeight: 700,
            color: THEME.colors.accentCyan,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {PROFILE_DATA.identity.title}
        </span>
      </div>

      {/* Main Headline */}
      <div
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          textAlign: 'center',
          maxWidth: 900,
          padding: '0 40px',
          marginBottom: 36,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: THEME.fonts.primary,
            fontSize: 88,
            fontWeight: 800,
            color: THEME.colors.textPrimary,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            textShadow: '0 8px 30px rgba(0, 0, 0, 0.75)',
          }}
        >
          I <span style={{ color: '#38BDF8' }}>build</span>,{' '}
          <span style={{ color: '#60A5FA' }}>research</span> and{' '}
          <span style={{ color: '#93C5FD' }}>teach</span> AI.
        </h1>
      </div>

      {/* Hero Portrait Frame */}
      <div
        style={{
          position: 'relative',
          width: 520,
          height: 680,
          borderRadius: 36,
          overflow: 'hidden',
          opacity: portraitOpacity,
          transform: `scale(${portraitScale})`,
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.8), 0 0 50px rgba(26, 115, 232, 0.35)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          backgroundColor: '#0F172A',
        }}
      >
        <Img
          src={staticFile('stills/hero-portrait.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Ambient bottom gradient inside portrait */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 60%, rgba(10, 14, 23, 0.85) 100%)',
          }}
        />

        {/* Name and credentials card inside portrait bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            right: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: THEME.fonts.primary,
              fontSize: 32,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            {PROFILE_DATA.identity.name}
          </span>
          <span
            style={{
              fontFamily: THEME.fonts.primary,
              fontSize: 22,
              fontWeight: 600,
              color: THEME.colors.accentCyan,
              letterSpacing: '0.04em',
            }}
          >
            {PROFILE_DATA.identity.honors} · {PROFILE_DATA.identity.education}
          </span>
        </div>
      </div>
    </div>
  );
};

