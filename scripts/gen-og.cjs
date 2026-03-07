const sharp = require('sharp');
const path = require('path');

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Background gradients -->
    <radialGradient id="bg-center" cx="30%" cy="50%" r="60%" gradientUnits="userSpaceOnUse" x1="0" y1="0">
      <stop offset="0%" stop-color="#0d2040" stop-opacity="1"/>
      <stop offset="100%" stop-color="#040d1a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bg-violet" cx="1050" cy="480" r="320" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3b1b6e" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#3b1b6e" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bg-cyan-bottom" cx="200" cy="580" r="280" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#083048" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#083048" stop-opacity="0"/>
    </radialGradient>

    <!-- Globe gradients -->
    <radialGradient id="globe-fill" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#0a1e3c"/>
      <stop offset="100%" stop-color="#040e1e"/>
    </radialGradient>

    <!-- Text gradient -->
    <linearGradient id="title-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8f4ff"/>
      <stop offset="50%" stop-color="#c4dcff"/>
      <stop offset="100%" stop-color="#8ab8ff"/>
    </linearGradient>

    <!-- Divider gradient -->
    <linearGradient id="divider-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
      <stop offset="55%" stop-color="#7c3aed" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </linearGradient>

    <!-- Left accent bar gradient -->
    <linearGradient id="bar-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0"/>
      <stop offset="25%" stop-color="#38bdf8" stop-opacity="1"/>
      <stop offset="75%" stop-color="#7c3aed" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </linearGradient>

    <!-- Vignette -->
    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.65"/>
    </radialGradient>

    <!-- Edge fades -->
    <linearGradient id="top-fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0.5"/>
      <stop offset="12%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bottom-fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="85%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
    </linearGradient>

    <!-- Filters -->
    <filter id="dot-glow" x="-150%" y="-150%" width="400%" height="400%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="glow-soft" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="halo" x="-200%" y="-200%" width="500%" height="500%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>

    <!-- Globe clip -->
    <clipPath id="globe-clip">
      <circle cx="855" cy="305" r="196"/>
    </clipPath>
  </defs>

  <!-- ═══════════════════════════════════════ -->
  <!-- BACKGROUND                              -->
  <!-- ═══════════════════════════════════════ -->
  <rect width="1200" height="630" fill="#040d1a"/>
  <rect width="1200" height="630" fill="url(#bg-center)"/>
  <rect width="1200" height="630" fill="url(#bg-violet)"/>
  <rect width="1200" height="630" fill="url(#bg-cyan-bottom)"/>

  <!-- ═══════════════════════════════════════ -->
  <!-- CARTOGRAPHIC GRID TEXTURE              -->
  <!-- ═══════════════════════════════════════ -->
  <g opacity="0.045" stroke="#7ab4f8" stroke-width="0.5">
    <line x1="0" y1="30" x2="1200" y2="30"/>   <line x1="0" y1="60" x2="1200" y2="60"/>
    <line x1="0" y1="90" x2="1200" y2="90"/>   <line x1="0" y1="120" x2="1200" y2="120"/>
    <line x1="0" y1="150" x2="1200" y2="150"/>  <line x1="0" y1="180" x2="1200" y2="180"/>
    <line x1="0" y1="210" x2="1200" y2="210"/>  <line x1="0" y1="240" x2="1200" y2="240"/>
    <line x1="0" y1="270" x2="1200" y2="270"/>  <line x1="0" y1="300" x2="1200" y2="300"/>
    <line x1="0" y1="330" x2="1200" y2="330"/>  <line x1="0" y1="360" x2="1200" y2="360"/>
    <line x1="0" y1="390" x2="1200" y2="390"/>  <line x1="0" y1="420" x2="1200" y2="420"/>
    <line x1="0" y1="450" x2="1200" y2="450"/>  <line x1="0" y1="480" x2="1200" y2="480"/>
    <line x1="0" y1="510" x2="1200" y2="510"/>  <line x1="0" y1="540" x2="1200" y2="540"/>
    <line x1="0" y1="570" x2="1200" y2="570"/>  <line x1="0" y1="600" x2="1200" y2="600"/>
    <line x1="30"  y1="0" x2="30"  y2="630"/>  <line x1="60"  y1="0" x2="60"  y2="630"/>
    <line x1="90"  y1="0" x2="90"  y2="630"/>  <line x1="120" y1="0" x2="120" y2="630"/>
    <line x1="150" y1="0" x2="150" y2="630"/>  <line x1="180" y1="0" x2="180" y2="630"/>
    <line x1="210" y1="0" x2="210" y2="630"/>  <line x1="240" y1="0" x2="240" y2="630"/>
    <line x1="270" y1="0" x2="270" y2="630"/>  <line x1="300" y1="0" x2="300" y2="630"/>
    <line x1="330" y1="0" x2="330" y2="630"/>  <line x1="360" y1="0" x2="360" y2="630"/>
    <line x1="390" y1="0" x2="390" y2="630"/>  <line x1="420" y1="0" x2="420" y2="630"/>
    <line x1="450" y1="0" x2="450" y2="630"/>  <line x1="480" y1="0" x2="480" y2="630"/>
    <line x1="510" y1="0" x2="510" y2="630"/>  <line x1="540" y1="0" x2="540" y2="630"/>
    <line x1="570" y1="0" x2="570" y2="630"/>  <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="630" y1="0" x2="630" y2="630"/>  <line x1="660" y1="0" x2="660" y2="630"/>
    <line x1="690" y1="0" x2="690" y2="630"/>  <line x1="720" y1="0" x2="720" y2="630"/>
    <line x1="750" y1="0" x2="750" y2="630"/>  <line x1="780" y1="0" x2="780" y2="630"/>
    <line x1="810" y1="0" x2="810" y2="630"/>  <line x1="840" y1="0" x2="840" y2="630"/>
    <line x1="870" y1="0" x2="870" y2="630"/>  <line x1="900" y1="0" x2="900" y2="630"/>
    <line x1="930" y1="0" x2="930" y2="630"/>  <line x1="960" y1="0" x2="960" y2="630"/>
    <line x1="990" y1="0" x2="990" y2="630"/>  <line x1="1020" y1="0" x2="1020" y2="630"/>
    <line x1="1050" y1="0" x2="1050" y2="630"/> <line x1="1080" y1="0" x2="1080" y2="630"/>
    <line x1="1110" y1="0" x2="1110" y2="630"/> <line x1="1140" y1="0" x2="1140" y2="630"/>
    <line x1="1170" y1="0" x2="1170" y2="630"/>
  </g>

  <!-- ═══════════════════════════════════════ -->
  <!-- GLOBE                                   -->
  <!-- ═══════════════════════════════════════ -->

  <!-- Outer atmosphere halo (blurred ring) -->
  <circle cx="855" cy="305" r="220" fill="#1a6090" opacity="0.08" filter="url(#halo)"/>
  <circle cx="855" cy="305" r="210" fill="none" stroke="#38bdf8" stroke-width="0.8" opacity="0.12"/>
  <circle cx="855" cy="305" r="222" fill="none" stroke="#38bdf8" stroke-width="0.5" opacity="0.06"/>

  <!-- Globe sphere fill -->
  <circle cx="855" cy="305" r="196" fill="url(#globe-fill)"/>

  <!-- Globe lat/lon grid (clipped inside sphere) -->
  <g clip-path="url(#globe-clip)">
    <!-- Parallels: horizontal lines at lat ±60, ±30, 0 -->
    <!-- lat 60N: y = 305 - 196*sin60 = 305-170 = 135 -->
    <!-- lat 30N: y = 305 - 196*sin30 = 305-98  = 207 -->
    <!-- equator:  y = 305 -->
    <!-- lat 30S: y = 305 + 98  = 403 -->
    <!-- lat 60S: y = 305 + 170 = 475 -->
    <g stroke="#38bdf8" stroke-width="0.55" opacity="0.2">
      <line x1="659" y1="135" x2="1051" y2="135"/>
      <line x1="659" y1="207" x2="1051" y2="207"/>
      <line x1="659" y1="305" x2="1051" y2="305"/>
      <line x1="659" y1="403" x2="1051" y2="403"/>
      <line x1="659" y1="475" x2="1051" y2="475"/>
    </g>
    <!-- Equator accent (slightly brighter) -->
    <line x1="659" y1="305" x2="1051" y2="305" stroke="#38bdf8" stroke-width="0.9" opacity="0.3"/>

    <!-- Meridians: vertical ellipses centered at globe center -->
    <!-- lon ±30: rx = 196*sin30 = 98 -->
    <!-- lon ±60: rx = 196*sin60 = 170 -->
    <!-- central meridian: straight line -->
    <g stroke="#38bdf8" stroke-width="0.55" fill="none" opacity="0.2">
      <line x1="855" y1="109" x2="855" y2="501"/>
      <ellipse cx="855" cy="305" rx="98" ry="196"/>
      <ellipse cx="855" cy="305" rx="170" ry="196"/>
    </g>
  </g>

  <!-- Globe outline ring -->
  <circle cx="855" cy="305" r="196" fill="none" stroke="#2a5a9e" stroke-width="1.4" opacity="0.55"/>

  <!-- ═══════════════════════════════════════ -->
  <!-- NUCLEAR SITE DOTS                      -->
  <!-- ═══════════════════════════════════════ -->
  <g filter="url(#dot-glow)">
    <!-- === WESTERN EUROPE === -->
    <!-- France (many reactors) -->
    <circle cx="828" cy="184" r="3.8" fill="#38bdf8" opacity="0.92"/>
    <circle cx="836" cy="178" r="2.8" fill="#60d8ff" opacity="0.85"/>
    <circle cx="822" cy="190" r="2.2" fill="#38bdf8" opacity="0.78"/>
    <!-- UK -->
    <circle cx="820" cy="172" r="3.2" fill="#38bdf8" opacity="0.82"/>
    <!-- Germany/Belgium -->
    <circle cx="848" cy="176" r="2.8" fill="#38bdf8" opacity="0.80"/>
    <circle cx="854" cy="180" r="2.2" fill="#60d8ff" opacity="0.72"/>
    <!-- Spain -->
    <circle cx="814" cy="196" r="2.5" fill="#38bdf8" opacity="0.72"/>
    <!-- Sweden/Finland -->
    <circle cx="856" cy="158" r="2.5" fill="#38bdf8" opacity="0.78"/>
    <circle cx="866" cy="155" r="2.2" fill="#60d8ff" opacity="0.72"/>
    <!-- Switzerland/Czech -->
    <circle cx="849" cy="183" r="2" fill="#94e0ff" opacity="0.7"/>

    <!-- === EASTERN EUROPE / UKRAINE === -->
    <!-- Ukraine (Chernobyl accent) -->
    <circle cx="888" cy="170" r="5.0" fill="#f59e0b" opacity="0.95"/>
    <circle cx="888" cy="170" r="9" fill="#f59e0b" opacity="0.18"/>
    <circle cx="896" cy="175" r="2.8" fill="#fbbf24" opacity="0.75"/>
    <!-- Hungary/Slovakia -->
    <circle cx="866" cy="177" r="2" fill="#38bdf8" opacity="0.7"/>

    <!-- === RUSSIA === -->
    <circle cx="918" cy="160" r="2.8" fill="#38bdf8" opacity="0.68"/>
    <circle cx="942" cy="155" r="2.5" fill="#38bdf8" opacity="0.62"/>
    <circle cx="962" cy="152" r="2.2" fill="#38bdf8" opacity="0.58"/>

    <!-- === MIDDLE EAST === -->
    <!-- Iran/UAE -->
    <circle cx="940" cy="214" r="3.2" fill="#a78bfa" opacity="0.82"/>
    <circle cx="952" cy="218" r="2" fill="#a78bfa" opacity="0.65"/>

    <!-- === SOUTH ASIA === -->
    <!-- India -->
    <circle cx="970" cy="244" r="3.2" fill="#38bdf8" opacity="0.78"/>
    <circle cx="980" cy="252" r="2" fill="#60d8ff" opacity="0.65"/>

    <!-- === EAST ASIA === -->
    <!-- China -->
    <circle cx="998" cy="198" r="2.8" fill="#38bdf8" opacity="0.78"/>
    <circle cx="1006" cy="204" r="3.2" fill="#38bdf8" opacity="0.82"/>
    <circle cx="1000" cy="210" r="2" fill="#60d8ff" opacity="0.68"/>
    <!-- South Korea -->
    <circle cx="1018" cy="198" r="3.0" fill="#fbbf24" opacity="0.82"/>
    <!-- Japan (Fukushima accent) -->
    <circle cx="1034" cy="192" r="4.5" fill="#f59e0b" opacity="0.92"/>
    <circle cx="1034" cy="192" r="8" fill="#f59e0b" opacity="0.16"/>
    <circle cx="1026" cy="197" r="2.8" fill="#fbbf24" opacity="0.75"/>

    <!-- === NORTH AMERICA (left limb of globe) === -->
    <!-- USA east coast -->
    <circle cx="682" cy="172" r="3.2" fill="#38bdf8" opacity="0.75"/>
    <circle cx="674" cy="178" r="2.5" fill="#60d8ff" opacity="0.68"/>
    <!-- 3MI accent -->
    <circle cx="678" cy="174" r="3.8" fill="#f59e0b" opacity="0.72"/>
    <!-- USA midwest -->
    <circle cx="660" cy="170" r="2.5" fill="#38bdf8" opacity="0.68"/>
    <circle cx="666" cy="165" r="2.2" fill="#38bdf8" opacity="0.62"/>
    <!-- Canada -->
    <circle cx="668" cy="152" r="2.2" fill="#38bdf8" opacity="0.62"/>

    <!-- === SOUTHERN HEMISPHERE === -->
    <!-- South America -->
    <circle cx="700" cy="298" r="2.5" fill="#34d399" opacity="0.62"/>
    <!-- South Africa -->
    <circle cx="890" cy="362" r="2.5" fill="#34d399" opacity="0.65"/>
    <!-- Australia (right limb) -->
    <circle cx="1040" cy="318" r="2.2" fill="#34d399" opacity="0.55"/>
  </g>

  <!-- ═══════════════════════════════════════ -->
  <!-- ATOM RINGS (overlaid on globe)         -->
  <!-- ═══════════════════════════════════════ -->
  <g fill="none" opacity="0.22">
    <ellipse cx="855" cy="305" rx="228" ry="68" stroke="#38bdf8" stroke-width="1.1" transform="rotate(-18 855 305)"/>
    <ellipse cx="855" cy="305" rx="228" ry="68" stroke="#a78bfa" stroke-width="1.0" transform="rotate(48 855 305)"/>
    <ellipse cx="855" cy="305" rx="228" ry="68" stroke="#67e8f9" stroke-width="0.85" transform="rotate(118 855 305)"/>
  </g>
  <!-- Nucleus -->
  <circle cx="855" cy="305" r="6" fill="#38bdf8" opacity="0.75" filter="url(#glow-soft)"/>
  <circle cx="855" cy="305" r="3" fill="#e0f9ff"/>

  <!-- ═══════════════════════════════════════ -->
  <!-- COOLING TOWER SILHOUETTES              -->
  <!-- ═══════════════════════════════════════ -->
  <!-- Hyperbolic cooling tower profile: wider at base and top, narrow at waist -->
  <g opacity="0.13" fill="#6a9fd8">
    <!-- Tower A -->
    <path d="M 775 630 L 793 500 Q 800 492 807 500 L 825 630 Z"/>
    <ellipse cx="800" cy="500" rx="16" ry="4.5" fill="#6a9fd8"/>
    <!-- Tower B (center, tallest) -->
    <path d="M 814 630 L 835 485 Q 843 476 851 485 L 872 630 Z"/>
    <ellipse cx="843" cy="485" rx="19" ry="5.5" fill="#6a9fd8"/>
    <!-- Tower C -->
    <path d="M 858 630 L 876 495 Q 882 488 888 495 L 906 630 Z"/>
    <ellipse cx="882" cy="495" rx="15" ry="4" fill="#6a9fd8"/>
  </g>

  <!-- ═══════════════════════════════════════ -->
  <!-- LEFT PANEL — TYPOGRAPHY               -->
  <!-- ═══════════════════════════════════════ -->

  <!-- Accent bar -->
  <rect x="74" y="102" width="3" height="376" fill="url(#bar-grad)" rx="1.5"/>

  <!-- Label chip -->
  <text
    x="96" y="132"
    font-family="ui-monospace, 'Courier New', monospace"
    font-size="11"
    letter-spacing="4"
    fill="#38bdf8"
    opacity="0.72">GLOBAL ATLAS  ·  OPEN DATA  ·  2025</text>

  <!-- Main title — 3 lines -->
  <text
    x="96" y="234"
    font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif"
    font-size="72"
    font-weight="700"
    letter-spacing="-2"
    fill="url(#title-grad)">Global Nuclear</text>

  <text
    x="96" y="320"
    font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif"
    font-size="72"
    font-weight="700"
    letter-spacing="-2"
    fill="url(#title-grad)">Infrastructure</text>

  <text
    x="96" y="406"
    font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif"
    font-size="72"
    font-weight="700"
    letter-spacing="-2"
    fill="url(#title-grad)">Atlas</text>

  <!-- Divider -->
  <rect x="96" y="424" width="520" height="1.5" fill="url(#divider-grad)" rx="1"/>

  <!-- Subtitle -->
  <text
    x="96" y="455"
    font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif"
    font-size="16.5"
    font-weight="300"
    letter-spacing="0.4"
    fill="#8ab8d8"
    opacity="0.88">Civilian Infrastructure · Accidents · Arsenals · Radiation Literacy</text>

  <!-- Bottom tag line -->
  <text
    x="96" y="534"
    font-family="ui-monospace, 'Courier New', monospace"
    font-size="10.5"
    letter-spacing="3"
    fill="#3a6a8e"
    opacity="0.75">INTERACTIVE · EDUCATIONAL · PUBLIC INTEREST</text>

  <!-- ═══════════════════════════════════════ -->
  <!-- DECORATIVE CORNER DOTS                 -->
  <!-- ═══════════════════════════════════════ -->
  <!-- Top-right 3x3 dot grid -->
  <g opacity="0.18" fill="#38bdf8">
    <circle cx="1120" cy="52" r="1.8"/> <circle cx="1138" cy="52" r="1.8"/> <circle cx="1156" cy="52" r="1.8"/>
    <circle cx="1120" cy="68" r="1.8"/> <circle cx="1138" cy="68" r="1.8"/> <circle cx="1156" cy="68" r="1.8"/>
    <circle cx="1120" cy="84" r="1.8"/> <circle cx="1138" cy="84" r="1.8"/> <circle cx="1156" cy="84" r="1.8"/>
  </g>
  <!-- Bottom-left dot grid -->
  <g opacity="0.12" fill="#38bdf8">
    <circle cx="96"  cy="570" r="1.5"/> <circle cx="112" cy="570" r="1.5"/> <circle cx="128" cy="570" r="1.5"/>
    <circle cx="144" cy="570" r="1.5"/> <circle cx="160" cy="570" r="1.5"/>
    <circle cx="96"  cy="586" r="1.5"/> <circle cx="112" cy="586" r="1.5"/> <circle cx="128" cy="586" r="1.5"/>
    <circle cx="144" cy="586" r="1.5"/> <circle cx="160" cy="586" r="1.5"/>
  </g>

  <!-- ═══════════════════════════════════════ -->
  <!-- FINISHING OVERLAYS                     -->
  <!-- ═══════════════════════════════════════ -->
  <!-- Vignette -->
  <rect width="1200" height="630" fill="url(#vignette)"/>
  <!-- Top/bottom edge fades -->
  <rect width="1200" height="630" fill="url(#top-fade)"/>
  <rect width="1200" height="630" fill="url(#bottom-fade)"/>
</svg>`;

sharp(Buffer.from(svgContent))
  .png({ compressionLevel: 9 })
  .toFile(require('path').join(__dirname, '..', 'public', 'og-image.png'))
  .then(info => console.log('OG image generated:', info.width, 'x', info.height))
  .catch(err => { console.error('Error:', err); process.exit(1); });
