import React from 'react';
import { SAFE_ZONES, THEME } from '../content';

export const SafeZoneOverlay: React.FC = () => {
  const { boundaries, contentSafe, profileGrid } = SAFE_ZONES;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100,
        fontFamily: THEME.fonts.primary,
      }}
    >
      {/* Top Restricted Area (0 - 270 px) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: boundaries.top,
          backgroundColor: 'rgba(239, 68, 68, 0.22)',
          borderBottom: '2px dashed #EF4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#FFFFFF',
            fontSize: 28,
            fontWeight: 700,
            backgroundColor: 'rgba(239, 68, 68, 0.85)',
            padding: '6px 16px',
            borderRadius: 8,
          }}
        >
          TOP RESTRICTED AREA (Instagram Header / Status Bar: 0–270px)
        </span>
      </div>

      {/* Bottom Restricted Area (1440 - 1920 px, 480px height) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: boundaries.bottom,
          backgroundColor: 'rgba(239, 68, 68, 0.22)',
          borderTop: '2px dashed #EF4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#FFFFFF',
            fontSize: 28,
            fontWeight: 700,
            backgroundColor: 'rgba(239, 68, 68, 0.85)',
            padding: '6px 16px',
            borderRadius: 8,
          }}
        >
          BOTTOM RESTRICTED AREA (Reels Caption, Audio & Actions: 1440–1920px)
        </span>
      </div>

      {/* Left Restricted Area (0 - 64 px) */}
      <div
        style={{
          position: 'absolute',
          top: boundaries.top,
          left: 0,
          width: boundaries.left,
          height: contentSafe.height,
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          borderRight: '2px dashed #F59E0B',
        }}
      />

      {/* Right Restricted Area (960 - 1080 px, 120px width) */}
      <div
        style={{
          position: 'absolute',
          top: boundaries.top,
          right: 0,
          width: boundaries.right,
          height: contentSafe.height,
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          borderLeft: '2px dashed #F59E0B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: 700,
            backgroundColor: 'rgba(245, 158, 11, 0.85)',
            padding: '4px 8px',
            borderRadius: 6,
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          RIGHT SAFE BOUNDARY (120px)
        </span>
      </div>

      {/* Profile-Grid Safe Boundary (X: 0-1080, Y: 240-1680) */}
      <div
        style={{
          position: 'absolute',
          top: profileGrid.y,
          left: profileGrid.x,
          width: profileGrid.width,
          height: profileGrid.height,
          border: '3px solid rgba(168, 85, 247, 0.85)',
          boxSizing: 'border-box',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 14,
            backgroundColor: 'rgba(168, 85, 247, 0.9)',
            color: '#FFFFFF',
            fontSize: 22,
            fontWeight: 700,
            padding: '4px 14px',
            borderRadius: 6,
          }}
        >
          PROFILE-GRID THUMBNAIL (1080 × 1440)
        </div>
      </div>

      {/* Primary Content-Safe Rectangle (X: 64-960, Y: 270-1440) */}
      <div
        style={{
          position: 'absolute',
          top: contentSafe.y,
          left: contentSafe.x,
          width: contentSafe.width,
          height: contentSafe.height,
          border: '3px solid #10B981',
          boxSizing: 'border-box',
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            fontSize: 24,
            fontWeight: 800,
            padding: '6px 16px',
            borderRadius: 6,
          }}
        >
          ✓ PRIMARY CONTENT-SAFE AREA (896 × 1170 px)
        </div>
      </div>
    </div>
  );
};

