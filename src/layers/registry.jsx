/* eslint-disable react-refresh/only-export-components -- registry is a data/config module that intentionally exports layer descriptors (objects), not React components. */
import { CircleMarker, Polyline, Popup } from 'react-leaflet';
import { Shield, Scale, Sigma, Split, Workflow, Clock, Quote } from 'lucide-react';
import SourceBadge from '../components/SourceBadge';
import Provenance from '../components/Provenance';
import { getOversightData, SAFEGUARDS_RAMP, OVERSIGHT_LEGEND } from '../data/layers/oversight';
import {
  getLegalNormativeData, LEGAL_REGIMES, LEGAL_STATUS_COLOR,
  regimeBucket, nptLabel, ctbtLabel, tpnwLabel,
} from '../data/layers/legalNormative';
import { getArsenalEstimates, ESTIMATE_SOURCES } from '../data/layers/arsenalEstimates';
import { getContestationData } from '../data/layers/contestation';
import { getFuelCycle, FUEL_STAGES } from '../data/layers/fuelCycle';
import { getTemporalReactors, getTemporalAccidents, reactorStateAt } from '../data/layers/temporal';
import { getDiscourseData, FRAMING_TAGS } from '../data/layers/discourse';

/**
 * Layer registry for the Analysis Layers.
 *
 * Each entry is a composable, independently-toggleable overlay. The control
 * panel reads `label / category / description / info / legend`, and the map
 * calls `renderMap(ctx)` for every active layer in ascending `zOrder`.
 *
 * @typedef {Object} LayerRenderCtx
 * @property {Map<string,[number,number]>} centroids  country → [lat,lng]
 * @property {number} opacity                          0..1 for this layer
 * @property {number} year                             active year (temporal)
 * @property {boolean} timeActive                      whether the temporal layer is on
 * @property {(rec: any) => void} [onSelect]
 * @property {Object} settings                         layer-scoped UI settings
 *
 * @typedef {Object} AnalysisLayer
 * @property {string} id
 * @property {string} label
 * @property {string} category
 * @property {string} description
 * @property {string} info
 * @property {boolean} defaultOn
 * @property {number} zOrder
 * @property {{color:string,label:string}[]} legend
 * @property {Object} [defaultSettings]
 * @property {(props:{settings:Object,setSetting:(k:string,v:any)=>void})=>any} [Controls]
 * @property {(ctx: LayerRenderCtx) => any} renderMap
 */

const CATEGORIES = {
  authority: 'Interpretive & legal authority',
  uncertainty: 'Estimates, contestation & framing',
  structure: 'Structure & time',
};

// Helper: multi-select that defaults to "all selected" when unset.
const selected = (value, all) => (Array.isArray(value) ? value : all);
function toggleIn(list, item, all) {
  const cur = selected(list, all);
  return cur.includes(item) ? cur.filter((x) => x !== item) : [...cur, item];
}

