import React from 'react';
import { Img, staticFile } from 'remotion';
import { Background } from './components/Background';
import { THEME, PROFILE_DATA } from './content';

export const Cover: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1920,
        backgroundColor: THEME.colors.bgNavyDark,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 320,
        boxSizing: 'border-box',
      }}
    >
      <Background accentIntensity={1.2} />

      {/* Eyebrow Badge */}
      <div
        style={{
          padding: '10px 28px',
          borderRadius: 999,
          backgroundColor: 'rgba(26, 115, 232, 0.2)',
          border: '1px solid rgba(56, 189, 248, 0.45)',
          boxShadow: '0 4px 20px rgba(26, 115, 232, 0.35)',
          marginBottom: 24,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.primary,
            fontSize: 28,
            fontWeight: 800,
            color: THEME.colors.accentCyan,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {PROFILE_DATA.identity.title}
        </span>
      </div>

      {/* Main Hook Headline */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: 920,
          padding: '0 40px',
          marginBottom: 36,
          zIndex: 10,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: THEME.fonts.primary,
            fontSize: 92,
            fontWeight: 800,
            color: THEME.colors.textPrimary,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            textShadow: '0 8px 30px rgba(0, 0, 0, 0.85)',
          }}
        >
          I <span style={{ color: '#38BDF8' }}>build</span>,{' '}
          <span style={{ color: '#60A5FA' }}>research</span> and{' '}
          <span style={{ color: '#93C5FD' }}>teach</span> AI.
        </h1>
      </div>

      {/* Hero Portrait Frame (Centered within 1080x1440 profile-grid crop) */}
      <div
        style={{
          position: 'relative',
          width: 560,
          height: 720,
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: '0 35px 80px rgba(0, 0, 0, 0.85), 0 0 60px rgba(26, 115, 232, 0.45)',
          border: '2px solid rgba(255, 255, 255, 0.22)',
          backgroundColor: '#0F172A',
          zIndex: 10,
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
            background: 'linear-gradient(180deg, transparent 55%, rgba(6, 9, 15, 0.9) 100%)',
          }}
        />

        {/* Identification */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            left: 28,
            right: 28,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: THEME.fonts.primary,
              fontSize: 34,
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

      {/* Website domain tag */}
      <div
        style={{
          marginTop: 40,
          padding: '12px 32px',
          borderRadius: 999,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.primary,
            fontSize: 26,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '0.04em',
          }}
        >
          {PROFILE_DATA.identity.websiteUrl}
        </span>
      </div>
    </div>
  );
};

