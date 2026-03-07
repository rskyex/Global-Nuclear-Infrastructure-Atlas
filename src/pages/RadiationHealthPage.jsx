import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertCircle, ChevronDown, ChevronUp, ExternalLink, Info } from 'lucide-react';

const DOSE_UNITS = [
  {
    symbol: 'Sv', name: 'Sievert',
    color: '#3b82f6',
    def: 'The sievert (Sv) is the SI unit of equivalent dose and effective dose. It accounts for both the amount of energy deposited in tissue and the biological effectiveness of the type of radiation. Most radiation protection limits and health effects are expressed in millisieverts (mSv) or microsieverts (µSv).',
    use: 'Used to express: whole-body dose limits, annual background dose, dose from X-rays, radiation protection standards, accident dose assessments.',
    example: '1 mSv = 1/1000 Sv. Average global background radiation: ~2.4 mSv/year (UNSCEAR).',
  },
  {
    symbol: 'Gy', name: 'Gray',
    color: '#8b5cf6',
    def: 'The gray (Gy) is the SI unit of absorbed dose — the amount of radiation energy deposited per kilogram of matter (1 Gy = 1 joule per kilogram). It does not account for biological effectiveness. One gray of alpha radiation is more biologically damaging than one gray of X-rays.',
    use: 'Used to express: radiation therapy doses, acute radiation syndrome thresholds, physical dose without biological weighting.',
    example: 'Radiation therapy for cancer may deliver 50–70 Gy to a tumour over many fractions.',
  },
  {
    symbol: 'Bq', name: 'Becquerel',
    color: '#10b981',
    def: 'The becquerel (Bq) measures radioactivity — specifically the number of nuclear disintegrations (decays) per second. 1 Bq = 1 decay per second. Becquerels are used to describe the activity of a radioactive source or the concentration of radioactive material in food, water, or air.',
    use: 'Used to express: activity of radioactive material, food/water contamination levels, environmental monitoring readings.',
    example: 'Human body contains ~8,000 Bq from naturally occurring potassium-40. Regulatory limits for food (e.g. caesium-137 in Japan post-Fukushima: 100 Bq/kg).',
  },
];

const DOSE_COMPARISONS = [
  { dose: 0.001, unit: 'mSv', label: 'Chest X-ray', color: '#10b981', category: 'Medical' },
  { dose: 0.01, unit: 'mSv', label: 'Dental X-ray', color: '#10b981', category: 'Medical' },
  { dose: 0.04, unit: 'mSv', label: 'Transatlantic flight (one way)', color: '#3b82f6', category: 'Travel' },
  { dose: 0.1, unit: 'mSv', label: 'Mammogram', color: '#10b981', category: 'Medical' },
  { dose: 1, unit: 'mSv', label: 'Annual dose limit for public (nuclear ops)', color: '#f59e0b', category: 'Standard' },
  { dose: 2.4, unit: 'mSv', label: 'Average annual background radiation (global)', color: '#64748b', category: 'Background' },
  { dose: 7, unit: 'mSv', label: 'CT scan (abdomen)', color: '#10b981', category: 'Medical' },
  { dose: 20, unit: 'mSv', label: 'Annual limit for radiation workers', color: '#f59e0b', category: 'Occupational' },
  { dose: 50, unit: 'mSv', label: 'Short-term limit for emergency workers', color: '#ef4444', category: 'Emergency' },
  { dose: 100, unit: 'mSv', label: 'Lowest clearly linked to elevated cancer risk (epidemiology)', color: '#ef4444', category: 'Health threshold' },
  { dose: 1000, unit: 'mSv', label: 'Threshold for some acute radiation symptoms (1 Sv)', color: '#7c3aed', category: 'Acute' },
  { dose: 4000, unit: 'mSv', label: 'Lethal dose to ~50% without medical treatment (4 Sv)', color: '#7c3aed', category: 'Acute' },
];

