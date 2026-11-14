import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME, PROFILE_DATA } from '../content';
import { PhoneFrame } from '../components/PhoneFrame';
import { AnimatedBadge } from '../components/AnimatedText';

export const ResearchScene: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneInOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const sceneOutOpacity = interpolate(frame, [285, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const sceneOpacity = Math.min(sceneInOpacity, sceneOutOpacity);

  const phoneScale = interpolate(frame, [0, 300], [0.94, 1.01], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
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
        <AnimatedBadge text="Applied Research & Open Source" delay={0} />
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
          Research That Ships
        </h2>
      </div>

      {/* Center Phone Frame with Publications Recording */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
        }}
      >
        <PhoneFrame
          imageSrc="screenshots/ipad/04-awards.png"
          width={570}
          height={1236}
          scale={phoneScale}
          translateY={30}
        />
      </div>

      {/* Floating Research Highlight Callouts */}
      {/* Item 1: PyPI */}
      <div
        style={{
          position: 'absolute',
          top: 520,
          left: 74,
          maxWidth: 380,
          padding: '16px 22px',
          borderRadius: 20,
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
          zIndex: 35,
          opacity: interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, color: THEME.colors.accentCyan, textTransform: 'uppercase' }}>
          PyPI Package
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
          Galaxy Object Detection
        </div>
        <div style={{ fontSize: 16, color: THEME.colors.textSecondary, marginTop: 4 }}>
          Modular YOLO library for real-time edge vision
        </div>
      </div>

      {/* Item 2: Thesis */}
      <div
        style={{
          position: 'absolute',
          top: 800,
          right: 130,
          maxWidth: 380,
          padding: '16px 22px',
          borderRadius: 20,
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
          zIndex: 35,
          opacity: interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, color: THEME.colors.accentCyan, textTransform: 'uppercase' }}>
          Universitas Hasanuddin Thesis
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
          PPE Detection Models
        </div>
        <div style={{ fontSize: 16, color: THEME.colors.textSecondary, marginTop: 4 }}>
          Industrial safety compliance via computer vision
        </div>
      </div>

      {/* Item 3: Medium */}
      <div
        style={{
          position: 'absolute',
          top: 1080,
          left: 74,
          maxWidth: 380,
          padding: '16px 22px',
          borderRadius: 20,
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
          zIndex: 35,
          opacity: interpolate(frame, [110, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, color: THEME.colors.accentCyan, textTransform: 'uppercase' }}>
          Medium Publication
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
          Multimodal AI Guides
        </div>
        <div style={{ fontSize: 16, color: THEME.colors.textSecondary, marginTop: 4 }}>
          Engineering workflows & agent architectures
        </div>
      </div>
    </div>
  );
};

