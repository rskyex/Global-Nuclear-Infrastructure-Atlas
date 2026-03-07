import { motion } from 'framer-motion';
import { ArrowRight, Info, Atom, Flame, Zap, Layers, RotateCcw } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 'mining', num: '01',
    icon: '⛏️',
    title: 'Mining & Milling',
    color: '#a8956a',
    border: 'rgba(168,149,106,0.25)',
    bg: 'rgba(168,149,106,0.07)',
    svgBg: '#1a1208',
    description: `Uranium is mined from the earth — typically at concentrations of 0.1–0.5% uranium by weight — via open-pit, underground, or in-situ leach (ISL) techniques. At a mill, crushed ore is chemically processed to produce uranium oxide concentrate (U₃O₈), known as "yellowcake" — the first commercially traded form of uranium.`,
    keyFacts: [
      'Naturally occurring element, present in most rock formations',
      'Major producers: Kazakhstan, Canada, Namibia, Australia (OECD NEA data)',
      'Yellowcake (U₃O₈) is the primary mill output',
      'Radiation and environmental controls required under national regulations',
    ],
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="80" fill="#1a1208" rx="8"/>
        <ellipse cx="60" cy="60" rx="50" ry="18" fill="#2d1f0a" stroke="#a8956a" strokeWidth="0.5" opacity="0.6"/>
        <rect x="30" y="20" width="60" height="35" rx="4" fill="#3d2a0f" stroke="#a8956a" strokeWidth="0.5"/>
        <path d="M45 20 L45 55 M55 15 L55 55 M65 18 L65 55 M75 20 L75 55" stroke="#a8956a" strokeWidth="0.8" opacity="0.5"/>
        <rect x="40" y="38" width="40" height="14" rx="3" fill="#6b4f1e" opacity="0.8"/>
        <text x="60" y="48" textAnchor="middle" fill="#f0c060" fontSize="7" fontFamily="monospace">U₃O₈</text>
        <text x="60" y="14" textAnchor="middle" fill="#a8956a" fontSize="6" opacity="0.8">MINE</text>
      </svg>
    ),
  },
  {
    id: 'conversion', num: '02',
    icon: '🧪',
    title: 'Conversion',
    color: '#0891b2',
    border: 'rgba(8,145,178,0.25)',
    bg: 'rgba(8,145,178,0.07)',
    svgBg: '#071520',
    description: `Yellowcake is chemically converted to uranium hexafluoride (UF₆), which becomes a gas at moderate temperatures. UF₆ is the feedstock for enrichment processes. Conversion facilities are large, heavily regulated industrial chemical plants operating under IAEA safeguards.`,
    keyFacts: [
      'U₃O₈ → UF₆ (gas at ~56 °C) via fluorination',
      'Required for gas centrifuge and diffusion enrichment',
      'Major conversion plants: Orano (France), Springfields (UK), ConverDyn (USA), Comurhex',
      'All facilities operate under IAEA safeguards (NPT Additional Protocol)',
    ],
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="80" fill="#071520" rx="8"/>
        <rect x="20" y="25" width="22" height="35" rx="3" fill="#0c2d40" stroke="#0891b2" strokeWidth="0.8"/>
        <text x="31" y="46" textAnchor="middle" fill="#0891b2" fontSize="6" fontFamily="monospace">U₃O₈</text>
        <path d="M43 42 Q60 30 77 42" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
        <polygon points="75,38 81,42 75,46" fill="#06b6d4" opacity="0.8"/>
        <rect x="78" y="25" width="22" height="35" rx="3" fill="#0c2d40" stroke="#06b6d4" strokeWidth="0.8"/>
        <text x="89" y="44" textAnchor="middle" fill="#06b6d4" fontSize="6" fontFamily="monospace">UF₆</text>
        <text x="89" y="52" textAnchor="middle" fill="#0891b2" fontSize="5">gas</text>
        <circle cx="60" cy="20" r="8" fill="none" stroke="#0891b2" strokeWidth="0.5" opacity="0.4"/>
        <text x="60" y="23" textAnchor="middle" fill="#0891b2" fontSize="6">F</text>
      </svg>
    ),
  },
  {
    id: 'enrichment', num: '03',
    icon: '🌀',
    title: 'Enrichment',
    color: '#7c3aed',
    border: 'rgba(124,58,237,0.25)',
    bg: 'rgba(124,58,237,0.07)',
    svgBg: '#100820',
    description: `Natural uranium contains only ~0.72% fissile U-235. Most power reactor designs require 3–5% U-235 (low-enriched uranium, LEU). Gas centrifuge technology is dominant: thousands of high-speed centrifuges separate slightly heavier U-238 from lighter U-235 molecules in UF₆ gas. This is the most heavily safeguarded stage of the entire fuel cycle.`,
    keyFacts: [
      'Natural uranium: ~0.72% U-235; LEU fuel: 3–5% U-235',
      'Gas centrifuge is dominant commercial technology since ~1980s',
      'Major commercial enrichers: Urenco (UK/NL/DE), Orano (FR), Rosatom (RU), Centrus (US)',
      'IAEA safeguards and NPT Additional Protocol mandatory',
      'Depleted uranium (DU) is the byproduct; stored or used in limited applications',
    ],
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="80" fill="#100820" rx="8"/>
        {[0,1,2,3,4].map(i => (
          <g key={i} transform={`translate(${15 + i * 19}, 20)`}>
            <rect x="0" y="0" width="12" height="40" rx="4" fill="#1e0f3c" stroke="#7c3aed" strokeWidth="0.8" opacity="0.9"/>
            <ellipse cx="6" cy="20" rx="4" ry="16" fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.5"/>
            <ellipse cx="6" cy="20" rx="2" ry="12" fill="none" stroke="#7c3aed" strokeWidth="0.4" opacity="0.7"/>
          </g>
        ))}
        <text x="60" y="72" textAnchor="middle" fill="#7c3aed" fontSize="6" fontFamily="monospace">GAS CENTRIFUGES</text>
        <text x="14" y="14" fill="#a78bfa" fontSize="5">U-238</text>
        <text x="88" y="14" fill="#7c3aed" fontSize="5">U-235 ↑</text>
      </svg>
    ),
  },
  {
    id: 'fabrication', num: '04',
    icon: '🔩',
    title: 'Fuel Fabrication',
    color: '#059669',
    border: 'rgba(5,150,105,0.25)',
    bg: 'rgba(5,150,105,0.07)',
    svgBg: '#081510',
    description: `Enriched UF₆ is converted to uranium dioxide (UO₂) powder, pressed into small ceramic pellets, and loaded into metal tubes (fuel rods) of zirconium alloy (Zircaloy). Multiple rods form fuel assemblies — the modular units inserted into reactor cores. Fabrication requires precision manufacturing and strict quality control.`,
    keyFacts: [
      'UO₂ ceramic pellets: ~1 cm diameter, ~1 cm tall — high melting point (2865 °C)',
      'Fuel rods: ~4 m long, zirconium alloy (Zircaloy-4) cladding',
      'A typical PWR core holds ~200 fuel assemblies',
      'MOX fuel blends recycled plutonium with uranium as an alternative',
    ],
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="80" fill="#081510" rx="8"/>
        <g transform="translate(15,10)">
          {[0,1,2,3].map(col => [0,1,2,3,4,5].map(row => (
            <rect key={`${col}-${row}`} x={col * 10} y={row * 10} width="8" height="8" rx="2"
              fill="#1a3d28" stroke="#059669" strokeWidth="0.5" opacity="0.85"/>
          )))}
        </g>
        <text x="35" y="75" textAnchor="middle" fill="#059669" fontSize="5">ASSEMBLY</text>
        <path d="M70 15 L70 65" stroke="#059669" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <path d="M80 15 L80 65" stroke="#059669" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
        <path d="M90 15 L90 65" stroke="#059669" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
        <rect x="65" y="30" width="30" height="22" rx="2" fill="none" stroke="#34d399" strokeWidth="0.5" strokeDasharray="2 2"/>
        <text x="80" y="72" textAnchor="middle" fill="#059669" fontSize="5">FUEL RODS</text>
      </svg>
    ),
  },
  {
    id: 'reactor', num: '05',
    icon: '⚛️',
    title: 'Reactor Operation',
    color: '#3b82f6',
    border: 'rgba(59,130,246,0.25)',
    bg: 'rgba(59,130,246,0.07)',
    svgBg: '#070d1a',
    description: `Nuclear fission: a U-235 nucleus absorbs a neutron and splits, releasing ~200 MeV of energy and 2–3 further neutrons. In a controlled chain reaction, this produces sustained heat. A moderator (water, heavy water, graphite) slows neutrons. A coolant transfers heat to drive steam turbines. Control rods regulate the reaction rate.`,
    keyFacts: [
      'One uranium pellet ≈ energy equivalent of ~17,000 ft³ of natural gas',
      'PWR: two water loops — pressurised primary, steam secondary',
      'BWR: water boils directly in the reactor vessel',
      'CANDU: heavy water moderator — can refuel online with natural uranium',
      'Control rods (boron, hafnium) absorb neutrons to adjust power output',
    ],
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="80" fill="#070d1a" rx="8"/>
        <ellipse cx="42" cy="40" rx="24" ry="28" fill="#0d1b2e" stroke="#3b82f6" strokeWidth="0.8"/>
        <circle cx="42" cy="40" r="12" fill="#1a3050" stroke="#60a5fa" strokeWidth="1"/>
        <text x="42" y="44" textAnchor="middle" fill="#3b82f6" fontSize="8">⚛</text>
        <path d="M67 40 L82 28 L97 28" stroke="#06b6d4" strokeWidth="1.2" fill="none"/>
        <rect x="82" y="20" width="28" height="16" rx="3" fill="#0d2d3a" stroke="#06b6d4" strokeWidth="0.7"/>
        <text x="96" y="30" textAnchor="middle" fill="#06b6d4" fontSize="6">TURBINE</text>
        <path d="M97 44 L82 52 L82 36" stroke="#10b981" strokeWidth="0.8" fill="none" strokeDasharray="2 1"/>
        <rect x="82" y="44" width="28" height="16" rx="3" fill="#0d2d1a" stroke="#10b981" strokeWidth="0.7"/>
        <text x="96" y="54" textAnchor="middle" fill="#10b981" fontSize="6">GENERATOR</text>
        <text x="106" y="66" textAnchor="middle" fill="#f59e0b" fontSize="5">⚡ GRID</text>
      </svg>
    ),
  },
  {
    id: 'spent-fuel', num: '06',
    icon: '🔋',
    title: 'Spent Fuel',
    color: '#f59e0b',
    border: 'rgba(245,158,11,0.25)',
    bg: 'rgba(245,158,11,0.07)',
    svgBg: '#151005',
    description: `After 3–5 years in a reactor core, fuel assemblies are depleted and highly radioactive. They are transferred to a spent fuel pool (SFP) on-site, where water cools them and provides radiation shielding. After several years, spent fuel may be moved to dry cask storage — steel/concrete containers suitable for decades of interim storage.`,
    keyFacts: [
      'Spent fuel: still ~95% uranium, ~1% plutonium, ~4% fission products by mass',
      'Spent fuel pools: on-site water pools, typically 8–12 m deep',
      'Dry cask storage: certified for decades; passive air-cooling',
      'Contains both valuable materials (for reprocessing) and long-lived radioactive waste',
    ],
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="80" fill="#151005" rx="8"/>
        <rect x="15" y="20" width="40" height="45" rx="3" fill="#0a1520" stroke="#0891b2" strokeWidth="0.8"/>
        <rect x="17" y="22" width="36" height="41" rx="2" fill="#0d2d40" opacity="0.7"/>
        {[0,1,2].map(i => (
          <rect key={i} x={22 + i*10} y="28" width="7" height="30" rx="2" fill="#1a4060" stroke="#0891b2" strokeWidth="0.5" opacity="0.8"/>
        ))}
        <text x="35" y="72" textAnchor="middle" fill="#0891b2" fontSize="5">FUEL POOL</text>
        <rect x="68" y="15" width="40" height="50" rx="6" fill="#252010" stroke="#f59e0b" strokeWidth="1"/>
        <rect x="72" y="20" width="32" height="40" rx="4" fill="#1a1508" opacity="0.8"/>
        <text x="88" y="43" textAnchor="middle" fill="#f59e0b" fontSize="6">DRY</text>
        <text x="88" y="51" textAnchor="middle" fill="#f59e0b" fontSize="6">CASK</text>
        <text x="88" y="72" textAnchor="middle" fill="#f59e0b" fontSize="5">STORAGE</text>
        <path d="M56 42 L67 42" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 2"/>
        <polygon points="65,39 68,42 65,45" fill="#94a3b8" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: 'waste', num: '07',
    icon: '🗄️',
    title: 'Waste Management',
    color: '#6b7280',
    border: 'rgba(107,114,128,0.25)',
    bg: 'rgba(107,114,128,0.07)',
    svgBg: '#0f1014',
    description: `Radioactive waste is classified by activity level. High-level waste (HLW) — either spent fuel directly or vitrified reprocessing waste — requires deep geological disposal (DGD). International scientific consensus endorses DGD as the long-term solution. Finland's Onkalo is the world's first operational DGR under construction.`,
    keyFacts: [
      'HLW: small volume, very high radioactivity — requires DGR at 400–1000 m depth',
      'ILW/LLW: larger volumes, managed at near-surface facilities',
      'KBS-3 method: copper canisters + bentonite clay in stable granite (Finland, Sweden)',
      'Onkalo (Finland): world\'s first deep geological repository — construction licence granted 2021',
    ],
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="80" fill="#0f1014" rx="8"/>
        <rect x="10" y="5" width="100" height="30" rx="4" fill="#1a1c20" stroke="#6b7280" strokeWidth="0.5"/>
        <text x="60" y="14" textAnchor="middle" fill="#9ca3af" fontSize="6">SURFACE</text>
        <rect x="15" y="12" width="22" height="18" rx="2" fill="#252830" stroke="#6b7280" strokeWidth="0.5"/>
        <text x="26" y="23" textAnchor="middle" fill="#6b7280" fontSize="5">LLW/ILW</text>
        <path d="M30 35 L30 55 M50 35 L50 65 M70 35 L70 75" stroke="#374151" strokeWidth="0.5" strokeDasharray="2 2"/>
        <rect x="40" y="55" width="60" height="20" rx="4" fill="#1a1208" stroke="#a16207" strokeWidth="0.8"/>
        <text x="70" y="65" textAnchor="middle" fill="#a16207" fontSize="5">GEOLOGICAL</text>
        <text x="70" y="72" textAnchor="middle" fill="#a16207" fontSize="5">REPOSITORY (~400m)</text>
        <rect x="55" y="58" width="10" height="12" rx="2" fill="#7a4f0f" stroke="#f59e0b" strokeWidth="0.5"/>
        <text x="60" y="66" textAnchor="middle" fill="#f59e0b" fontSize="5">HLW</text>
      </svg>
    ),
  },
  {
    id: 'decommissioning', num: '08',
    icon: '🏗️',
    title: 'Decommissioning',
    color: '#94a3b8',
    border: 'rgba(148,163,184,0.25)',
    bg: 'rgba(148,163,184,0.07)',
    svgBg: '#101214',
    description: `At end of licensed operational life, a nuclear facility undergoes licensed decommissioning. Approaches include DECON (immediate dismantling) and SAFSTOR (safe storage for decades, then dismantling). Most materials from a decommissioned plant are not radioactive. Full decommissioning is a multi-decade undertaking under national regulatory oversight.`,
    keyFacts: [
      'DECON: prompt dismantling typically within ~10 years of shutdown',
      'SAFSTOR: radioactivity allowed to decay for up to 60 years (NRC), then dismantle',
      '~90–99% of a typical plant\'s materials are not radioactive by mass',
      'Estimated global decommissioning cost: hundreds of billions USD over coming decades',
    ],
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="80" fill="#101214" rx="8"/>
        <rect x="20" y="35" width="80" height="30" rx="3" fill="#1c1e22" stroke="#94a3b8" strokeWidth="0.5"/>
        <path d="M35 35 L35 12 M55 35 L55 8 M75 35 L75 12" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M25 35 L95 35" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3 2"/>
        <text x="60" y="52" textAnchor="middle" fill="#94a3b8" fontSize="7">DECOMMISSION</text>
        <text x="60" y="62" textAnchor="middle" fill="#64748b" fontSize="5">DECON / SAFSTOR</text>
        <path d="M50 22 L58 16 M60 22 L68 16 M70 22 L78 16" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
        <text x="60" y="12" textAnchor="middle" fill="#f59e0b" fontSize="6">🏗</text>
      </svg>
    ),
  },
];

