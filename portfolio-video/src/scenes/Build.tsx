import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME, PROFILE_DATA } from '../content';
import { PhoneFrame } from '../components/PhoneFrame';
import { AnimatedBadge } from '../components/AnimatedText';

export const BuildScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Part 1: Experiences (frames 0 to 240)
  // Part 2: Projects (frames 240 to 480)
  const isPart1 = frame < 240;

  // Crossfade between Part 1 and Part 2
  const part1Opacity = interpolate(frame, [0, 15, 225, 240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const part2Opacity = interpolate(frame, [240, 255, 465, 480], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slow subtle phone zoom
  const phoneScale1 = interpolate(frame, [0, 240], [0.95, 1.02], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const phoneScale2 = interpolate(frame, [240, 480], [0.95, 1.02], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
      }}
    >
      {/* ================= PART 1: EXPERIENCES (0 - 240) ================= */}
      {frame < 250 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: part1Opacity,
          }}
        >
          {/* Section Header */}
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
            <AnimatedBadge text="Production AI Experience" delay={0} />
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
              Real AI Teams. Real Impact.
            </h2>
          </div>

          {/* Center Phone Frame displaying Experiences Recording */}
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
              imageSrc="screenshots/mobile/05-experience-timeline.png"
              width={570}
              height={1236}
              scale={phoneScale1}
              translateY={30}
            />
          </div>

          {/* Staggered Experience Highlight Cards (Right / Left) */}
          {/* Card 1: AksaraHub */}
          <div
            style={{
              position: 'absolute',
              top: 480,
              left: 74,
              maxWidth: 360,
              padding: '16px 20px',
              borderRadius: 18,
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65)',
              zIndex: 35,
              opacity: interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.accentCyan, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              AksaraHub Nusantara
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
              Co-Founder & AI Lead
            </div>
            <div style={{ fontSize: 18, color: THEME.colors.textSecondary, marginTop: 4 }}>
              Cultural OCR & Script Recognition
            </div>
          </div>

          {/* Card 2: Paper.id */}
          <div
            style={{
              position: 'absolute',
              top: 720,
              right: 130,
              maxWidth: 360,
              padding: '16px 20px',
              borderRadius: 18,
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65)',
              zIndex: 35,
              opacity: interpolate(frame, [65, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.accentCyan, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Paper.id
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
              AI Engineer
            </div>
            <div style={{ fontSize: 18, color: THEME.colors.textSecondary, marginTop: 4 }}>
              LLM OCR for KYC/KYB · 99% Accuracy
            </div>
          </div>

          {/* Card 3: XL Axiata */}
          <div
            style={{
              position: 'absolute',
              top: 1100,
              left: 74,
              maxWidth: 360,
              padding: '16px 20px',
              borderRadius: 18,
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65)',
              zIndex: 35,
              opacity: interpolate(frame, [120, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.accentCyan, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              XL Axiata X-Camp
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
              AIoT Engineer
            </div>
            <div style={{ fontSize: 18, color: THEME.colors.textSecondary, marginTop: 4 }}>
              PPE Detection on Raspberry Pi
            </div>
          </div>
        </div>
      )}

      {/* ================= PART 2: PROJECTS (240 - 480) ================= */}
      {frame >= 235 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: part2Opacity,
          }}
        >
          {/* Section Header */}
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
            <AnimatedBadge text="End-to-End AI Systems" delay={0} />
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
              20+ Shipped Solutions
            </h2>
          </div>

          {/* Center Phone Frame displaying Projects Recording */}
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
              imageSrc="screenshots/mobile/03-project-card.png"
              width={570}
              height={1236}
              scale={phoneScale2}
              translateY={30}
            />
          </div>

          {/* Project Callouts */}
          <div
            style={{
              position: 'absolute',
              top: 480,
              left: 74,
              maxWidth: 380,
              padding: '16px 20px',
              borderRadius: 18,
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65)',
              zIndex: 35,
              opacity: interpolate(frame, [255, 270], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.accentCyan, textTransform: 'uppercase' }}>
              Aksara Lontara Recognition
            </div>
            <div style={{ fontSize: 18, color: THEME.colors.textSecondary, marginTop: 4 }}>
              Interactive Cultural OCR & Deep Learning Canvas
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: 730,
              right: 130,
              maxWidth: 380,
              padding: '16px 20px',
              borderRadius: 18,
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65)',
              zIndex: 35,
              opacity: interpolate(frame, [315, 330], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.accentCyan, textTransform: 'uppercase' }}>
              AI Split Bills
            </div>
            <div style={{ fontSize: 18, color: THEME.colors.textSecondary, marginTop: 4 }}>
              Multimodal Vision Receipt Parsing
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: 1100,
              left: 74,
              maxWidth: 380,
              padding: '16px 20px',
              borderRadius: 18,
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65)',
              zIndex: 35,
              opacity: interpolate(frame, [375, 390], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.accentCyan, textTransform: 'uppercase' }}>
              Galaxy ALPR
            </div>
            <div style={{ fontSize: 18, color: THEME.colors.textSecondary, marginTop: 4 }}>
              Real-time License Plate Recognition with YOLO
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

