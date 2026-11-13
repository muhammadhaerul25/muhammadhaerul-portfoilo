import React from 'react';
import { Composition, Still } from 'remotion';
import { PortfolioShowreel } from './PortfolioShowreel';
import { Cover } from './Cover';
import { VIDEO_CONFIG } from './content';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Production Reel — English (Default) */}
      <Composition
        id="PortfolioShowreel"
        component={PortfolioShowreel}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
        defaultProps={{
          language: 'en' as const,
          showSafeZones: false,
          hasVoiceover: false,
          hasMusic: false,
        }}
      />

      {/* 2. Production Reel — Indonesian Subtitles */}
      <Composition
        id="PortfolioShowreelID"
        component={PortfolioShowreel}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
        defaultProps={{
          language: 'id' as const,
          showSafeZones: false,
          hasVoiceover: false,
          hasMusic: false,
        }}
      />

      {/* 3. Safe-Zone Debug Overlay Reel */}
      <Composition
        id="SafeZoneDebug"
        component={PortfolioShowreel}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
        defaultProps={{
          language: 'en' as const,
          showSafeZones: true,
          hasVoiceover: false,
          hasMusic: false,
        }}
      />

      {/* 4. Instagram Profile-Grid Compatible Cover (1080x1920) */}
      <Still
        id="Cover"
        component={Cover}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  );
};

