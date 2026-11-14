import React from 'react';
import { Img, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import { THEME, PROFILE_DATA } from '../content';
import { AnimatedBadge } from '../components/AnimatedText';

export const ProofCTAScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Part A: Proof montage (frames 0 to 60)
  // Part B: End card (frames 60 to 300)
  const isPartA = frame < 65;

  const partAOpacity = interpolate(frame, [0, 10, 50, 60], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const partBOpacity = interpolate(frame, [60, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Part A animation
  const awardScale = interpolate(frame, [0, 60], [0.96, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // Part B typography reveals
  const urlOpacity = interpolate(frame - 60, [10, 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const urlY = interpolate(frame - 60, [10, 28], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const bioOpacity = interpolate(frame - 60, [24, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaHeadingOpacity = interpolate(frame - 60, [36, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaHeadingY = interpolate(frame - 60, [36, 54], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const portraitAvatarScale = interpolate(frame - 60, [0, 240], [1.0, 1.05], {
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
      {/* ================= PART A: PROOF MONTAGE (0 - 60) ================= */}
      {isPartA && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: partAOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 300,
            boxSizing: 'border-box',
          }}
        >
          <AnimatedBadge text="Honors & Recognition" delay={0} />

          <h2
            style={{
              margin: '16px 0 28px 0',
              fontFamily: THEME.fonts.primary,
              fontSize: 54,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }}
          >
            {PROFILE_DATA.proof.primaryAward.title}
          </h2>

          {/* Top 20 AI Talent Hub Award Certificate */}
          <div
            style={{
              position: 'relative',
              width: 820,
              height: 580,
              borderRadius: 28,
              overflow: 'hidden',
              transform: `scale(${awardScale})`,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85), 0 0 50px rgba(26, 115, 232, 0.35)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: '#0F172A',
            }}
          >
            <Img
              src={staticFile('screenshots/laptop/06-awards.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                backgroundColor: '#0A0E17',
              }}
            />
          </div>

          {/* Accolade tags */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 32,
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: 860,
            }}
          >
            {PROFILE_DATA.proof.hackathons.map((h, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 22px',
                  borderRadius: 14,
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                {h}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= PART B: END CARD & CTA (60 - 300) ================= */}
      {frame >= 55 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: partBOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          {/* Avatar Hero Portrait */}
          <div
            style={{
              width: 240,
              height: 240,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid rgba(56, 189, 248, 0.6)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(26, 115, 232, 0.5)',
              marginBottom: 36,
              transform: `scale(${portraitAvatarScale})`,
            }}
          >
            <Img
              src={staticFile('stills/hero-portrait.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
              }}
            />
          </div>

          {/* Name & Title */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 28,
            }}
          >
            <div
              style={{
                fontFamily: THEME.fonts.primary,
                fontSize: 52,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: 8,
              }}
            >
              {PROFILE_DATA.identity.name}
            </div>
            <div
              style={{
                fontFamily: THEME.fonts.primary,
                fontSize: 28,
                fontWeight: 600,
                color: THEME.colors.accentCyan,
                letterSpacing: '0.04em',
              }}
            >
              {PROFILE_DATA.identity.title}
            </div>
          </div>

          {/* Primary CTA Heading: "Let's build something that ships." */}
          <div
            style={{
              opacity: ctaHeadingOpacity,
              transform: `translateY(${ctaHeadingY}px)`,
              textAlign: 'center',
              maxWidth: 820,
              marginBottom: 36,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: THEME.fonts.primary,
                fontSize: 58,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
              }}
            >
              {PROFILE_DATA.identity.ctaHeading}
            </h2>
          </div>

          {/* Website URL Box (Dominant focal point) */}
          <div
            style={{
              opacity: urlOpacity,
              transform: `translateY(${urlY}px)`,
              padding: '20px 48px',
              borderRadius: 24,
              background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.3) 0%, rgba(56, 189, 248, 0.15) 100%)',
              border: '2px solid rgba(56, 189, 248, 0.6)',
              boxShadow: '0 16px 45px rgba(26, 115, 232, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily: THEME.fonts.primary,
                fontSize: 44,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
              }}
            >
              {PROFILE_DATA.identity.websiteUrl}
            </span>
          </div>

          {/* "Link in bio" Pill */}
          <div
            style={{
              opacity: bioOpacity,
              padding: '8px 24px',
              borderRadius: 999,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <span
              style={{
                fontFamily: THEME.fonts.primary,
                fontSize: 24,
                fontWeight: 600,
                color: THEME.colors.textSecondary,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {PROFILE_DATA.identity.linkInBio}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

