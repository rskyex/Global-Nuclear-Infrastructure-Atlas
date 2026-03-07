import { motion } from 'framer-motion';
import { ArrowRight, Info, Atom, Flame, Zap, Layers, RotateCcw, Archive } from 'lucide-react';

const STEPS = [
  {
    id: 'mining',
    icon: '⛏️',
    title: 'Mining & Milling',
    color: '#78716c',
    border: 'rgba(120,113,108,0.3)',
    bg: 'rgba(120,113,108,0.08)',
    description: `Uranium is mined from the earth as uranium ore, typically containing 0.1–0.5% uranium 
    by weight. Mining methods include open-pit, underground, and in-situ leach (ISL) techniques. 
    At a mill, crushed ore is chemically processed to extract uranium, producing "yellowcake" 
    (uranium oxide concentrate, U₃O₈). Yellowcake is the first marketable form of uranium.`,
    keyFacts: ['Uranium is a naturally occurring element', 'Major producing countries: Kazakhstan, Canada, Namibia, Australia', 'Yellowcake (U₃O₈) is the primary mill output', 'Strict radiation and environmental controls apply'],
  },
  {
    id: 'conversion',
    icon: '🧪',
    title: 'Conversion',
    color: '#0891b2',
    border: 'rgba(8,145,178,0.3)',
    bg: 'rgba(8,145,178,0.08)',
    description: `Yellowcake is chemically converted to uranium hexafluoride (UF₆), a gas at moderate 
    temperatures. This is necessary because the main enrichment technologies – gas centrifuge and 
    gaseous diffusion – require uranium in the form of UF₆. Conversion facilities are large industrial 
    chemical plants operating under IAEA safeguards.`,
    keyFacts: ['Converts U₃O₈ to UF₆ gas', 'Required for enrichment processes', 'Major conversion facilities in France (Orano), UK (Springfields), Canada, USA', 'Operates under IAEA safeguards'],
  },
  {
    id: 'enrichment',
    icon: '🌀',
    title: 'Enrichment',
    color: '#7c3aed',
    border: 'rgba(124,58,237,0.3)',
    bg: 'rgba(124,58,237,0.08)',
    description: `Natural uranium contains approximately 0.72% of the fissile isotope uranium-235 (U-235). 
    Most power reactor designs require uranium enriched to 3–5% U-235 (low-enriched uranium, LEU). 
    Gas centrifuge technology is the dominant commercial enrichment method: thousands of centrifuges 
    running at high speed separate the slightly heavier U-238 from the lighter U-235. 
    This is a highly regulated stage of the fuel cycle, subject to IAEA safeguards.`,
    keyFacts: ['Natural uranium: ~0.72% U-235', 'Typical reactor fuel: 3–5% U-235 (LEU)', 'Gas centrifuge is dominant commercial technology', 'IAEA safeguards apply; enrichment is strictly regulated', 'Major commercial enrichers: Urenco (EU/UK), Orano (France), Rosatom (Russia), Centrus (USA)'],
  },
  {
    id: 'fabrication',
    icon: '🔩',
    title: 'Fuel Fabrication',
    color: '#059669',
    border: 'rgba(5,150,105,0.3)',
    bg: 'rgba(5,150,105,0.08)',
    description: `Enriched UF₆ is converted to uranium dioxide (UO₂) powder, pressed into ceramic pellets, 
    and loaded into metal tubes (fuel rods) typically made of zirconium alloys (Zircaloy). 
    Multiple fuel rods are assembled into fuel assemblies – the modular units inserted into reactor cores. 
    Fuel fabrication is a precision manufacturing process with strict quality controls.`,
    keyFacts: ['UO₂ ceramic pellets (~1 cm diameter)', 'Fuel rods: ~4 m long, zirconium alloy cladding', 'Fuel assemblies are the unit loaded into reactors', 'Fabrication plants in many nuclear countries', 'MOX fuel (mixed oxide) blends uranium with recycled plutonium'],
  },
  {
    id: 'reactor',
    icon: '⚛️',
    title: 'Reactor & Electricity Generation',
    color: '#3b82f6',
    border: 'rgba(59,130,246,0.3)',
    bg: 'rgba(59,130,246,0.08)',
    description: `Nuclear fission is the process by which a heavy nucleus (U-235 or Pu-239) absorbs 
    a neutron and splits into smaller fragments, releasing energy and additional neutrons. 
    In a controlled chain reaction, these neutrons cause further fissions. 
    The heat produced boils water (directly in BWRs, or via a secondary loop in PWRs) to drive 
    steam turbines connected to electrical generators. A moderator (water, heavy water, or graphite) 
    slows neutrons to the speed needed for efficient fission. A coolant transfers heat away from the core.`,
    keyFacts: ['Nuclear fission: ~200 MeV per fission event', 'One uranium pellet ≈ energy of ~17,000 cubic feet of natural gas', 'Moderators: light water (most common), heavy water (CANDU), graphite (RBMK – now rare)', 'Coolants: light water, heavy water, CO₂, sodium (fast reactors)', 'Control rods (boron, hafnium) absorb neutrons to regulate power'],
  },
  {
    id: 'spent-fuel',
    icon: '🔋',
    title: 'Spent Fuel',
    color: '#f59e0b',
    border: 'rgba(245,158,11,0.3)',
    bg: 'rgba(245,158,11,0.08)',
    description: `After 3–5 years in a reactor core, fuel assemblies have become "spent" – the 
    fissile content is depleted and fission product buildup degrades performance. 
    Spent fuel is highly radioactive and thermally hot immediately after removal. 
    It is transferred to a spent fuel pool (SFP) on-site, where water provides both cooling and 
    radiation shielding. After several years in the pool, spent fuel can be moved to dry cask storage.`,
    keyFacts: ['Spent fuel is highly radioactive: requires shielded storage', 'Spent fuel pools: on-site water storage (typically 5–10+ years)', 'Dry cask storage: steel/concrete containers for longer-term interim storage', 'Contains useful remaining uranium and plutonium (basis for reprocessing)', 'Also contains fission products and transuranic elements (waste)'],
  },
  {
    id: 'waste',
    icon: '🗄️',
    title: 'Waste Management & Disposal',
    color: '#6b7280',
    border: 'rgba(107,114,128,0.3)',
    bg: 'rgba(107,114,128,0.08)',
    description: `Radioactive waste is classified by activity level (high, intermediate, low) and 
    managed accordingly. High-level waste (HLW) – either spent fuel directly or vitrified liquid 
    waste from reprocessing – requires deep geological disposal (DGD). Most countries pursue 
    direct disposal of spent fuel as HLW. The international scientific consensus supports deep 
    geological repositories as the long-term solution for HLW. Finland's Onkalo is the first 
    such facility under construction.`,
    keyFacts: ['HLW: small volume, extremely high radioactivity', 'ILW/LLW: larger volumes, managed at near-surface facilities', 'Direct disposal: spent fuel embedded in engineered barriers, placed in stable rock', 'Reprocessing: separates uranium/plutonium for re-use; produces vitrified HLW', 'Onkalo (Finland): world\'s first operational DGR under construction'],
  },
  {
    id: 'decommissioning',
    icon: '🏗️',
    title: 'Decommissioning',
    color: '#94a3b8',
    border: 'rgba(148,163,184,0.3)',
    bg: 'rgba(148,163,184,0.08)',
    description: `When a nuclear power plant or facility reaches the end of its licensed operational 
    life, it undergoes decommissioning – a regulated process of safely removing radioactive 
    contamination and dismantling the facility. Approaches include DECON (prompt dismantling), 
    SAFSTOR (safe storage for decades then dismantling), and ENTOMB (rarely used, encasing in concrete). 
    Decommissioning is a major multi-year or multi-decade undertaking, regulated by national 
    nuclear safety authorities.`,
    keyFacts: ['DECON: prompt dismantling within years of shutdown', 'SAFSTOR: allow radioactivity to decay, then dismantle (up to 60 years)', 'Generates large volumes of low/intermediate-level waste', 'Most materials from a decommissioned plant are not radioactive', 'Costs and timelines vary significantly by plant design and country'],
  },
];

