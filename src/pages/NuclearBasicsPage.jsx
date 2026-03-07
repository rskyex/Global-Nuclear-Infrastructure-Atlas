import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Atom, Flame, Shield, RotateCcw, Sun, AlertTriangle, BookOpen } from 'lucide-react';

const TABS = [
  { id: 'fission', label: 'Nuclear Fission & Power Plants', icon: Zap },
  { id: 'fusion', label: 'Nuclear Fusion', icon: Sun },
];

// ── Fission content ──────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  { icon: '⚛️', label: 'Fuel', desc: 'Enriched uranium fuel pellets are loaded into fuel rods' },
  { icon: '💥', label: 'Fission', desc: 'Neutrons split uranium-235 nuclei, releasing energy and more neutrons' },
  { icon: '🌡️', label: 'Heat', desc: 'Fission energy heats water circulating around the reactor core' },
  { icon: '💨', label: 'Steam', desc: 'Hot water or steam is used to drive a turbine' },
  { icon: '⚙️', label: 'Turbine', desc: 'High-pressure steam spins the turbine blades at high speed' },
  { icon: '⚡', label: 'Generator', desc: 'The spinning turbine drives a generator producing electricity' },
  { icon: '🔌', label: 'Grid', desc: 'Electricity is fed into the transmission grid for homes and industry' },
];

const COMPONENTS = [
  { label: 'Fuel Rods', color: '#f59e0b', desc: 'Tubes of ceramic uranium oxide pellets. Most commercial reactors use low-enriched uranium (3–5% U-235). Fuel rods are bundled into fuel assemblies inside the reactor core.' },
  { label: 'Control Rods', color: '#ef4444', desc: 'Made from neutron-absorbing materials (boron, hafnium, cadmium). Inserting control rods absorbs neutrons and slows or stops the chain reaction. Withdrawing them allows the reaction to proceed.' },
  { label: 'Moderator', color: '#3b82f6', desc: 'Slows down ("moderates") fast neutrons so they can more efficiently cause fission. Most reactors use ordinary water (light water) as both moderator and coolant. CANDU reactors use heavy water.' },
  { label: 'Coolant', color: '#06b6d4', desc: 'Transfers heat from the reactor core to the steam generators or turbines. Usually water. In some designs, the coolant also serves as the moderator. Loss of coolant is a key accident scenario safety systems guard against.' },
  { label: 'Steam System', color: '#8b5cf6', desc: 'In PWRs, a primary coolant loop transfers heat to a secondary loop via steam generators. In BWRs, the coolant itself boils and the steam goes directly to the turbine.' },
  { label: 'Containment', color: '#10b981', desc: 'A thick reinforced concrete and steel structure enclosing the reactor vessel. Designed to prevent the release of radioactive material in the event of an accident. A key layer in "defense in depth".' },
];

const REACTOR_TYPES = [
  {
    type: 'PWR',
    full: 'Pressurized Water Reactor',
    color: '#3b82f6',
    share: '~70%',
    how: 'Water is kept under high pressure (155 bar) to prevent it from boiling in the primary loop. Heat is transferred to a secondary loop via steam generators. Steam in the secondary loop drives the turbine.',
    pros: ['Well-understood, decades of operational experience', 'Two-loop design keeps turbine isolated from reactor coolant', 'Widely deployed globally'],
    cons: ['Requires high-pressure vessel', 'Steam generators add complexity', 'Some designs require more enriched fuel'],
  },
  {
    type: 'BWR',
    full: 'Boiling Water Reactor',
    color: '#10b981',
    share: '~20%',
    how: 'Water boils directly in the reactor vessel and steam goes straight to the turbine. Simpler design — no separate steam generators — but the turbine is exposed to slightly radioactive steam.',
    pros: ['Simpler design — no separate steam generators', 'Lower operating pressure than PWR', 'Natural circulation versions exist'],
    cons: ['Turbine building has mild radioactive contamination', 'Control rods insert from below (gravity assist reduced)', 'Somewhat lower thermal efficiency'],
  },
];