// ─── Layer 5 — Legal-Normative Geography ──────────────────────────────────────
/** @type {AnalysisLayer} */
const legalNormativeLayer = {
  id: 'legal',
  label: 'Legal-normative geography',
  category: CATEGORIES.authority,
  icon: Scale,
  description: 'Country-level reach of the NPT, CTBT, TPNW, nuclear-weapon-free zones, and the Additional Protocol.',
  info: 'Overlays binding legal and normative commitments onto the physical map. Colour each state by adherence to the selected regime; the popup lists every regime so you can see where sensitive infrastructure sits beyond the reach of binding authority.',
  defaultOn: true,
  zOrder: 10,
  defaultSettings: { regime: 'npt' },
  legend: [
    { color: LEGAL_STATUS_COLOR.bound, label: 'Bound (ratified / in force)' },
    { color: LEGAL_STATUS_COLOR.partial, label: 'Partial (signed only)' },
    { color: LEGAL_STATUS_COLOR.unbound, label: 'Not bound' },
    { color: LEGAL_STATUS_COLOR.none, label: 'Not applicable' },
  ],
  Controls: function LegalControls({ settings, setSetting }) {
    const regime = settings.regime || 'npt';
    return (
      <div className="flex flex-wrap gap-1 mt-1.5">
        {LEGAL_REGIMES.map((r) => (
          <button
            key={r.key}
            onClick={() => setSetting('regime', r.key)}
            className="px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors"
            style={{
              background: regime === r.key ? 'rgba(59,130,246,0.18)' : 'rgba(30,50,80,0.4)',
              border: `1px solid ${regime === r.key ? 'rgba(59,130,246,0.5)' : 'rgba(30,50,80,0.6)'}`,
              color: regime === r.key ? '#93c5fd' : '#94a3b8',
            }}
            title={`Colour states by ${r.label} adherence`}
          >
            {r.label}
          </button>
        ))}
      </div>
    );
  },
  renderMap: ({ centroids, opacity, onSelect, settings }) => {
    const regime = settings?.regime || 'npt';
    return getLegalNormativeData().map((rec) => {
      const c = centroids.get(rec.country);
      if (!c) return null;
      const color = LEGAL_STATUS_COLOR[regimeBucket(rec, regime)];
      return (
        <CircleMarker
          key={`legal-${rec.stateId}`}
          center={c}
          radius={9}
          pathOptions={{ color, fillColor: color, fillOpacity: 0.45 * opacity, opacity, weight: 2 }}
          eventHandlers={{ click: () => onSelect?.({ kind: 'legal', rec }) }}
        >
          <Popup maxWidth={300} className="atlas-popup"><LegalPopup rec={rec} regime={regime} /></Popup>
        </CircleMarker>
      );
    });
  },
};

function LegalPopup({ rec, regime }) {
  const rows = [
    ['npt', 'NPT', nptLabel(rec.npt)],
    ['ctbt', 'CTBT', ctbtLabel(rec.ctbt)],
    ['tpnw', 'TPNW', tpnwLabel(rec.tpnw)],
    ['nwfz', 'NWFZ', rec.nwfz || 'None'],
    ['additionalProtocol', 'Additional Protocol', rec.additionalProtocol ? 'In force' : 'Not in force'],
  ];
  return (
    <div className="space-y-2 text-xs" style={{ minWidth: 220 }}>
      <div className="flex items-center gap-1.5 font-bold text-slate-100"><span>{rec.flag}</span>{rec.country}</div>
      <div className="space-y-1">
        {rows.map(([key, k, v]) => (
          <div key={k} className="flex items-center justify-between gap-3" style={{ fontWeight: key === regime ? 600 : 400 }}>
            <span className="text-slate-500">{k}</span>
            <span className="text-slate-200">{v}</span>
          </div>
        ))}
      </div>
      {rec.note && <div className="text-[11px] text-amber-300/90 italic">{rec.note}</div>}
      <Provenance provenance={rec.provenance} provisional={rec.provisional} />
    </div>
  );
}

// ─── Layer 1 — Oversight Gradient (safeguards) ────────────────────────────────
/** @type {AnalysisLayer} */
const oversightLayer = {
  id: 'oversight',
  label: 'Oversight gradient',
  category: CATEGORIES.authority,
  icon: Shield,
  description: 'Facilities coloured by the type of IAEA safeguards authority that reaches them.',
  info: 'Shows the uneven topology of inspection and verification authority. The ramp runs from comprehensive safeguards (all declared material verifiable) down to no agreement in force. Click a facility for what its status does — and does not — let inspectors see. Composes with the temporal layer (build-out by year).',
  defaultOn: false,
  zOrder: 20,
  legend: OVERSIGHT_LEGEND,
  renderMap: ({ opacity, onSelect, timeActive, year }) => {
    return getOversightData().map((rec) => {
      if (timeActive && rec.firstPower && rec.firstPower > year) return null;
      const ramp = SAFEGUARDS_RAMP[rec.safeguardsStatus];
      return (
        <CircleMarker
          key={`oversight-${rec.facilityId}`}
          center={[rec.lat, rec.lng]}
          radius={5}
          pathOptions={{
            color: ramp.color, fillColor: ramp.color,
            fillOpacity: 0.85 * opacity, opacity,
            weight: rec.additionalProtocol ? 2 : 0.5,
          }}
          eventHandlers={{ click: () => onSelect?.({ kind: 'oversight', rec }) }}
        >
          <Popup maxWidth={300} className="atlas-popup"><OversightPopup rec={rec} /></Popup>
        </CircleMarker>
      );
    });
  },
};

