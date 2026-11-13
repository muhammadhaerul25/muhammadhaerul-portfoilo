import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';
import { Background } from './components/Background';
import { Subtitle, SubtitleLanguage } from './components/Subtitle';
import { SafeZoneOverlay } from './components/SafeZoneOverlay';
import { HookScene } from './scenes/Hook';
import { WhoScene } from './scenes/Who';
import { BuildScene } from './scenes/Build';
import { ResearchScene } from './scenes/Research';
import { TeachScene } from './scenes/Teach';
import { ProofCTAScene } from './scenes/ProofCTA';
import { TIMELINE, VIDEO_CONFIG } from './content';

export interface PortfolioShowreelProps {
  language?: SubtitleLanguage;
  showSafeZones?: boolean;
  hasVoiceover?: boolean;
  hasMusic?: boolean;
}

export const PortfolioShowreel: React.FC<PortfolioShowreelProps> = ({
  language = 'en',
  showSafeZones = false,
  hasVoiceover = false,
  hasMusic = false,
}) => {
  const { scenes } = TIMELINE;

  return (
    <div
      style={{
        position: 'relative',
        width: VIDEO_CONFIG.width,
        height: VIDEO_CONFIG.height,
        backgroundColor: '#06090F',
        overflow: 'hidden',
      }}
    >
      {/* 1. Global Cinematic Ambient Background */}
      <Background />

      {/* 2. Sequence 01: THE HOOK (Frames 0 - 119) */}
      <Sequence from={scenes.hook.start} durationInFrames={scenes.hook.duration}>
        <HookScene />
      </Sequence>

      {/* 3. Sequence 02: WHO I AM (Frames 120 - 359) */}
      <Sequence from={scenes.who.start} durationInFrames={scenes.who.duration}>
        <WhoScene />
      </Sequence>

      {/* 4. Sequence 03: BUILD (Frames 360 - 839) */}
      <Sequence from={scenes.build.start} durationInFrames={scenes.build.duration}>
        <BuildScene />
      </Sequence>

      {/* 5. Sequence 04: RESEARCH (Frames 840 - 1139) */}
      <Sequence from={scenes.research.start} durationInFrames={scenes.research.duration}>
        <ResearchScene />
      </Sequence>

      {/* 6. Sequence 05: TEACH (Frames 1140 - 1499) */}
      <Sequence from={scenes.teach.start} durationInFrames={scenes.teach.duration}>
        <TeachScene />
      </Sequence>

      {/* 7. Sequence 06: PROOF AND CTA (Frames 1500 - 1799) */}
      <Sequence from={scenes.proofCta.start} durationInFrames={scenes.proofCta.duration}>
        <ProofCTAScene />
      </Sequence>

      {/* 8. Burned-In Multilingual Subtitles (Content-Safe Area) */}
      <Subtitle language={language} />

      {/* 9. Optional Safe-Zone Debug Overlay (Excluded in Production) */}
      {showSafeZones && <SafeZoneOverlay />}

      {/* 10. Audio Support (if audio files are supplied) */}
      {hasVoiceover && (
        <Audio src={staticFile('audio/voiceover.mp3')} volume={1.0} />
      )}
      {hasMusic && (
        <Audio
          src={staticFile('audio/music.mp3')}
          volume={(f) => {
            // Fade-in at start, ducking when voiceover is present, fade-out at end
            if (f < 30) return (f / 30) * 0.45;
            if (f > 1750) return ((1800 - f) / 50) * 0.45;
            return hasVoiceover ? 0.25 : 0.45;
          }}
        />
      )}
    </div>
  );
};

