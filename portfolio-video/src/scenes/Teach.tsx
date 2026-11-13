import React from 'react';
import { Img, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import { THEME, PROFILE_DATA } from '../content';
import { AnimatedBadge } from '../components/AnimatedText';

export const TeachScene: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneInOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const sceneOutOpacity = interpolate(frame, [345, 360], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const sceneOpacity = Math.min(sceneInOpacity, sceneOutOpacity);

  // Slideshow 3 photos across 360 frames (120 frames each)
  // Photo 1: 0 - 120 (GSA AI Forge)
  // Photo 2: 120 - 240 (Mindful AI Keynote)
  // Photo 3: 240 - 360 (Build with AI Speaker)
  const currentPhotoIndex = frame < 120 ? 0 : frame < 240 ? 1 : 2;

  // Ken Burns effects
  // Photo 1: gentle push in
  const p1Scale = interpolate(frame, [0, 120], [1.0, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const p1Opacity = interpolate(frame, [0, 15, 110, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Photo 2: slow lateral movement + subtle zoom
  const p2Scale = interpolate(frame, [120, 240], [1.02, 1.09], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const p2X = interpolate(frame, [120, 240], [-15, 15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p2Opacity = interpolate(frame, [120, 135, 230, 240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Photo 3: gentle push-in
  const p3Scale = interpolate(frame, [240, 360], [1.0, 1.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const p3Opacity = interpolate(frame, [240, 255, 345, 360], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const photoCaptions = [
    { title: 'GSA AI Forge', org: 'Google Student Ambassador · 150+ Attendees' },
    { title: 'Mindful AI Masterclass', org: 'Yayasan Khouw Kalbe · AI Personalization' },
    { title: 'Build with AI Workshop', org: 'Google Developer Groups · 100+ Attendees' },
  ];

  const activeCaption = photoCaptions[currentPhotoIndex];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: sceneOpacity,
        zIndex: 10,
      }}
    >
      {/* Top Header */}
      <div
        style={{
          position: 'absolute',
          top: 285,
          left: 64,
          right: 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 30,
        }}
      >
        <AnimatedBadge text="AI Trainer & Educator" delay={0} />
        <h2
          style={{
            margin: '12px 0 0 0',
            fontFamily: THEME.fonts.primary,
            fontSize: 54,
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          {PROFILE_DATA.teach.headline}
        </h2>
        <div
          style={{
            fontFamily: THEME.fonts.primary,
            fontSize: 24,
            fontWeight: 600,
            color: THEME.colors.textSecondary,
            marginTop: 6,
          }}
        >
          {PROFILE_DATA.teach.subheadline}
        </div>
      </div>

      {/* Main Photographic Ken Burns Stage */}
      <div
        style={{
          position: 'absolute',
          top: 500,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 780,
          height: 720,
          borderRadius: 36,
          overflow: 'hidden',
          backgroundColor: '#0F172A',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85), 0 0 50px rgba(26, 115, 232, 0.35)',
          border: '2px solid rgba(255, 255, 255, 0.16)',
          zIndex: 20,
        }}
      >
        {/* Photo 1 */}
        {frame < 125 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: p1Opacity,
              transform: `scale(${p1Scale})`,
              transformOrigin: 'center center',
            }}
          >
            <Img
              src={staticFile('stills/talk-01.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* Photo 2 */}
        {frame >= 115 && frame < 245 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: p2Opacity,
              transform: `scale(${p2Scale}) translateX(${p2X}px)`,
              transformOrigin: 'center center',
            }}
          >
            <Img
              src={staticFile('stills/talk-02.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* Photo 3 */}
        {frame >= 235 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: p3Opacity,
              transform: `scale(${p3Scale})`,
              transformOrigin: 'center center',
            }}
          >
            <Img
              src={staticFile('stills/talk-03.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* Bottom Vignette Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 55%, rgba(6, 9, 15, 0.88) 100%)',
          }}
        />

        {/* Photographic Caption Card */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 28,
            right: 28,
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
            {activeCaption.title}
          </span>
          <span
            style={{
              fontFamily: THEME.fonts.primary,
              fontSize: 22,
              fontWeight: 600,
              color: THEME.colors.accentCyan,
            }}
          >
            {activeCaption.org}
          </span>
        </div>
      </div>

      {/* Floating Pill Counter: 650+ / 1,560+ Attendees */}
      <div
        style={{
          position: 'absolute',
          top: 1250,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 20,
          zIndex: 30,
        }}
      >
        <div
          style={{
            padding: '12px 28px',
            borderRadius: 20,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF' }}>RevoU AI Trainer</span>
          <span style={{ fontSize: 20, color: THEME.colors.accentCyan, marginLeft: 10 }}>Enterprise & Public</span>
        </div>
      </div>
    </div>
  );
};