const FISSION_BASICS = [
  {
    title: 'Nuclear Fission',
    icon: <Atom size={18} className="text-blue-400" />,
    text: `Nuclear fission occurs when a fissile nucleus (most commonly U-235 or Pu-239) 
    absorbs a neutron and becomes unstable, splitting into two smaller nuclei (fission fragments), 
    releasing 2–3 neutrons and approximately 200 MeV (million electron volts) of energy as heat. 
    This energy – binding energy difference – is the fundamental source of nuclear power.`,
  },
  {
    title: 'Chain Reaction',
    icon: <Zap size={18} className="text-yellow-400" />,
    text: `The neutrons released in each fission can cause further fissions, creating a self-sustaining 
    chain reaction. In a reactor, this chain reaction is carefully controlled to maintain a steady, 
    stable power output. Control rods (containing neutron-absorbing materials like boron) regulate 
    the reaction rate. A reactor in "controlled criticality" has exactly one effective neutron per 
    fission causing a new fission.`,
  },
  {
    title: 'Moderation',
    icon: <Layers size={18} className="text-cyan-400" />,
    text: `Fast neutrons released by fission must be slowed to "thermal" (low-energy) speeds to 
    efficiently cause further fissions in U-235. A moderator slows neutrons through collisions. 
    Light water (ordinary water, H₂O) is the most common moderator, used in PWRs and BWRs. 
    Heavy water (D₂O) moderates with less neutron absorption (CANDU reactors). 
    Graphite was historically used (Chernobyl's RBMK; UK Magnox reactors).`,
  },
  {
    title: 'Cooling',
    icon: <Flame size={18} className="text-orange-400" />,
    text: `The heat from fission is removed from the reactor core by a coolant. 
    In most power reactors, the coolant is pressurized water (PWR) or boiling water (BWR). 
    The heat is then used to generate steam, which drives turbines to produce electricity – 
    the same thermodynamic principle as a coal or gas power plant, but with nuclear heat instead 
    of combustion heat.`,
  },
];

