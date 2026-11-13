import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME, PROFILE_DATA } from '../content';
import { PhoneFrame } from '../components/PhoneFrame';
import { Counter } from '../components/Counter';

export const WhoScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Intro fade/slide
  const sceneInOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Outro fade
  const sceneOutOpacity = interpolate(frame, [226, 240], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const sceneOpacity = Math.min(sceneInOpacity, sceneOutOpacity);

  // Phone scale and entrance
  const phoneScale = interpolate(frame, [0, 240], [0.88, 0.94], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // Header entrance
  const headerY = interpolate(frame, [0, 16], [-20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: sceneOpacity,
        zIndex: 10,
      }}
    >
      {/* Top Header & Role */}
      <div
        style={{
          position: 'absolute',
          top: 315,
          left: 64,
          right: 120,
          textAlign: 'center',
          transform: `translateY(${headerY}px)`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: THEME.fonts.primary,
            fontSize: 24,
            fontWeight: 700,
            color: THEME.colors.accentCyan,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          {PROFILE_DATA.identity.roles}
        </div>
        <div
          style={{
            fontFamily: THEME.fonts.primary,
            fontSize: 48,
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          A Proven Track Record in AI
        </div>
      </div>

      {/* Center Phone Frame displaying Hero Footage */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <PhoneFrame
          clipSrc="clips/hero.mp4"
          width={560}
          height={1214}
          scale={phoneScale}
          translateY={20}
        />
      </div>

      {/* Floating Staggered Stat Cards on Left & Right Sides */}
      {/* Stat 1: 4+ Yrs */}
      <div
        style={{
          position: 'absolute',
          top: 480,
          left: 74,
          zIndex: 30,
        }}
      >
        <Counter
          to={PROFILE_DATA.stats[0].value}
          suffix={PROFILE_DATA.stats[0].suffix}
          label={PROFILE_DATA.stats[0].label}
          delay={12}
          duration={35}
          fontSize={68}
        />
      </div>

      {/* Stat 2: 20+ Shipped */}
      <div
        style={{
          position: 'absolute',
          top: 480,
          right: 130,
          zIndex: 30,
        }}
      >
        <Counter
          to={PROFILE_DATA.stats[1].value}
          suffix={PROFILE_DATA.stats[1].suffix}
          label={PROFILE_DATA.stats[1].label}
          delay={24}
          duration={35}
          fontSize={68}
        />
      </div>

      {/* Stat 3: 1,560+ Attendees */}
      <div
        style={{
          position: 'absolute',
          top: 1120,
          left: 74,
          zIndex: 30,
        }}
      >
        <Counter
          to={PROFILE_DATA.stats[2].value}
          suffix={PROFILE_DATA.stats[2].suffix}
          label={PROFILE_DATA.stats[2].label}
          delay={36}
          duration={40}
          fontSize={68}
        />
      </div>

      {/* Stat 4: 9.5 Rating */}
      <div
        style={{
          position: 'absolute',
          top: 1120,
          right: 130,
          zIndex: 30,
        }}
      >
        <Counter
          to={PROFILE_DATA.stats[3].value}
          decimals={1}
          suffix={PROFILE_DATA.stats[3].suffix}
          label={PROFILE_DATA.stats[3].label}
          delay={48}
          duration={35}
          fontSize={68}
        />
      </div>
    </div>
  );
};