const SAFETY_SYSTEMS = [
  { label: 'Automatic Shutdown (SCRAM)', icon: '🛑', desc: 'If sensors detect abnormal conditions (loss of cooling, power excursion), control rods are automatically inserted to rapidly shut down the fission reaction. This is the first and most important safety system.' },
  { label: 'Emergency Core Cooling (ECCS)', icon: '💧', desc: 'Systems that flood the reactor core with water in the event of a loss-of-coolant accident (LOCA). Prevents fuel melting. Both active (pumped) and passive (gravity-fed) versions exist in modern designs.' },
  { label: 'Defense in Depth', icon: '🛡️', desc: 'Multiple independent barriers and redundant systems. Radioactive material is contained by: fuel ceramic matrix → fuel cladding → reactor pressure vessel → containment building. Each barrier must fail independently.' },
  { label: 'Passive Safety (Gen III+)', icon: '⚗️', desc: 'Modern reactor designs (AP1000, ESBWR, EPR) incorporate passive safety features that use gravity, natural convection, and compressed gas rather than electric pumps. These work even without power or operator action.' },
];

const SPENT_FUEL = [
  { label: 'Spent Fuel Pool', icon: '🏊', desc: 'After removal from the reactor, spent fuel assemblies are stored underwater in on-site pools for typically 3–10 years. Water shields radiation and removes decay heat. Pools are a critical safety feature.' },
  { label: 'Dry Cask Storage', icon: '🗄️', desc: 'After adequate cooling in the pool, fuel can be moved to dry storage casks — sealed steel and concrete containers. Cooling relies on natural air convection. This is a proven interim storage method.' },
  { label: 'Long-Term Management', icon: '🏔️', desc: 'Most countries plan deep geological repositories (DGR) for permanent disposal. Finland\'s Onkalo facility is the world\'s first to be under construction. Other countries (Sweden, France, Canada) have advanced programs. No DGR is yet operational.' },
];

// ── Fusion content ────────────────────────────────────────────────────────────

const FUSION_FACTS = [
  { label: 'Fuel Source', value: 'Deuterium (from seawater) + Tritium (bred from lithium)', icon: '🌊' },
  { label: 'Reaction', value: 'D + T → He-4 + neutron + 17.6 MeV energy', icon: '💥' },
  { label: 'Temperature Required', value: '150 million °C — hotter than the Sun\'s core', icon: '🌡️' },
  { label: 'Confinement', value: 'Magnetic fields (tokamak/stellarator) or inertial confinement (laser)', icon: '🔮' },
];

const FUSION_PROJECTS = [
  {
    name: 'ITER', location: 'Cadarache, France', status: 'Under Construction',
    color: '#3b82f6',
    desc: 'The world\'s largest experimental fusion reactor. An international project (35 countries). ITER will demonstrate sustained fusion plasma at 500 MW for 400-second pulses — but is not a power plant. It will prove feasibility, not generate commercial electricity.',
    url: 'https://www.iter.org/',
  },
  {
    name: 'JET (Joint European Torus)', location: 'Culham, UK', status: 'Completed 2024',
    color: '#8b5cf6',
    desc: 'Set the world record for fusion energy in 2022 (59 megajoules in 5 seconds). JET operated for 40 years and was a crucial predecessor to ITER. Its final experiments produced the most energy ever from a fusion device.',
    url: 'https://www.euro-fusion.org/devices/jet/',
  },
  {
    name: 'W7-X (Wendelstein 7-X)', location: 'Greifswald, Germany', status: 'Operating (experiments)',
    color: '#10b981',
    desc: 'A stellarator (a different magnetic confinement geometry than tokamaks). Stellarators can sustain plasma continuously rather than in pulses. W7-X is demonstrating the feasibility of the stellarator approach at large scale.',
    url: 'https://www.ipp.mpg.de/w7x',
  },
  {
    name: 'NIF (National Ignition Facility)', location: 'Livermore, USA', status: 'Achieved ignition (2022)',
    color: '#f59e0b',
    desc: 'In December 2022, NIF achieved fusion ignition for the first time — producing more energy from fusion than the laser energy delivered to the target. This used inertial confinement fusion (ICF). A major scientific milestone, though far from a practical power plant.',
    url: 'https://lasers.llnl.gov/',
  },
];