const HEALTH_EFFECTS = [
  {
    range: 'Below 100 mSv',
    type: 'No clearly demonstrated health effect at population level',
    detail: 'Below about 100 mSv of acute whole-body dose, epidemiological studies have not demonstrated a clearly detectable increase in cancer rates in human populations. Some regulatory models (LNT) assume a linear dose-response with no threshold for conservatism in safety standards, but this is a regulatory assumption, not a confirmed biological fact at low doses.',
    color: '#10b981',
  },
  {
    range: '100–500 mSv (acute)',
    type: 'Elevated long-term cancer risk',
    detail: 'Above approximately 100 mSv in a short time, epidemiological evidence (including Hiroshima/Nagasaki survivor studies) shows a statistically detectable increase in lifetime cancer risk. The increase is modest compared to baseline cancer risk and depends on dose, dose rate, and the tissues exposed.',
    color: '#f59e0b',
  },
  {
    range: '500–1000 mSv (acute)',
    type: 'Possible early radiation symptoms',
    detail: 'Some individuals may experience early symptoms of acute radiation syndrome (ARS) at doses above ~500 mSv to the whole body — including nausea, fatigue, and reduced white blood cell count. These effects are dose-rate and exposure pattern dependent.',
    color: '#ea580c',
  },
  {
    range: '1–6 Sv (acute whole body)',
    type: 'Acute radiation syndrome (ARS)',
    detail: 'At these doses, acute radiation syndrome develops with haematopoietic (bone marrow) effects, gastrointestinal effects, and — at the higher end — neurovascular effects. Medical treatment can improve survival. Most Chernobyl emergency workers who died from ARS received doses in this range.',
    color: '#ef4444',
  },
  {
    range: 'Above 6 Sv (acute)',
    type: 'Lethal without intensive treatment',
    detail: 'At very high acute doses, damage to bone marrow, the gastrointestinal tract, and the central nervous system is severe and often fatal even with medical treatment. The LD50/60 (dose lethal to 50% within 60 days) without treatment is approximately 3–4 Sv; with treatment it is higher.',
    color: '#7c3aed',
  },
];

const EXPOSURE_PATHWAYS = [
  { icon: '☀️', label: 'External irradiation', desc: 'Radiation from a source outside the body (gamma rays, X-rays, neutrons). Can penetrate tissue from a distance. Main concern in proximity to a radioactive source or during high-altitude flight.' },
  { icon: '💨', label: 'Inhalation', desc: 'Breathing in radioactive particles or gases (e.g. radon gas, radioactive dust or smoke). Leads to internal exposure, often concentrated in lung tissue.' },
  { icon: '🥦', label: 'Ingestion', desc: 'Eating or drinking contaminated food or water. Contamination can concentrate in specific organs (e.g. iodine-131 in the thyroid; caesium-137 distributed in soft tissue). A key pathway in accident scenarios.' },
  { icon: '🖐️', label: 'Skin contamination', desc: 'Radioactive particles on the skin can cause localized skin injury (beta burns) and can be taken into the body via wounds. Less significant than internal pathways for whole-body dose.' },
];

const PROTECTIVE_ACTIONS = [
  { label: 'Stay indoors (sheltering)', icon: '🏠', desc: 'Sheltering inside a building (especially a brick or concrete structure) with windows and doors closed significantly reduces external gamma exposure and inhalation of radioactive particles from a passing cloud. Effective for the acute phase of an accident.' },
  { label: 'Evacuation', icon: '🚗', desc: 'Evacuation away from areas of significant contamination reduces long-term dose accumulation. Most effective when implemented early, before significant ground deposition. Carries its own risks if done hastily or in large numbers.' },
  { label: 'Stable iodine (potassium iodide)', icon: '💊', desc: 'Potassium iodide (KI) tablets, taken before or shortly after a release of radioactive iodine, can block the thyroid from absorbing radioactive iodine-131. Only effective for the thyroid; does not protect against other radionuclides. Issued by authorities when indicated.' },
  { label: 'Food and water controls', icon: '🥛', desc: 'Restricting consumption of locally produced food and water following an accident can significantly reduce ingestion dose, particularly from iodine-131 (short-lived) and caesium-137 (longer-lived). Milk is a particular concern due to rapid concentration of iodine-131.' },
  { label: 'Monitoring', icon: '📡', desc: 'Environmental monitoring networks measure ambient dose rates and sample air, water, and food. Authorities use monitoring data to define protective action zones and to lift or adjust restrictions as contamination decreases.' },
];

const FAQS = [
  {
    q: 'Is all radiation dangerous?',
    a: 'Ionizing radiation can damage DNA and living tissue, but the health effect depends critically on dose, dose rate, type of radiation, and which tissues are exposed. At the low doses most people encounter (background radiation, medical X-rays), no measurable health effect has been reliably demonstrated. Radiation becomes a significant health concern at higher doses — typically above about 100 mSv acute dose based on epidemiological evidence.',
  },
  {
    q: 'Is nuclear power plant background radiation dangerous to local residents?',
    a: 'Normally operating nuclear power plants add very little radiation to background levels for local residents — typically a fraction of a millisievert per year, well below natural background radiation and far below regulatory limits. Multiple large epidemiological studies have not found excess cancer in populations living near operating nuclear plants.',
  },
  {
    q: 'Does everyone living near Chernobyl or Fukushima get cancer?',
    a: 'No. While major accidents like Chernobyl significantly elevated thyroid cancer rates in children exposed to iodine-131 in the most heavily affected areas, the UNSCEAR and WHO findings do not support the idea of a widespread cancer epidemic across all affected populations. The Fukushima UNSCEAR 2021 report found no directly attributable radiation-caused cancer deaths expected among the general public. The health impacts of major nuclear accidents are serious and real — but they must be assessed on the basis of documented dosimetric and epidemiological evidence, not worst-case assumptions.',
  },
  {
    q: 'What is radon and should I be concerned?',
    a: 'Radon is a naturally occurring radioactive gas produced by the decay of uranium in soil and rock. It is the largest source of radiation exposure for most people — accounting for about half of average annual background dose. In well-ventilated homes it disperses harmlessly. In poorly ventilated homes (especially in high-radon geological areas), it can accumulate to levels that increase lung cancer risk. This is a public health concern independent of nuclear power.',
  },
  {
    q: 'Are food safety limits around nuclear accidents set conservatively?',
    a: 'Yes. Regulatory limits for radioactive contamination of food (e.g. Bq/kg limits for caesium-137) are set with large safety margins. A person eating food just at the regulatory limit every day would receive a small fraction of natural background dose. Limits are precautionary — intended to maintain public confidence and minimize long-term dose, not because food marginally above the limit poses an acute hazard.',
  },
];

