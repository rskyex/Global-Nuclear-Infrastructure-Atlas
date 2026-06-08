/* eslint-disable react-refresh/only-export-components -- registry is a data/config module that intentionally exports layer descriptors (objects), not React components. */
import { CircleMarker, Popup } from 'react-leaflet';
import { Shield, Scale } from 'lucide-react';
import Provenance from '../components/Provenance';
import { getOversightData, SAFEGUARDS_RAMP, OVERSIGHT_LEGEND } from '../data/layers/oversight';
import {
  getLegalNormativeData, LEGAL_REGIMES, LEGAL_STATUS_COLOR,
  regimeBucket, nptLabel, ctbtLabel, tpnwLabel,
} from '../data/layers/legalNormative';

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
  uncertainty: 'Estimates & contestation',
  structure: 'Structure & time',
};

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
    const data = getLegalNormativeData();
    return data.map((rec) => {
      const c = centroids.get(rec.country);
      if (!c) return null;
      const bucket = regimeBucket(rec, regime);
      const color = LEGAL_STATUS_COLOR[bucket];
      return (
        <CircleMarker
          key={`legal-${rec.stateId}`}
          center={c}
          radius={9}
          pathOptions={{ color, fillColor: color, fillOpacity: 0.45 * opacity, opacity, weight: 2 }}
          eventHandlers={{ click: () => onSelect?.({ kind: 'legal', rec }) }}
        >
          <Popup maxWidth={300} className="atlas-popup">
            <LegalPopup rec={rec} regime={regime} />
          </Popup>
        </CircleMarker>
      );
    });
  },
};

function LegalPopup({ rec, regime }) {
  const rows = [
    ['NPT', nptLabel(rec.npt)],
    ['CTBT', ctbtLabel(rec.ctbt)],
    ['TPNW', tpnwLabel(rec.tpnw)],
    ['NWFZ', rec.nwfz || 'None'],
    ['Additional Protocol', rec.additionalProtocol ? 'In force' : 'Not in force'],
  ];
  return (
    <div className="space-y-2 text-xs" style={{ minWidth: 220 }}>
      <div className="flex items-center gap-1.5 font-bold text-slate-100">
        <span>{rec.flag}</span>{rec.country}
      </div>
      <div className="space-y-1">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="flex items-center justify-between gap-3"
            style={{ fontWeight: k.toLowerCase().startsWith(regime.slice(0, 3)) ? 600 : 400 }}
          >
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
  info: 'Shows the uneven topology of inspection and verification authority. The ramp runs from comprehensive safeguards (all declared material verifiable) down to no agreement in force. Click a facility for what its status does — and does not — let inspectors see.',
  defaultOn: false,
  zOrder: 20,
  legend: OVERSIGHT_LEGEND,
  renderMap: ({ opacity, onSelect }) => {
    const data = getOversightData();
    return data.map((rec) => {
      const ramp = SAFEGUARDS_RAMP[rec.safeguardsStatus];
      return (
        <CircleMarker
          key={`oversight-${rec.facilityId}`}
          center={[rec.lat, rec.lng]}
          radius={5}
          pathOptions={{
            color: ramp.color,
            fillColor: ramp.color,
            fillOpacity: 0.85 * opacity,
            opacity,
            weight: rec.additionalProtocol ? 2 : 0.5,
          }}
          eventHandlers={{ click: () => onSelect?.({ kind: 'oversight', rec }) }}
        >
          <Popup maxWidth={300} className="atlas-popup">
            <OversightPopup rec={rec} />
          </Popup>
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
      <div className="text-[11px] text-slate-400">
        Additional Protocol: {rec.additionalProtocol ? 'in force (thicker outline)' : 'not in force'}
      </div>
      <Provenance provenance={rec.provenance} provisional={rec.provisional} />
    </div>
  );
}

/** Ordered registry. New layers (2,3,4,6,7) will append here in later stages. */
export const LAYER_REGISTRY = [legalNormativeLayer, oversightLayer];

/** Category display order. */
export const CATEGORY_ORDER = [CATEGORIES.authority, CATEGORIES.uncertainty, CATEGORIES.structure];

export default LAYER_REGISTRY;