function OversightPopup({ rec }) {
  const ramp = SAFEGUARDS_RAMP[rec.safeguardsStatus];
  return (
    <div className="space-y-2 text-xs" style={{ minWidth: 230 }}>
      <div className="font-bold text-slate-100">{rec.name}</div>
      <div className="text-slate-500">{rec.country}</div>
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: ramp.color }} />
        <span className="text-slate-200 font-medium">{ramp.label}</span>
      </div>
      <div className="rounded p-1.5" style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)' }}>
        <div className="text-[10px] uppercase tracking-wider text-emerald-400/80 mb-0.5">Permits</div>
        <div className="text-slate-300 leading-snug">{ramp.permits}</div>
      </div>
      <div className="rounded p-1.5" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.16)' }}>
        <div className="text-[10px] uppercase tracking-wider text-red-400/80 mb-0.5">Does not cover</div>
        <div className="text-slate-300 leading-snug">{ramp.excludes}</div>
      </div>
      <div className="text-[11px] text-slate-400">Additional Protocol: {rec.additionalProtocol ? 'in force (thicker outline)' : 'not in force'}</div>
      <Provenance provenance={rec.provenance} provisional={rec.provisional} />
    </div>
  );
}

// ─── Layer 3 — Estimate Range & Provenance (arsenals) ─────────────────────────
const ARSENAL_COLOR = '#f97316';
/** @type {AnalysisLayer} */
const arsenalLayer = {
  id: 'arsenals',
  label: 'Arsenal estimate ranges',
  category: CATEGORIES.uncertainty,
  icon: Sigma,
  description: 'Warhead totals as min–max bands across sources (SIPRI, FAS, IISS) — never a single point figure.',
  info: 'Replaces point estimates with ranges plus sources. Marker size reflects the mid-range; the popup shows the spread across sources. Figures are contested estimates, not official declarations.',
  defaultOn: false,
  zOrder: 30,
  defaultSettings: { sources: null },
  legend: [{ color: ARSENAL_COLOR, label: 'Warhead estimate (size ≈ mid-range)' }],
  Controls: function ArsenalControls({ settings, setSetting }) {
    const allIds = ESTIMATE_SOURCES.map((s) => s.id);
    const sel = selected(settings.sources, allIds);
    return (
      <div className="flex flex-col gap-1 mt-1.5">
        {ESTIMATE_SOURCES.map((s) => (
          <label key={s.id} className="flex items-center gap-1.5 text-[10px] text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={sel.includes(s.id)}
              onChange={() => setSetting('sources', toggleIn(settings.sources, s.id, allIds))}
              className="accent-orange-500"
            />
            {s.label}
          </label>
        ))}
      </div>
    );
  },
  renderMap: ({ opacity, onSelect, settings }) => {
    const allIds = ESTIMATE_SOURCES.map((s) => s.id);
    const sel = selected(settings?.sources, allIds);
    return getArsenalEstimates().map((rec) => {
      const ests = rec.estimates.filter((e) => sel.includes(e.sourceId));
      if (ests.length === 0) return null;
      const low = Math.min(...ests.map((e) => e.low));
      const high = Math.max(...ests.map((e) => e.high));
      const mid = (low + high) / 2;
      const radius = Math.max(5, Math.min(22, Math.sqrt(mid) / 3.5));
      return (
        <CircleMarker
          key={`arsenal-${rec.stateId}`}
          center={[rec.lat, rec.lng]}
          radius={radius}
          pathOptions={{ color: ARSENAL_COLOR, fillColor: ARSENAL_COLOR, fillOpacity: 0.3 * opacity, opacity, weight: 1.5 }}
          eventHandlers={{ click: () => onSelect?.({ kind: 'arsenals', rec }) }}
        >
          <Popup maxWidth={300} className="atlas-popup"><ArsenalPopup rec={rec} ests={ests} low={low} high={high} /></Popup>
        </CircleMarker>
      );
    });
  },
};