function UnitCard({ unit }) {
  return (
    <div className="rounded-xl border p-5"
      style={{ background: 'rgba(10,20,40,0.7)', borderColor: unit.color + '30', borderTopWidth: 3, borderTopColor: unit.color }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
          style={{ background: unit.color + '15', color: unit.color, fontFamily: 'JetBrains Mono, monospace', border: `1px solid ${unit.color}25` }}>
          {unit.symbol}
        </div>
        <div>
          <div className="text-sm font-bold text-white">{unit.name}</div>
          <div className="text-xs text-slate-500">({unit.symbol})</div>
        </div>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-2">{unit.def}</p>
      <p className="text-xs text-slate-400 leading-relaxed mb-2"><strong className="text-slate-300">Used for:</strong> {unit.use}</p>
      <p className="text-xs italic text-slate-500 leading-relaxed">{unit.example}</p>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(30,50,80,0.6)' }}>
      <button onClick={() => setOpen(v => !v)}
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-200">{q}</span>
        {open ? <ChevronUp size={14} className="text-slate-500 flex-shrink-0" /> : <ChevronDown size={14} className="text-slate-500 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t" style={{ borderColor: 'rgba(30,50,80,0.5)' }}>
          <div className="pt-3">{a}</div>
        </div>
      )}
    </div>
  );
}