const StepCard = ({ step, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="rounded-xl p-5"
    style={{ background: step.bg, border: `1px solid ${step.border}` }}>
    <div className="flex items-start gap-3 mb-3">
      <div className="text-2xl flex-shrink-0">{step.icon}</div>
      <div>
        <div className="text-xs font-mono text-slate-500 mb-0.5">Step {index + 1}</div>
        <h3 className="text-sm font-bold" style={{ color: step.color }}>{step.title}</h3>
      </div>
    </div>
    <p className="text-xs text-slate-300 leading-relaxed mb-3 whitespace-pre-line">{step.description.trim()}</p>
    <div className="space-y-1">
      {step.keyFacts.map((fact, i) => (
        <div key={i} className="flex items-start gap-2 text-xs">
          <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: step.color }} />
          <span className="text-slate-400">{fact}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function FuelCyclePage() {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#070d1a' }}>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-2">Educational Resource</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">Nuclear Fuel Cycle Basics</h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
            The nuclear fuel cycle encompasses all activities involved in producing electricity from 
            uranium – from mining through waste disposal. This educational overview presents the 
            fundamentals using publicly documented scientific and technical information at a general 
            conceptual level, suitable for policy analysis, journalism, and informed public understanding.
          </p>
          <div className="mt-3 flex items-start gap-2 px-3 py-2 rounded-lg text-xs text-slate-500"
            style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}>
            <Info size={12} className="flex-shrink-0 mt-0.5 text-blue-400" />
            This page presents publicly documented general principles only. It does not include 
            procedural, operational, or engineering-level detail beyond what is appropriate for 
            educational and public policy purposes.
          </div>
        </motion.div>

        {/* Process flow overview */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Process Flow</h2>
          <div className="flex flex-wrap gap-2 items-center">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: step.bg, border: `1px solid ${step.border}`, color: step.color }}>
                  <span>{step.icon}</span>
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
                {i < STEPS.length - 1 && <ArrowRight size={12} className="text-slate-700 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Fission basics */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Nuclear Physics Basics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FISSION_BASICS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl p-4"
                style={{ background: 'rgba(13,27,46,0.7)', border: '1px solid rgba(26,48,80,0.6)' }}>
                <div className="flex items-center gap-2 mb-3">
                  {item.icon}
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line">{item.text.trim()}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Step-by-step */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">The Fuel Cycle – Step by Step</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEPS.map((step, i) => (
              <StepCard key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Open vs closed cycle */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Open vs. Closed Fuel Cycle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Once-Through ("Open") Cycle',
                color: '#06b6d4',
                points: [
                  'Spent fuel is treated as waste and sent directly to deep geological disposal.',
                  'Simpler fuel cycle; no reprocessing facilities required.',
                  'Uranium resource utilization is lower.',
                  'Adopted by USA, Canada, Sweden, Finland, Germany (policy choice).',
                  'Onkalo in Finland is the world\'s first deep geological repository for this approach.',
                ],
              },
              {
                title: 'Closed (Reprocessing) Cycle',
                color: '#8b5cf6',
                points: [
                  'Spent fuel is chemically reprocessed to separate uranium and plutonium for re-use.',
                  'Plutonium is fabricated into MOX (mixed oxide) fuel.',
                  'Reduces volume of high-level waste; improves resource utilization.',
                  'Adopted by France, UK (historically), Japan, Russia.',
                  'Involves reprocessing facilities (La Hague, Sellafield historically).',
                  'Generates vitrified high-level waste that still requires geological disposal.',
                ],
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-xl p-4"
                style={{ background: 'rgba(13,27,46,0.7)', border: `1px solid ${item.color}25` }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: item.color }}>{item.title}</h3>
                <ul className="space-y-1.5">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                      <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: item.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sources note */}
        <div className="rounded-xl p-4 text-xs text-slate-500 leading-relaxed"
          style={{ background: 'rgba(13,27,46,0.5)', border: '1px solid rgba(26,48,80,0.5)' }}>
          <div className="font-semibold text-slate-400 mb-2">Sources & Further Reading</div>
          <p className="mb-2">This educational content is based on publicly available information from authoritative sources including:</p>
          <ul className="space-y-1 text-slate-600">
            <li>• IAEA Nuclear Energy Series publications (publicly available at iaea.org)</li>
            <li>• World Nuclear Association public educational materials (world-nuclear.org)</li>
            <li>• US NRC public educational resources (nrc.gov)</li>
            <li>• NEA/OECD public publications (oecd-nea.org)</li>
            <li>• National operator and regulatory public information</li>
          </ul>
          <p className="mt-2">
            This page is strictly educational and does not include operational, procedural, or 
            engineering detail beyond publicly appropriate levels for policy and general education purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