const FISSION_BASICS = [
  {
    title: 'Nuclear Fission',
    icon: <Atom size={20} className="text-blue-400" />,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.07)',
    border: 'rgba(59,130,246,0.2)',
    text: `When a fissile nucleus (U-235 or Pu-239) absorbs a neutron it becomes unstable and splits into two smaller nuclei (fission fragments), releasing 2–3 neutrons and approximately 200 MeV of energy as heat. The energy comes from the difference in nuclear binding energy between the parent and product nuclei.`,
    formula: 'U-235 + n → Ba-144 + Kr-89 + 3n + ~200 MeV',
  },
  {
    title: 'Sustained Chain Reaction',
    icon: <Zap size={20} className="text-yellow-400" />,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.07)',
    border: 'rgba(245,158,11,0.2)',
    text: `The neutrons released can cause further fissions. A controlled chain reaction maintains exactly one effective neutron causing a new fission per generation (critical state). Control rods absorb surplus neutrons to regulate power output.`,
    formula: 'k_eff = 1 (controlled criticality)',
  },
  {
    title: 'Moderation',
    icon: <Layers size={20} className="text-cyan-400" />,
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.07)',
    border: 'rgba(6,182,212,0.2)',
    text: `Fast neutrons (~2 MeV) must be slowed to thermal speeds (~0.025 eV) for efficient U-235 fission. A moderator achieves this through elastic collisions. Light water (H₂O) is most common; heavy water (D₂O) has lower absorption and works with unenriched uranium (CANDU). Graphite was used in early designs (RBMK, Magnox).`,
    formula: 'PWR: H₂O · BWR: H₂O · CANDU: D₂O',
  },
  {
    title: 'Heat → Electricity',
    icon: <Flame size={20} className="text-orange-400" />,
    color: '#f97316',
    bg: 'rgba(249,115,22,0.07)',
    border: 'rgba(249,115,22,0.2)',
    text: `Fission heat is transferred by a coolant. In a PWR, pressurised water (primary loop) carries heat to a steam generator; steam in a secondary loop drives turbines. In a BWR, water boils directly in the core. The thermodynamic conversion efficiency is typically 30–36% — the same principle as fossil fuel plants, with nuclear heat replacing combustion.`,
    formula: 'Q_nuclear → steam turbine → generator → AC grid',
  },
];