const FISSION_VS_FUSION = [
  { aspect: 'Fuel', fission: 'Uranium / Plutonium (mined)', fusion: 'Deuterium (seawater) + Tritium (from lithium)' },
  { aspect: 'Fuel abundance', fission: 'Limited; must be mined and enriched', fusion: 'Virtually unlimited (deuterium from ocean)' },
  { aspect: 'Reaction principle', fission: 'Heavy nucleus splits into lighter fragments', fusion: 'Light nuclei merge to form heavier nucleus' },
  { aspect: 'Energy per reaction', fission: 'High (~200 MeV per U-235 fission)', fusion: 'High (~17.6 MeV, but higher per unit mass)' },
  { aspect: 'Radioactive waste', fission: 'Long-lived high-level waste (thousands of years)', fusion: 'Short-lived activation products (decades)' },
  { aspect: 'Runaway reaction risk', fission: 'Possible (but extremely engineered against)', fusion: 'Essentially impossible — plasma extinguishes itself' },
  { aspect: 'Commercial status', fission: 'Mature technology (440+ commercial reactors)', fusion: 'Pre-commercial — scientific feasibility proven' },
  { aspect: 'Main challenge', fission: 'Waste management; public acceptance', fusion: 'Sustained plasma confinement at scale; materials' },
];

// ── Components ────────────────────────────────────────────────────────────────

function InfoCard({ label, color, desc }) {
  return (
    <div className="rounded-xl border p-4" style={{ background: 'rgba(10,20,40,0.7)', borderColor: color + '30', borderTopWidth: 3, borderTopColor: color }}>
      <div className="text-sm font-semibold mb-2" style={{ color }}>{label}</div>
      <p className="text-xs text-slate-300 leading-relaxed">{desc}</p>
    </div>
  );
}

function ProcessStep({ icon, label, desc, index, total }) {
  return (
    <div className="flex flex-col items-center text-center relative">
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 flex-shrink-0"
        style={{ background: 'rgba(59,130,246,0.15)', border: '2px solid rgba(59,130,246,0.4)' }}>
        {icon}
      </div>
      <div className="text-xs font-semibold text-blue-300 mb-1">{label}</div>
      <div className="text-xs text-slate-400 leading-relaxed max-w-24">{desc}</div>
      {index < total - 1 && (
        <div className="absolute top-6 left-full w-4 h-0.5 -translate-x-2 hidden lg:block"
          style={{ background: 'rgba(59,130,246,0.4)' }} />
      )}
    </div>
  );
}

