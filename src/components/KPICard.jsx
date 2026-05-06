export default function KPICard({ title, value, unit, subtitle, trend, accent = 'teal' }) {
  const accents = {
    teal:   { val: '#2AD4C4', bg: 'rgba(42,212,196,0.08)',  border: 'rgba(42,212,196,0.15)' },
    terra:  { val: '#D4724A', bg: 'rgba(212,114,74,0.08)',  border: 'rgba(212,114,74,0.15)' },
    purple: { val: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.15)' },
    blue:   { val: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.15)' },
  };
  const a = accents[accent] || accents.teal;

  return (
    <div
      className="rounded-xl p-5 card-glow transition-all"
      style={{ background: '#111111', borderColor: a.border }}
    >
      <p className="text-[11px] font-medium uppercase tracking-widest text-white/40">{title}</p>
      <div className="mt-3 flex items-end gap-1.5">
        <span className="text-3xl font-bold" style={{ color: a.val }}>{value}</span>
        {unit && <span className="text-xs text-white/40 mb-1 font-light">{unit}</span>}
      </div>
      {subtitle && <p className="text-[11px] mt-1.5 text-white/30 font-light">{subtitle}</p>}
      {trend !== undefined && (
        <p className="text-[11px] mt-3 font-medium">
          <span style={{ color: trend > 0 ? '#4ade80' : '#f87171' }}>
            {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%
          </span>
          <span className="text-white/25 ml-1">vs last month</span>
        </p>
      )}
    </div>
  );
}
