import { Shield, Target, AlertTriangle, Cpu, Activity, Globe } from 'lucide-react';
import { SAFEGUARDS_GAP_DEFINITION, CONFLICT_RULE_TEXT } from '../data/enrichedFacilities';

export default function GlobalRiskBar({ summary, policyFluxCount }) {
  const items = [
    { label: 'Total Mapped', value: summary.total, icon: Globe, color: '#3b82f6' },
    { label: 'Safeguards Gaps', value: summary.safeguardsGaps, icon: Shield, color: '#f59e0b', title: SAFEGUARDS_GAP_DEFINITION },
    { label: 'Conflict Exposure (UCDP, 100 km)', value: summary.conflictProximity, icon: Target, color: '#ef4444', title: CONFLICT_RULE_TEXT },
    { label: 'Decommissioning', value: summary.decommissioning, icon: AlertTriangle, color: '#6b7280' },
    { label: 'Digital I&C, no reported incident', value: summary.digitalNoCyberAudit, icon: Cpu, color: '#8b5cf6' },
    { label: 'Policy Flux Countries', value: policyFluxCount, icon: Activity, color: '#ec4899' },
  ];

  return (
    <div
      className="flex-shrink-0 flex items-center gap-4 px-4 py-2 overflow-x-auto border-b"
      style={{
        background: 'rgba(7,13,26,0.95)',
        borderColor: 'rgba(26,48,80,0.6)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex-shrink-0">
        Global Risk
      </span>
      {items.map(({ label, value, icon: Icon, color, title }) => (
        <div key={label} className="flex items-center gap-1.5 flex-shrink-0" title={title}>
          <Icon size={11} style={{ color }} />
          <span className="text-sm font-bold" style={{ color, fontFamily: 'JetBrains Mono, monospace' }}>
            {value}
          </span>
          <span className="text-xs text-slate-400">{label}</span>
        </div>
      ))}
    </div>
  );
}
