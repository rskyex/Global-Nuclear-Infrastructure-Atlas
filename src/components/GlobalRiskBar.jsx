import { Shield, Target, AlertTriangle, Cpu, Activity, Globe } from 'lucide-react';

export default function GlobalRiskBar({ summary, policyFluxCount }) {
  const items = [
    { label: 'Total Mapped', value: summary.total, icon: Globe, color: '#3b82f6' },
    { label: 'Safeguards Gaps', value: summary.safeguardsGaps, icon: Shield, color: '#f59e0b' },
    { label: 'Conflict Proximity', value: summary.conflictProximity, icon: Target, color: '#ef4444' },
    { label: 'Decommissioning', value: summary.decommissioning, icon: AlertTriangle, color: '#6b7280' },
    { label: 'Digital I&C (no audit)', value: summary.digitalNoCyberAudit, icon: Cpu, color: '#8b5cf6' },
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
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex-shrink-0">
        Global Risk
      </span>
      {items.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="flex items-center gap-1.5 flex-shrink-0">
          <Icon size={11} style={{ color }} />
          <span className="text-sm font-bold" style={{ color, fontFamily: 'JetBrains Mono, monospace' }}>
            {value}
          </span>
          <span className="text-xs text-slate-500">{label}</span>
        </div>
      ))}
    </div>
  );
}