export default function RadiationHealthPage() {
  const maxDose = DOSE_COMPARISONS[DOSE_COMPARISONS.length - 1].dose;

  return (
    <div className="min-h-full overflow-y-auto px-6 py-8 max-w-5xl mx-auto"
      style={{ background: '#040d1a' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <Activity size={17} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Radiation & Human Health</h1>
        </div>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          An evidence-based educational overview of ionizing radiation, dose units, health effects,
          exposure pathways, and protective actions — based on WHO, UNSCEAR, and IAEA public guidance.
        </p>
        <div className="mt-4 flex items-start gap-3 px-4 py-3 rounded-xl border text-xs text-emerald-300"
          style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}>
          <Info size={14} className="flex-shrink-0 mt-0.5" />
          This page uses careful, evidence-based language. Health effects of radiation depend strongly
          on dose, dose rate, type, and pathways. Context and dose matter enormously. Sources: WHO, UNSCEAR,
          IAEA, ICRP, national health authorities.
        </div>
      </motion.div>

      {/* What is ionizing radiation */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">What is Ionizing Radiation?</h2>
        <div className="text-sm text-slate-300 leading-relaxed max-w-3xl space-y-3">
          <p>
            Ionizing radiation is radiation with enough energy to remove electrons from atoms — "ionizing" them.
            This can damage biological molecules, including DNA. Types of ionizing radiation include:
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { type: 'Alpha (α)', desc: 'Positively charged particles (helium nuclei). Stopped by paper or skin. Dangerous if inhaled or ingested — deposits all energy in a small volume of tissue.', color: '#f59e0b' },
              { type: 'Beta (β)', desc: 'Electrons or positrons. Stopped by a few mm of aluminium or plastic. Can cause skin burns if in contact. Dangerous internally.', color: '#3b82f6' },
              { type: 'Gamma (γ) / X-rays', desc: 'High-energy electromagnetic radiation. Penetrates the body. Shielding requires dense material (lead, thick concrete). Primary external radiation concern.', color: '#8b5cf6' },
              { type: 'Neutrons (n)', desc: 'Produced in fission reactions and some cosmic ray interactions. Highly penetrating; can activate other materials to become radioactive.', color: '#10b981' },
            ].map(r => (
              <div key={r.type} className="rounded-lg border p-3" style={{ background: 'rgba(10,20,40,0.7)', borderColor: r.color + '30', borderTopWidth: 2, borderTopColor: r.color }}>
                <div className="text-xs font-bold mb-1.5" style={{ color: r.color, fontFamily: 'JetBrains Mono, monospace' }}>{r.type}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Note: Non-ionizing radiation (visible light, radio waves, microwaves) does not have enough energy to ionize atoms and works by different mechanisms. This page covers ionizing radiation only.
          </p>
        </div>
      </section>

      {/* Dose units */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-4">Dose Units Explained</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {DOSE_UNITS.map(u => <UnitCard key={u.symbol} unit={u} />)}
        </div>
      </section>

      {/* Dose comparison */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-2">Dose in Context</h2>
        <p className="text-xs text-slate-500 mb-5">Bar lengths are scaled logarithmically to show the full range. Doses in millisieverts (mSv) unless noted.</p>
        <div className="rounded-xl border p-5 space-y-2" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(30,50,80,0.6)' }}>
          {DOSE_COMPARISONS.map((item, i) => {
            const pct = Math.log10(item.dose + 0.0001) / Math.log10(maxDose + 0.0001);
            const widthPct = Math.max(2, Math.min(100, pct * 100));
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="text-xs text-slate-400 w-48 flex-shrink-0 leading-tight">{item.label}</div>
                <div className="flex-1 h-5 rounded-sm bg-slate-900 overflow-hidden">
                  <div className="h-full rounded-sm transition-all"
                    style={{ width: `${widthPct}%`, background: item.color, opacity: 0.75 }} />
                </div>
                <div className="text-xs font-mono w-20 text-right flex-shrink-0" style={{ color: item.color }}>
                  {item.dose >= 1000 ? `${item.dose / 1000} Sv` : `${item.dose} mSv`}
                </div>
              </div>
            );
          })}
          <p className="text-xs text-slate-600 pt-2">Sources: UNSCEAR, IAEA, ICRP, WHO, NRC.</p>
        </div>
      </section>

      {/* Health effects */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-4">Health Effects by Dose Level</h2>
        <div className="space-y-3">
          {HEALTH_EFFECTS.map(e => (
            <div key={e.range} className="rounded-xl border p-4 flex gap-4"
              style={{ background: 'rgba(10,20,40,0.6)', borderColor: e.color + '25', borderLeftWidth: 3, borderLeftColor: e.color }}>
              <div className="flex-shrink-0">
                <div className="text-xs font-bold" style={{ color: e.color, fontFamily: 'JetBrains Mono, monospace' }}>{e.range}</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200 mb-1">{e.type}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{e.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Note: Health effects listed are for acute (short-duration) whole-body doses. Chronic low-dose exposures,
          partial-body exposures, and internal emitters are assessed differently. Source: UNSCEAR, ICRP, WHO.
        </p>
      </section>

      {/* Exposure pathways */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-4">How People Are Exposed</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {EXPOSURE_PATHWAYS.map(p => (
            <div key={p.label} className="rounded-xl border p-4 flex gap-3" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(30,50,80,0.6)' }}>
              <div className="text-2xl flex-shrink-0">{p.icon}</div>
              <div>
                <div className="text-sm font-semibold text-slate-200 mb-1.5">{p.label}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Protective actions */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-4">Protective Actions in a Nuclear Emergency</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROTECTIVE_ACTIONS.map(a => (
            <div key={a.label} className="rounded-xl border p-4" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(30,50,80,0.6)' }}>
              <div className="text-2xl mb-2">{a.icon}</div>
              <div className="text-sm font-semibold text-slate-200 mb-1.5">{a.label}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-3 px-4 py-3 rounded-lg border text-xs text-amber-300"
          style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.2)' }}>
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          In an actual nuclear or radiological emergency, always follow guidance from official national and
          local emergency authorities. Do not self-medicate with potassium iodide without official instruction.
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => <FaqItem key={i} {...faq} />)}
        </div>
      </section>

      {/* Sources */}
      <section>
        <div className="rounded-xl border p-5 text-xs text-slate-400"
          style={{ background: 'rgba(10,20,40,0.5)', borderColor: 'rgba(30,50,80,0.5)' }}>
          <div className="text-sm font-semibold text-slate-300 mb-3">Primary Sources</div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'WHO – Radiation and Health', url: 'https://www.who.int/health-topics/radiation-and-health' },
              { name: 'UNSCEAR – Sources and Effects', url: 'https://www.unscear.org/unscear/en/publications.html' },
              { name: 'IAEA – Radiation Protection', url: 'https://www.iaea.org/topics/radiation-protection' },
              { name: 'ICRP – Publications', url: 'https://www.icrp.org/' },
              { name: 'US NRC – Radiation Basics', url: 'https://www.nrc.gov/about-nrc/radiation/health-effects/rad-exposure-cancer.html' },
            ].map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 no-underline text-xs px-2 py-1 rounded text-blue-400 hover:text-blue-300"
                style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <ExternalLink size={10} />
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