// ─── Step Card ────────────────────────────────────────────────────────────────
const StepCard = ({ step, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ delay: index * 0.04, duration: 0.4 }}
    className="rounded-xl overflow-hidden flex flex-col"
    style={{ background: step.bg, border: `1px solid ${step.border}` }}>
    {/* Visual header */}
    <div className="h-28 w-full relative overflow-hidden" style={{ background: step.svgBg }}>
      {step.visual}
      <div className="absolute top-3 left-3 text-lg">{step.icon}</div>
      <div className="absolute top-3 right-3 text-xs font-bold opacity-30"
        style={{ color: step.color, fontFamily: 'JetBrains Mono, monospace', fontSize: 28 }}>
        {step.num}
      </div>
    </div>
    {/* Content */}
    <div className="p-4 flex-1 flex flex-col">
      <h3 className="text-sm font-bold mb-2" style={{ color: step.color }}>{step.title}</h3>
      <p className="text-xs text-slate-300 leading-relaxed mb-3 flex-1">{step.description}</p>
      <div className="space-y-1 pt-2 border-t" style={{ borderColor: step.color + '20' }}>
        {step.keyFacts.map((fact, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: step.color }} />
            <span className="text-slate-400">{fact}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// ─── Physics card ─────────────────────────────────────────────────────────────
const PhysicsCard = ({ item, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ delay: i * 0.08 }}
    className="rounded-xl overflow-hidden"
    style={{ border: `1px solid ${item.border}` }}>
    {/* Coloured top strip */}
    <div className="h-1" style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
    <div className="p-5" style={{ background: item.bg }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg" style={{ background: item.color + '15', border: `1px solid ${item.color}25` }}>
          {item.icon}
        </div>
        <h3 className="text-sm font-bold text-white">{item.title}</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.text}</p>
      <div className="rounded-lg px-3 py-2 text-xs font-mono"
        style={{ background: 'rgba(7,13,26,0.6)', color: item.color, border: `1px solid ${item.color}15` }}>
        {item.formula}
      </div>
    </div>
  </motion.div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FuelCyclePage() {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#070d1a' }}>
      {/* Hero banner */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.08) 50%, rgba(7,13,26,0) 100%)',
        borderBottom: '1px solid rgba(59,130,246,0.12)',
      }}>
        {/* Background atom grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div className="relative max-w-5xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase"
                style={{ letterSpacing: '0.2em' }}>Fusion · Educational Resource</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Nuclear Fuel Cycle
              <br />
              <span className="text-gradient-blue">From Mine to Repository</span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mb-6">
              The civilian nuclear fuel cycle spans mining, chemical conversion, enrichment,
              fuel fabrication, reactor operation, and long-term waste disposal. This educational
              overview presents each stage using publicly documented technical principles — suitable
              for policy analysis, journalism, and informed public understanding.
            </p>
            {/* Process flow pill strip */}
            <div className="flex flex-wrap gap-2 items-center">
              {STEPS.map((step, i) => (
                <div key={step.id} className="flex items-center gap-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: step.color + '15', border: `1px solid ${step.color}30`, color: step.color }}>
                    <span className="font-mono text-xs opacity-60">{step.num}</span>
                    <span className="hidden sm:inline">{step.title}</span>
                    <span className="sm:hidden">{step.icon}</span>
                  </div>
                  {i < STEPS.length - 1 && <ArrowRight size={10} className="text-slate-700 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-14">
        {/* Disclaimer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="flex items-start gap-3 rounded-xl p-4 text-xs"
          style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', color: '#94a3b8' }}>
          <Info size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-blue-300">Educational note:</strong> This page presents general principles from publicly available sources
            (IAEA, NRC, NEA/OECD, World Nuclear Association). It does not include operational procedures, engineering specifications,
            or any detail beyond what is appropriate for public policy education.
          </span>
        </motion.div>

        {/* ── Physics section ── */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-blue-900/60 to-transparent" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2">Physics Primer</span>
            <div className="h-px flex-1 bg-gradient-to-l from-blue-900/60 to-transparent" />
          </div>
          <h2 className="text-lg font-bold text-white mb-1 text-center">How Nuclear Reactors Generate Electricity</h2>
          <p className="text-xs text-slate-500 text-center mb-6 max-w-xl mx-auto">
            Four core concepts — fission, chain reaction, moderation, and heat conversion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FISSION_BASICS.map((item, i) => <PhysicsCard key={i} item={item} i={i} />)}
          </div>
        </section>

        {/* ── 8-step cycle ── */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-violet-900/60 to-transparent" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2">The Fuel Cycle</span>
            <div className="h-px flex-1 bg-gradient-to-l from-violet-900/60 to-transparent" />
          </div>
          <h2 className="text-lg font-bold text-white mb-1 text-center">Eight Stages — Mine to Repository</h2>
          <p className="text-xs text-slate-500 text-center mb-6 max-w-xl mx-auto">
            Each stage is explained with its key technical facts, regulatory context, and role in the overall cycle.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, i) => <StepCard key={step.id} step={step} index={i} />)}
          </div>
        </section>

        {/* ── Open vs Closed ── */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-900/60 to-transparent" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2">Policy Context</span>
            <div className="h-px flex-1 bg-gradient-to-l from-cyan-900/60 to-transparent" />
          </div>
          <h2 className="text-lg font-bold text-white mb-1 text-center">Open vs. Closed Fuel Cycle</h2>
          <p className="text-xs text-slate-500 text-center mb-6 max-w-xl mx-auto">
            Countries make different policy choices about how to handle spent fuel — both approaches are used by NPT states.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Once-Through ("Open") Cycle',
                color: '#06b6d4',
                border: 'rgba(6,182,212,0.2)',
                bg: 'rgba(6,182,212,0.06)',
                tag: 'Direct Disposal',
                icon: <RotateCcw size={16} className="text-cyan-400" />,
                points: [
                  'Spent fuel is treated as waste — sent directly to deep geological disposal.',
                  'Simpler fuel cycle infrastructure; no reprocessing facilities required.',
                  'Lower uranium resource utilisation (~1% of energy content used).',
                  'Adopted by USA, Canada, Sweden, Finland, Germany.',
                  'Onkalo (Finland) — world\'s first DGR — implements this approach.',
                ],
              },
              {
                title: 'Closed (Reprocessing) Cycle',
                color: '#8b5cf6',
                border: 'rgba(139,92,246,0.2)',
                bg: 'rgba(139,92,246,0.06)',
                tag: 'Material Recovery',
                icon: <Layers size={16} className="text-violet-400" />,
                points: [
                  'Spent fuel is chemically reprocessed to recover uranium and plutonium.',
                  'Recovered plutonium fabricated into MOX (mixed oxide) fuel.',
                  'Reduces HLW volume and improves resource utilisation.',
                  'Adopted by France, UK (historically), Japan, Russia.',
                  'Generates vitrified HLW requiring deep geological disposal regardless.',
                ],
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-xl overflow-hidden"
                style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg" style={{ background: item.color + '15' }}>{item.icon}</div>
                      <h3 className="text-sm font-bold" style={{ color: item.color }}>{item.title}</h3>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: item.color + '15', color: item.color, border: `1px solid ${item.color}25` }}>
                      {item.tag}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {item.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                        <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: item.color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sources footer */}
        <div className="rounded-xl p-5 text-xs space-y-2"
          style={{ background: 'rgba(13,27,46,0.5)', border: '1px solid rgba(26,48,80,0.5)' }}>
          <div className="font-semibold text-slate-400 mb-2">Official Public Sources Used</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {[
              ['IAEA Nuclear Energy Series', 'iaea.org'],
              ['OECD/NEA Publications', 'oecd-nea.org'],
              ['US NRC Educational Resources', 'nrc.gov'],
              ['World Nuclear Association', 'world-nuclear.org'],
              ['Posiva Oy (Onkalo)', 'posiva.fi'],
              ['Urenco Technical Literature', 'urenco.com'],
            ].map(([name, site], i) => (
              <div key={i} className="flex items-center gap-2 text-slate-500">
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <span>{name}</span>
                <span className="text-slate-700">·</span>
                <span className="text-slate-700 font-mono">{site}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Content is educational only. No operational, procedural, or engineering-level detail
            beyond appropriate public policy and general education levels is included.
          </p>
        </div>
      </div>
    </div>
  );
}