function FissionTab() {
  return (
    <div className="space-y-10">
      {/* What is fission */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3">What is Nuclear Fission?</h2>
        <div className="prose-reset text-sm text-slate-300 leading-relaxed max-w-3xl space-y-3">
          <p>
            Nuclear fission is the process by which a heavy atomic nucleus (such as uranium-235 or plutonium-239) absorbs a neutron and splits into two smaller nuclei, releasing a large amount of energy and two or three additional neutrons.
          </p>
          <p>
            Those neutrons can then cause more fissions — creating a <strong className="text-slate-100">chain reaction</strong>. In a nuclear reactor, this chain reaction is carefully controlled. The energy released by fission heats water, producing steam that spins a turbine to generate electricity.
          </p>
          <p>
            A single kilogram of uranium-235 undergoing complete fission releases the energy equivalent of roughly 2.7 million kilograms of coal — without carbon dioxide emissions during operation.
          </p>
        </div>
      </section>

      {/* How a plant works */}
      <section>
        <h2 className="text-lg font-bold text-white mb-5">How a Nuclear Power Plant Works</h2>
        <div className="relative">
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 lg:gap-4 relative">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStep key={i} {...step} index={i} total={PROCESS_STEPS.length} />
            ))}
          </div>
          <p className="mt-5 text-xs text-slate-500 max-w-2xl">
            The core principle is straightforward: nuclear fission generates heat, heat produces steam, steam drives a turbine, and the turbine drives a generator. Nuclear plants are essentially very sophisticated steam power plants.
          </p>
        </div>
      </section>

      {/* Key components */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Key Reactor Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPONENTS.map(c => <InfoCard key={c.label} {...c} />)}
        </div>
      </section>

      {/* Reactor types */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Major Commercial Reactor Types</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {REACTOR_TYPES.map(rt => (
            <div key={rt.type} className="rounded-xl border p-5" style={{ background: 'rgba(10,20,40,0.7)', borderColor: rt.color + '30' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ background: rt.color + '15', color: rt.color, border: `1px solid ${rt.color}30` }}>
                  {rt.type}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{rt.full}</div>
                  <div className="text-xs text-slate-400">~{rt.share} of global capacity</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{rt.how}</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-emerald-400 font-semibold mb-1">Advantages</div>
                  <ul className="space-y-1">{rt.pros.map((p, i) => <li key={i} className="text-xs text-slate-400 leading-tight">· {p}</li>)}</ul>
                </div>
                <div>
                  <div className="text-xs text-amber-400 font-semibold mb-1">Considerations</div>
                  <ul className="space-y-1">{rt.cons.map((c, i) => <li key={i} className="text-xs text-slate-400 leading-tight">· {c}</li>)}</ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">Note: CANDU (heavy water, natural uranium), RBMK (graphite-moderated, Soviet-era), and advanced Gen III+ designs (AP1000, EPR) also exist. Over 90% of commercial reactors are light-water designs (PWR or BWR).</p>
      </section>

      {/* Safety systems */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Safety Systems</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {SAFETY_SYSTEMS.map(s => (
            <div key={s.label} className="rounded-xl border p-4 flex gap-3" style={{ background: 'rgba(10,20,40,0.7)', borderColor: 'rgba(30,50,80,0.6)' }}>
              <div className="text-xl flex-shrink-0">{s.icon}</div>
              <div>
                <div className="text-sm font-semibold text-slate-200 mb-1.5">{s.label}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spent fuel */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Spent Fuel & Waste Management</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {SPENT_FUEL.map(s => (
            <div key={s.label} className="rounded-xl border p-4" style={{ background: 'rgba(10,20,40,0.7)', borderColor: 'rgba(30,50,80,0.6)' }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-sm font-semibold text-slate-200 mb-1.5">{s.label}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FusionTab() {
  return (
    <div className="space-y-10">
      {/* What is fusion */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3">What is Nuclear Fusion?</h2>
        <div className="text-sm text-slate-300 leading-relaxed max-w-3xl space-y-3">
          <p>
            Nuclear fusion is the opposite of fission: instead of splitting a heavy nucleus, fusion <strong className="text-slate-100">merges two light nuclei</strong> into a heavier one. This reaction releases enormous energy — it is the process that powers the Sun.
          </p>
          <p>
            The most viable fusion reaction for power generation combines <strong className="text-slate-100">deuterium</strong> (a hydrogen isotope found in seawater) and <strong className="text-slate-100">tritium</strong> (bred from lithium). This produces helium and a high-energy neutron.
          </p>
          <p>
            The challenge: to fuse nuclei, they must be brought close enough for the strong nuclear force to overcome their mutual electrostatic repulsion. This requires extraordinarily high temperatures — over 150 million °C — far hotter than the core of the Sun. At these temperatures, matter becomes a plasma (ionised gas) that cannot touch any physical container. Researchers use powerful magnetic fields or lasers to confine it.
          </p>
        </div>
      </section>

      {/* Key facts */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Key Facts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FUSION_FACTS.map(f => (
            <div key={f.label} className="rounded-xl border p-4 text-center"
              style={{ background: 'rgba(10,20,40,0.7)', borderColor: 'rgba(139,92,246,0.3)' }}>
              <div className="text-3xl mb-2">{f.icon}</div>
              <div className="text-xs font-semibold text-violet-400 mb-1">{f.label}</div>
              <p className="text-xs text-slate-300 leading-tight">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Major projects */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Major Public Research Programs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {FUSION_PROJECTS.map(p => (
            <div key={p.name} className="rounded-xl border p-5"
              style={{ background: 'rgba(10,20,40,0.7)', borderColor: p.color + '30', borderTopWidth: 3, borderTopColor: p.color }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="text-sm font-bold text-white">{p.name}</div>
                  <div className="text-xs text-slate-400">{p.location}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full flex-shrink-0"
                  style={{ background: p.color + '15', color: p.color, border: `1px solid ${p.color}30` }}>
                  {p.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{p.desc}</p>
              <a href={p.url} target="_blank" rel="noopener noreferrer"
                className="text-xs no-underline flex items-center gap-1" style={{ color: p.color }}>
                Official site →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Why is fusion hard */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3">Why Is Fusion Difficult?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Temperature', icon: '🔥', desc: 'Achieving and sustaining 150 million °C plasma requires enormous energy input. Historically, plasma devices consumed more energy than the fusion reactions produced.' },
            { label: 'Confinement', icon: '🔮', desc: 'No material can contain plasma at fusion temperatures. Magnetic confinement (tokamaks, stellarators) or inertial confinement (laser compression) must substitute for physical walls.' },
            { label: 'Materials', icon: '🔩', desc: 'High-energy neutrons from fusion reactions gradually damage reactor materials. Developing materials that can withstand neutron bombardment for decades is a major engineering challenge.' },
            { label: 'Tritium supply', icon: '⚗️', desc: 'Tritium (a hydrogen isotope) is scarce. Reactors must breed their own tritium from lithium. Engineering the tritium breeding blanket at scale has never been demonstrated in a commercial context.' },
            { label: 'Net energy gain', icon: '⚡', desc: 'Until 2022 (NIF ignition), no fusion experiment had produced more energy than was delivered to the plasma. Scientific breakeven has now been crossed. Engineering breakeven — including all plant energy use — remains to be demonstrated.' },
            { label: 'Commercial path', icon: '🏭', desc: 'Even with scientific progress, building a commercially competitive fusion power plant requires solving materials, tritium, superconducting magnets, and remote maintenance at scale. Several private companies are pursuing this goal.' },
          ].map(c => (
            <div key={c.label} className="rounded-xl border p-4" style={{ background: 'rgba(10,20,40,0.7)', borderColor: 'rgba(30,50,80,0.6)' }}>
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="text-sm font-semibold text-slate-200 mb-1.5">{c.label}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fission vs fusion comparison */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Fission vs Fusion: A Comparison</h2>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(30,50,80,0.6)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(15,30,60,0.8)' }}>
                <th className="text-left px-4 py-2.5 text-slate-400 font-semibold w-36">Aspect</th>
                <th className="text-left px-4 py-2.5 text-blue-400 font-semibold">Fission</th>
                <th className="text-left px-4 py-2.5 text-violet-400 font-semibold">Fusion</th>
              </tr>
            </thead>
            <tbody>
              {FISSION_VS_FUSION.map((row, i) => (
                <tr key={row.aspect} style={{ background: i % 2 === 0 ? 'rgba(10,20,40,0.4)' : 'rgba(10,20,40,0.2)' }}>
                  <td className="px-4 py-2.5 text-slate-400 font-medium">{row.aspect}</td>
                  <td className="px-4 py-2.5 text-slate-300">{row.fission}</td>
                  <td className="px-4 py-2.5 text-slate-300">{row.fusion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Sources: World Nuclear Association, IAEA, ITER Organization, NIF/LLNL, Eurofusion.
        </p>
      </section>
    </div>
  );
}

export default function NuclearBasicsPage() {
  const [activeTab, setActiveTab] = useState('fission');

  return (
    <div className="min-h-full overflow-y-auto px-6 py-8 max-w-5xl mx-auto"
      style={{ background: '#040d1a' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
            <BookOpen size={17} className="text-violet-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Nuclear Basics</h1>
        </div>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          An educational introduction to nuclear fission power — how reactors work, key components, safety systems,
          and spent fuel management — alongside an explanation of nuclear fusion and the scientific frontier.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b" style={{ borderColor: 'rgba(30,50,80,0.6)' }}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px
                ${activeTab === tab.id
                  ? 'text-violet-400 border-violet-400'
                  : 'text-slate-400 border-transparent hover:text-slate-200'}`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'fission' ? <FissionTab /> : <FusionTab />}
      </motion.div>
    </div>
  );
}