function ArsenalPopup({ rec, ests, low, high }) {
  const span = Math.max(1, high - low);
  return (
    <div className="space-y-2 text-xs" style={{ minWidth: 240 }}>
      <div className="flex items-center gap-1.5 font-bold text-slate-100"><span>{rec.flag}</span>{rec.country}</div>
      <div className="text-slate-300">
        Estimated total warheads: <span className="font-bold text-orange-300">{low === high ? low : `${low}–${high}`}</span>
      </div>
      {/* Min–max band with per-source ticks */}
      <div className="relative h-6 rounded" style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)' }}>
        {ests.map((e, i) => {
          const l = ((e.low - low) / span) * 100;
          const w = ((e.high - e.low) / span) * 100;
          return (
            <div key={i} className="absolute top-1 h-4 rounded-sm" title={`${e.source}: ${e.low}–${e.high}`}
              style={{ left: `${l}%`, width: `${Math.max(2, w)}%`, background: 'rgba(249,115,22,0.55)', borderLeft: '2px solid #f97316' }} />
          );
        })}
      </div>
      <div className="space-y-1">
        {ests.map((e, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <SourceBadge source={e} />
            <span className="text-slate-300 font-mono text-[11px]">{e.low === e.high ? e.low : `${e.low}–${e.high}`}</span>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-amber-300/80 italic">Figures are contested estimates, not official declarations.</div>
      <Provenance provisional={rec.provisional} label="Estimate basis" />
    </div>
  );
}

// ─── Layer 2 — Categorical Contestation (dual-use) ────────────────────────────
const CONTEST_COLOR = '#eab308';
/** @type {AnalysisLayer} */
const contestationLayer = {
  id: 'contestation',
  label: 'Categorical contestation',
  category: CATEGORIES.uncertainty,
  icon: Split,
  description: 'Facilities classified differently by different authorities (self-declared vs externally assessed).',
  info: 'Surfaces facilities whose classification is contested — typically a self-declared peaceful/research character versus an externally assessed potential military relevance. Dashed outline = contested. Click for a side-by-side of the competing claims and who asserts each.',
  defaultOn: false,
  zOrder: 40,
  legend: [{ color: CONTEST_COLOR, label: 'Contested classification (dashed outline)' }],
  renderMap: ({ opacity, onSelect }) => {
    return getContestationData().map((rec) => (
      <CircleMarker
        key={`contest-${rec.facilityId}`}
        center={[rec.lat, rec.lng]}
        radius={8}
        pathOptions={{
          color: CONTEST_COLOR, fillColor: CONTEST_COLOR,
          fillOpacity: 0.12 * opacity, opacity, weight: 2,
          dashArray: rec.contested ? '4 3' : undefined,
        }}
        eventHandlers={{ click: () => onSelect?.({ kind: 'contestation', rec }) }}
      >
        <Popup maxWidth={320} className="atlas-popup"><ContestationPopup rec={rec} /></Popup>
      </CircleMarker>
    ));
  },
};

function ContestationPopup({ rec }) {
  return (
    <div className="space-y-2 text-xs" style={{ minWidth: 250 }}>
      <div className="font-bold text-slate-100">{rec.name}</div>
      <div className="text-slate-500">{rec.country}</div>
      <div className="space-y-1.5">
        {rec.classifications.map((c, i) => (
          <div key={i} className="rounded p-1.5" style={{ background: 'rgba(234,179,8,0.07)', border: '1px solid rgba(234,179,8,0.2)' }}>
            <div className="text-[10px] uppercase tracking-wider text-yellow-400/80">{c.authority}</div>
            <div className="text-slate-200 leading-snug">{c.category}</div>
            <div className="mt-1"><SourceBadge source={c.provenance} /></div>
          </div>
        ))}
      </div>
      {rec.note && <div className="text-[11px] text-slate-400 italic">{rec.note}</div>}
      <Provenance provisional={rec.provisional} label="Classification basis" />
    </div>
  );
}

// ─── Layer 4 — Fuel Cycle Network ─────────────────────────────────────────────
const FUEL_STATES = [
  { id: 'FR', label: 'France' }, { id: 'US', label: 'USA' }, { id: 'RU', label: 'Russia' },
  { id: 'JP', label: 'Japan' }, { id: 'GB', label: 'UK' },
];
/** @type {AnalysisLayer} */
const fuelCycleLayer = {
  id: 'fuelcycle',
  label: 'Fuel cycle network',
  category: CATEGORIES.structure,
  icon: Workflow,
  description: 'The fuel cycle as a connected graph; enrichment & reprocessing chokepoints emphasised.',
  info: 'Models the chain mining → conversion → enrichment → fuel fabrication → reactor → reprocessing → waste as links between facilities, within and across states. The proliferation-sensitive enrichment and reprocessing nodes are drawn larger. Filter by stage, or focus a state to see its domestic cycle versus the stages it imports.',
  defaultOn: false,
  zOrder: 15,
  defaultSettings: { stages: null, focusState: null },
  legend: Object.entries(FUEL_STAGES)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key, v]) => ({ key, color: v.color, label: v.sensitive ? `${v.label} ★ sensitive` : v.label })),
  Controls: function FuelControls({ settings, setSetting }) {
    const allStages = Object.keys(FUEL_STAGES);
    const stageSel = selected(settings.stages, allStages);
    return (
      <div className="space-y-1.5 mt-1.5">
        <div className="flex flex-wrap gap-1">
          {Object.entries(FUEL_STAGES).sort((a, b) => a[1].order - b[1].order).map(([key, v]) => {
            const on = stageSel.includes(key);
            return (
              <button key={key} onClick={() => setSetting('stages', toggleIn(settings.stages, key, allStages))}
                className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                style={{ background: on ? v.color + '30' : 'rgba(30,50,80,0.4)', border: `1px solid ${on ? v.color + '80' : 'rgba(30,50,80,0.6)'}`, color: on ? '#e2e8f0' : '#64748b' }}>
                {v.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-1 pt-1">
          <span className="text-[9px] text-slate-600 self-center">Focus:</span>
          {FUEL_STATES.map((s) => (
            <button key={s.id} onClick={() => setSetting('focusState', settings.focusState === s.id ? null : s.id)}
              className="px-1.5 py-0.5 rounded text-[9px] font-medium"
              style={{ background: settings.focusState === s.id ? 'rgba(59,130,246,0.2)' : 'rgba(30,50,80,0.4)', border: `1px solid ${settings.focusState === s.id ? 'rgba(59,130,246,0.5)' : 'rgba(30,50,80,0.6)'}`, color: settings.focusState === s.id ? '#93c5fd' : '#64748b' }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    );
  },
  renderMap: ({ opacity, onSelect, settings }) => {
    const { nodes, edges, byId } = getFuelCycle();
    const allStages = Object.keys(FUEL_STAGES);
    const stageSel = selected(settings?.stages, allStages);
    const focus = settings?.focusState || null;

    const inFocus = (n) => !focus || n.stateId === focus;
    const edgeInFocus = (e) => {
      if (!focus) return true;
      const a = byId.get(e.from); const b = byId.get(e.to);
      return (a && a.stateId === focus) || (b && b.stateId === focus);
    };

    const els = [];
    // Edges first (under nodes)
    edges.forEach((e, i) => {
      const a = byId.get(e.from); const b = byId.get(e.to);
      if (!a || !b) return;
      if (!stageSel.includes(a.stage) || !stageSel.includes(b.stage)) return;
      const dim = focus && !edgeInFocus(e);
      els.push(
        <Polyline key={`fc-edge-${i}`} positions={[[a.lat, a.lng], [b.lat, b.lng]]}
          pathOptions={{
            color: e.type === 'import' ? '#06b6d4' : '#64748b',
            weight: e.type === 'import' ? 1.5 : 2,
            opacity: (dim ? 0.12 : 0.6) * opacity,
            dashArray: e.type === 'import' ? '5 5' : undefined,
          }} />,
      );
    });
    // Nodes
    nodes.forEach((n) => {
      if (!stageSel.includes(n.stage)) return;
      const meta = FUEL_STAGES[n.stage];
      const dim = focus && !inFocus(n);
      const r = meta.sensitive ? 8 : 5;
      els.push(
        <CircleMarker key={`fc-node-${n.id}`} center={[n.lat, n.lng]} radius={r}
          pathOptions={{
            color: meta.color, fillColor: meta.color,
            fillOpacity: (dim ? 0.15 : 0.85) * opacity, opacity: dim ? 0.3 * opacity : opacity,
            weight: meta.sensitive ? 2.5 : 1,
          }}
          eventHandlers={{ click: () => onSelect?.({ kind: 'fuelcycle', rec: n }) }}>
          <Popup maxWidth={280} className="atlas-popup"><FuelNodePopup node={n} meta={meta} /></Popup>
        </CircleMarker>,
      );
    });
    return els;
  },
};

function FuelNodePopup({ node, meta }) {
  return (
    <div className="space-y-1.5 text-xs" style={{ minWidth: 200 }}>
      <div className="font-bold text-slate-100">{node.name}</div>
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: meta.color }} />
        <span className="text-slate-200">{meta.label}{meta.sensitive ? ' · proliferation-sensitive' : ''}</span>
      </div>
      <div className="text-slate-500">{node.country}</div>
      {node.capacity && <div className="text-slate-400">{node.capacity}</div>}
      <Provenance provenance={node.provenance} provisional={node.provisional} />
    </div>
  );
}

// ─── Layer 6 — Temporal Trajectory ────────────────────────────────────────────
/** @type {AnalysisLayer} */
const temporalLayer = {
  id: 'temporal',
  label: 'Temporal trajectory',
  category: CATEGORIES.structure,
  icon: Clock,
  description: 'Animate build-out, shutdowns, and accidents over time; gates other dated layers by year.',
  info: 'A time slider (with playback) filters dated features: reactors appear at first-power, notable phase-outs grey out at shutdown, and accidents register on their date. The active year also drives the oversight layer, so you can read safeguards at a chosen year.',
  defaultOn: false,
  zOrder: 25,
  legend: [
    { color: '#3b82f6', label: 'Operating reactor' },
    { color: '#22d3ee', label: 'New build (≤2 yrs)' },
    { color: '#6b7280', label: 'Shut down' },
    { color: '#ef4444', label: 'Accident (on/after year)' },
  ],
  renderMap: ({ opacity, onSelect, year }) => {
    const els = [];
    getTemporalReactors().forEach((r) => {
      const state = reactorStateAt(r, year);
      if (state === 'future') return;
      const color = state === 'new' ? '#22d3ee' : state === 'shutdown' ? '#6b7280' : '#3b82f6';
      els.push(
        <CircleMarker key={`t-r-${r.id}`} center={[r.lat, r.lng]} radius={state === 'new' ? 5 : 3.5}
          pathOptions={{ color, fillColor: color, fillOpacity: 0.85 * opacity, opacity, weight: state === 'new' ? 2 : 0.5 }}
          eventHandlers={{ click: () => onSelect?.({ kind: 'temporal', rec: r }) }}>
          <Popup className="atlas-popup">
            <div className="text-xs space-y-0.5" style={{ minWidth: 170 }}>
              <div className="font-bold text-slate-100">{r.name}</div>
              <div className="text-slate-500">{r.country}</div>
              <div className="text-slate-400">First power: {r.firstPower}{r.shutdownYear ? ` · shut down ${r.shutdownYear}` : ''}</div>
              {r.provisional && <Provenance provisional label="Shutdown year" />}
            </div>
          </Popup>
        </CircleMarker>,
      );
    });
    getTemporalAccidents().forEach((a) => {
      if (a.year > year) return;
      const isThisYear = a.year === year;
      els.push(
        <CircleMarker key={`t-a-${a.id}`} center={[a.lat, a.lng]} radius={isThisYear ? 11 : 6}
          pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: (isThisYear ? 0.5 : 0.25) * opacity, opacity, weight: isThisYear ? 2.5 : 1 }}>
          <Popup className="atlas-popup">
            <div className="text-xs space-y-0.5" style={{ minWidth: 170 }}>
              <div className="font-bold text-slate-100">{a.name}</div>
              <div className="text-red-300">INES {a.inesLevel} · {a.year}</div>
            </div>
          </Popup>
        </CircleMarker>,
      );
    });
    return els;
  },
};

// ─── Layer 7 — Discourse / Naming (experimental) ──────────────────────────────
const DISCOURSE_COLOR = '#a78bfa';
/** @type {AnalysisLayer} */
const discourseLayer = {
  id: 'discourse',
  label: 'Discourse / naming',
  category: CATEGORIES.uncertainty,
  icon: Quote,
  description: 'How programmes are named and framed — official designation vs descriptive function. Interpretive.',
  info: 'Experimental and explicitly interpretive: treats naming and framing as an analysable attribute (e.g. a "research center" or "peaceful" designation versus its descriptive function). Filter by framing type. Curated commentary, not measured data.',
  defaultOn: false,
  zOrder: 50,
  defaultSettings: { tags: null },
  legend: [{ color: DISCOURSE_COLOR, label: 'Framing annotation (interpretive)' }],
  Controls: function DiscourseControls({ settings, setSetting }) {
    const sel = selected(settings.tags, FRAMING_TAGS);
    return (
      <div className="flex flex-wrap gap-1 mt-1.5">
        {FRAMING_TAGS.map((t) => {
          const on = sel.includes(t);
          return (
            <button key={t} onClick={() => setSetting('tags', toggleIn(settings.tags, t, FRAMING_TAGS))}
              className="px-1.5 py-0.5 rounded text-[9px] font-medium"
              style={{ background: on ? 'rgba(167,139,250,0.2)' : 'rgba(30,50,80,0.4)', border: `1px solid ${on ? 'rgba(167,139,250,0.5)' : 'rgba(30,50,80,0.6)'}`, color: on ? '#c4b5fd' : '#64748b' }}>
              {t}
            </button>
          );
        })}
      </div>
    );
  },
  renderMap: ({ opacity, onSelect, settings }) => {
    const sel = selected(settings?.tags, FRAMING_TAGS);
    return getDiscourseData()
      .filter((rec) => rec.framingTags.some((t) => sel.includes(t)))
      .map((rec) => (
        <CircleMarker key={`disc-${rec.entityId}`} center={[rec.lat, rec.lng]} radius={7}
          pathOptions={{ color: DISCOURSE_COLOR, fillColor: DISCOURSE_COLOR, fillOpacity: 0.2 * opacity, opacity, weight: 1.5, dashArray: '2 3' }}
          eventHandlers={{ click: () => onSelect?.({ kind: 'discourse', rec }) }}>
          <Popup maxWidth={300} className="atlas-popup"><DiscoursePopup rec={rec} /></Popup>
        </CircleMarker>
      ));
  },
};

function DiscoursePopup({ rec }) {
  return (
    <div className="space-y-2 text-xs" style={{ minWidth: 230 }}>
      <div className="font-bold text-violet-200">{rec.officialName}</div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[10px] uppercase tracking-wider text-slate-500">Function</span>
        <span className="text-slate-300">{rec.descriptiveFunction}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {rec.framingTags.map((t) => (
          <span key={t} className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: 'rgba(167,139,250,0.15)', color: '#c4b5fd', border: '1px solid rgba(167,139,250,0.3)' }}>{t}</span>
        ))}
      </div>
      {rec.note && <div className="text-[11px] text-slate-400 italic">{rec.note}</div>}
      <Provenance provenance={rec.provenance} provisional={rec.provisional} />
    </div>
  );
}

/** Ordered registry. */
export const LAYER_REGISTRY = [
  legalNormativeLayer,
  oversightLayer,
  arsenalLayer,
  contestationLayer,
  fuelCycleLayer,
  temporalLayer,
  discourseLayer,
];

/** Category display order. */
export const CATEGORY_ORDER = [CATEGORIES.authority, CATEGORIES.uncertainty, CATEGORIES.structure];

export default LAYER_REGISTRY;
