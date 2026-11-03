const sharp = require('sharp');
const fs = require('fs');

async function generateGalaxyCover() {
  const svg = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0e1a"/>
        <stop offset="50%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e1b4b"/>
      </linearGradient>
      <linearGradient id="accentGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8"/>
        <stop offset="50%" stop-color="#818cf8"/>
        <stop offset="100%" stop-color="#c084fc"/>
      </linearGradient>
      <linearGradient id="boxGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#0284c7" stop-opacity="0.2"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      </pattern>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1280" height="720" fill="url(#bg)"/>
    <rect width="1280" height="720" fill="url(#grid)"/>

    <!-- Ambient glowing orbs -->
    <circle cx="200" cy="180" r="260" fill="#38bdf8" opacity="0.08" filter="blur(60px)"/>
    <circle cx="1050" cy="500" r="320" fill="#818cf8" opacity="0.1" filter="blur(80px)"/>

    <!-- Decorative HUD / Vision Detection Elements -->
    <!-- Top-right detection HUD box 1 -->
    <g transform="translate(820, 90)" filter="url(#shadow)">
      <rect width="360" height="230" rx="14" fill="#0f172a" fill-opacity="0.85" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="8 4"/>
      <!-- Crosshairs -->
      <path d="M 20 20 L 40 20 M 20 20 L 20 40" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
      <path d="M 340 20 L 320 20 M 340 20 L 340 40" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
      <path d="M 20 210 L 40 210 M 20 210 L 20 190" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
      <path d="M 340 210 L 320 210 M 340 210 L 340 190" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
      
      <!-- Detection labels -->
      <rect x="35" y="32" width="130" height="24" rx="4" fill="#0284c7"/>
      <text x="42" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.5">TARGET: PERSON (0.98)</text>

      <rect x="180" y="32" width="145" height="24" rx="4" fill="#4f46e5"/>
      <text x="187" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.5">SAFETY VEST (0.96)</text>

      <!-- Center target reticle -->
      <circle cx="180" cy="130" r="38" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.6"/>
      <circle cx="180" cy="130" r="4" fill="#38bdf8"/>
      <line x1="180" y1="80" x2="180" y2="180" stroke="#38bdf8" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>
      <line x1="130" y1="130" x2="230" y2="130" stroke="#38bdf8" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>
      
      <!-- Metrics -->
      <text x="35" y="195" font-family="'SF Mono', Consolas, monospace" font-size="11" fill="#94a3b8">FPS: 62.4  ·  LATENCY: 12.8ms  ·  YOLOv11</text>
    </g>

    <!-- Bottom-right detection HUD box 2 -->
    <g transform="translate(860, 360)" filter="url(#shadow)">
      <rect width="320" height="190" rx="14" fill="#0f172a" fill-opacity="0.85" stroke="#818cf8" stroke-width="1.5"/>
      <rect x="25" y="24" width="140" height="22" rx="4" fill="#7c3aed"/>
      <text x="32" y="39" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">HARD HAT DETECTED (0.99)</text>
      <rect x="25" y="60" width="270" height="100" rx="8" fill="#1e1b4b" fill-opacity="0.5" stroke="#6366f1" stroke-width="1"/>
      <text x="40" y="95" font-family="'SF Mono', Consolas, monospace" font-size="12" fill="#a5b4fc">&gt; bbox: [124, 82, 340, 420]</text>
      <text x="40" y="120" font-family="'SF Mono', Consolas, monospace" font-size="12" fill="#38bdf8">&gt; class_id: 04 [industrial_ppe]</text>
      <text x="40" y="145" font-family="'SF Mono', Consolas, monospace" font-size="12" fill="#34d399">&gt; status: VERIFIED_COMPLIANT</text>
    </g>

    <!-- Left Content Column -->
    <!-- Pill Badge -->
    <g transform="translate(80, 110)">
      <rect width="265" height="36" rx="18" fill="rgba(56, 189, 248, 0.12)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1.2"/>
      <!-- Python / PyPI icon -->
      <circle cx="24" cy="18" r="8" fill="#38bdf8"/>
      <text x="42" y="23" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#38bdf8" letter-spacing="0.5">PYPI OPEN SOURCE PACKAGE</text>
    </g>

    <!-- Main Title -->
    <text x="80" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" fill="#ffffff" letter-spacing="-1">
      Galaxy Object
    </text>
    <text x="80" y="270" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" fill="url(#accentGlow)" letter-spacing="-1">
      Detection Core
    </text>

    <!-- Subtitle / Tagline -->
    <text x="80" y="325" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="400" fill="#94a3b8" width="600">
      Modular, production-ready computer vision library built on YOLO &amp; YOLOWorld.
    </text>
    <text x="80" y="355" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="400" fill="#94a3b8" width="600">
      Optimized for high-throughput edge deployment &amp; multi-class industrial datasets.
    </text>

    <!-- Terminal snippet box -->
    <g transform="translate(80, 410)" filter="url(#shadow)">
      <rect width="580" height="90" rx="12" fill="#090d16" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <!-- Terminal dots -->
      <circle cx="24" cy="22" r="5" fill="#ef4444"/>
      <circle cx="40" cy="22" r="5" fill="#eab308"/>
      <circle cx="56" cy="22" r="5" fill="#22c55e"/>
      <text x="80" y="26" font-family="'SF Mono', Consolas, monospace" font-size="11" fill="#64748b">bash — install &amp; import</text>
      
      <text x="24" y="62" font-family="'SF Mono', Consolas, monospace" font-size="15" font-weight="600" fill="#f8fafc">
        <tspan fill="#38bdf8">$ </tspan>pip install <tspan fill="#a78bfa" font-weight="700">galaxy-object-detection-core</tspan>
      </text>
    </g>

    <!-- Category Feature Pills -->
    <g transform="translate(80, 540)">
      <g transform="translate(0, 0)">
        <rect width="115" height="32" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        <text x="16" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">⚡ 20+ Classes</text>
      </g>
      <g transform="translate(125, 0)">
        <rect width="125" height="32" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        <text x="16" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">🎯 Zero-Shot API</text>
      </g>
      <g transform="translate(260, 0)">
        <rect width="145" height="32" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        <text x="16" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">🚀 Edge Inference</text>
      </g>
      <g transform="translate(415, 0)">
        <rect width="135" height="32" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        <text x="16" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">📦 PyPI Verified</text>
      </g>
    </g>

    <!-- Author & Publisher attribution footer -->
    <g transform="translate(80, 640)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#64748b">
        AUTHORED BY <tspan fill="#f1f5f9">MUHAMMAD HAERUL</tspan>  ·  PUBLISHED ON PYTHON PACKAGE INDEX  ·  RELEASE 2025
      </text>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile('public/assets/images/publications/pub-galaxy-detection.png');
  console.log('Galaxy Object Detection cover generated.');
}

async function generateMultimodalCover() {
  const svg = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050811"/>
        <stop offset="45%" stop-color="#0b1329"/>
        <stop offset="100%" stop-color="#061c1e"/>
      </linearGradient>
      <linearGradient id="agentGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2dd4bf"/>
        <stop offset="50%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#818cf8"/>
      </linearGradient>
      <pattern id="dotGrid" width="32" height="32" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.06)"/>
      </pattern>
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000000" flood-opacity="0.65"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1280" height="720" fill="url(#bg2)"/>
    <rect width="1280" height="720" fill="url(#dotGrid)"/>

    <!-- Glowing ambient spots -->
    <circle cx="240" cy="200" r="280" fill="#14b8a6" opacity="0.08" filter="blur(70px)"/>
    <circle cx="1000" cy="360" r="340" fill="#38bdf8" opacity="0.1" filter="blur(90px)"/>

    <!-- Right Side: Architecture Pipeline Flow Diagram -->
    <g transform="translate(740, 100)" filter="url(#cardShadow)">
      <!-- Pipeline Outer Glass Card -->
      <rect width="460" height="500" rx="20" fill="#0a101f" fill-opacity="0.88" stroke="rgba(45, 212, 191, 0.25)" stroke-width="1.5"/>
      
      <!-- Card Header -->
      <g transform="translate(30, 35)">
        <circle cx="8" cy="8" r="6" fill="#2dd4bf"/>
        <text x="24" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#2dd4bf" letter-spacing="1">SYSTEM ARCHITECTURE</text>
        <text x="260" y="13" font-family="'SF Mono', Consolas, monospace" font-size="11" fill="#64748b">END-TO-END PIPELINE</text>
        <line x1="0" y1="28" x2="400" y2="28" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      </g>

      <!-- Step 1: Multimodal Perception Stream -->
      <g transform="translate(30, 85)">
        <rect width="400" height="75" rx="10" fill="#0f172a" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.2"/>
        <text x="20" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff">1. Multimodal Perception Stream</text>
        <text x="20" y="55" font-family="'SF Mono', Consolas, monospace" font-size="11" fill="#94a3b8">Video Frames (RTSP) · Audio · User Intent Prompts</text>
        <rect x="330" y="16" width="54" height="22" rx="4" fill="rgba(56, 189, 248, 0.15)"/>
        <text x="338" y="31" font-family="'SF Mono', Consolas, monospace" font-size="10.5" font-weight="700" fill="#38bdf8">INGEST</text>
      </g>

      <!-- Connector arrow 1 -->
      <path d="M 230 160 L 230 185" stroke="#2dd4bf" stroke-width="2" stroke-dasharray="3 3"/>
      <polygon points="226,183 234,183 230,190" fill="#2dd4bf"/>

      <!-- Step 2: Edge YOLO Vision Pipeline -->
      <g transform="translate(30, 190)">
        <rect width="400" height="75" rx="10" fill="#0f172a" stroke="rgba(45, 212, 191, 0.5)" stroke-width="1.2"/>
        <text x="20" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff">2. Edge YOLO Vision Inference</text>
        <text x="20" y="55" font-family="'SF Mono', Consolas, monospace" font-size="11" fill="#2dd4bf">Hardware Accelerated TensorRT · Zero-Copy Tensor Pipeline</text>
        <rect x="310" y="16" width="74" height="22" rx="4" fill="rgba(45, 212, 191, 0.18)"/>
        <text x="318" y="31" font-family="'SF Mono', Consolas, monospace" font-size="10.5" font-weight="700" fill="#2dd4bf">&lt; 15ms</text>
      </g>

      <!-- Connector arrow 2 -->
      <path d="M 230 265 L 230 290" stroke="#818cf8" stroke-width="2" stroke-dasharray="3 3"/>
      <polygon points="226,288 234,288 230,295" fill="#818cf8"/>

      <!-- Step 3: Multimodal Reasoning Agent & VLM -->
      <g transform="translate(30, 295)">
        <rect width="400" height="75" rx="10" fill="#0f172a" stroke="rgba(129, 140, 248, 0.4)" stroke-width="1.2"/>
        <text x="20" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff">3. Agent Reasoning &amp; Tool Calling</text>
        <text x="20" y="55" font-family="'SF Mono', Consolas, monospace" font-size="11" fill="#cbd5e1">Spatial Grounding · Context Router · Function Calling</text>
        <rect x="318" y="16" width="66" height="22" rx="4" fill="rgba(129, 140, 248, 0.2)"/>
        <text x="326" y="31" font-family="'SF Mono', Consolas, monospace" font-size="10.5" font-weight="700" fill="#a5b4fc">AGENT</text>
      </g>

      <!-- Connector arrow 3 -->
      <path d="M 230 370 L 230 395" stroke="#34d399" stroke-width="2" stroke-dasharray="3 3"/>
      <polygon points="226,393 234,393 230,400" fill="#34d399"/>

      <!-- Step 4: Real-Time Action Execution -->
      <g transform="translate(30, 400)">
        <rect width="400" height="75" rx="10" fill="#0f172a" stroke="rgba(52, 211, 153, 0.4)" stroke-width="1.2"/>
        <text x="20" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff">4. Real-Time Action &amp; WebSockets</text>
        <text x="20" y="55" font-family="'SF Mono', Consolas, monospace" font-size="11" fill="#34d399">Bi-directional event broadcast · Autonomous alerts</text>
        <rect x="318" y="16" width="66" height="22" rx="4" fill="rgba(52, 211, 153, 0.2)"/>
        <text x="328" y="31" font-family="'SF Mono', Consolas, monospace" font-size="10.5" font-weight="700" fill="#34d399">ACTUATE</text>
      </g>
    </g>

    <!-- Left Content Column -->
    <!-- Medium publication tag -->
    <g transform="translate(80, 110)">
      <rect width="250" height="36" rx="18" fill="rgba(45, 212, 191, 0.12)" stroke="rgba(45, 212, 191, 0.35)" stroke-width="1.2"/>
      <circle cx="24" cy="18" r="8" fill="#2dd4bf"/>
      <text x="42" y="23" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#2dd4bf" letter-spacing="0.5">MEDIUM TECHNICAL GUIDE</text>
    </g>

    <!-- Main Title -->
    <text x="80" y="200" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" fill="#ffffff" letter-spacing="-1">
      Architecting Real-Time
    </text>
    <text x="80" y="255" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" fill="url(#agentGlow)" letter-spacing="-1">
      Multimodal AI Agents
    </text>
    <text x="80" y="310" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="900" fill="#ffffff" letter-spacing="-1">
      &amp; Edge Vision Pipelines
    </text>

    <!-- Subtitle / Tagline -->
    <text x="80" y="365" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="400" fill="#94a3b8" width="560">
      An in-depth engineering deep-dive on designing low-latency multimodal
    </text>
    <text x="80" y="395" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="400" fill="#94a3b8" width="560">
      agent workflows, edge computer vision with YOLO, and resilient AI architectures.
    </text>

    <!-- Key Insights / Tech Pills -->
    <g transform="translate(80, 450)">
      <g transform="translate(0, 0)">
        <rect width="185" height="42" rx="10" fill="#0f172a" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        <text x="18" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">🤖 Multimodal LLMs</text>
      </g>
      <g transform="translate(200, 0)">
        <rect width="165" height="42" rx="10" fill="#0f172a" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        <text x="18" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">⚡ Edge YOLO CV</text>
      </g>
      <g transform="translate(380, 0)">
        <rect width="185" height="42" rx="10" fill="#0f172a" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        <text x="18" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">📡 WebSockets &amp; RTC</text>
      </g>
    </g>

    <!-- Author & Read Time footer -->
    <g transform="translate(80, 560)">
      <rect width="565" height="60" rx="12" fill="#090d16" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <circle cx="36" cy="30" r="14" fill="#1e293b"/>
      <text x="31" y="35" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#38bdf8">M</text>
      <text x="64" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13.5" font-weight="700" fill="#ffffff">Muhammad Haerul</text>
      <text x="64" y="47" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#64748b">AI Systems &amp; Full-Stack Specialist  ·  8 min read</text>
      <text x="430" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="700" fill="#2dd4bf">READ ON MEDIUM ↗</text>
    </g>

    <!-- Bottom copyright line -->
    <text x="80" y="660" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="600" fill="#475569">
      PUBLISHED AUGUST 2025  ·  PEER-REVIEWED ARCHITECTURE DESIGN  ·  OPEN ENGINEERING SERIES
    </text>
  </svg>
  `;

  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile('public/assets/images/publications/pub-multimodal-agents.png');
  console.log('Multimodal Agents cover generated.');
}

async function run() {
  await generateGalaxyCover();
  await generateMultimodalCover();
  console.log('All publication covers successfully generated!');
}

run().catch(console.error);

