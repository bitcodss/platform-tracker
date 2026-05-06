export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div className={`rounded-xl p-5 card-glow ${className}`} style={{ background: '#111111' }}>
      <h3 className="text-sm font-semibold text-white/95">{title}</h3>
      {subtitle && <p className="text-[11px] text-white/90 mt-0.5 font-light">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}
