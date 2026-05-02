export function StatCard({ icon, label, value, color, onClick, active }: any) {
  return (
    <button 
      onClick={onClick}
      disabled={!onClick}
      className={`p-5 rounded-3xl border border-foreground/5 flex items-center gap-4 text-left transition-all ${onClick ? 'hover:shadow-md hover:bg-foreground/1 cursor-pointer' : ''} ${active ? 'bg-navy/5 border-navy/20' : 'bg-background'}`}
    >
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-secondary uppercase tracking-widest leading-none">{label}</p>
        <p className="text-xl font-black text-primary mt-1 leading-none">{value}</p>
      </div>
    </button>
  );
}

export function TabButton({ children, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-8 py-3 rounded-t-2xl font-black text-sm transition-all relative ${
        active ? 'text-navy' : 'text-secondary hover:text-primary'
      }`}
    >
      {children}
      {active && <div className="absolute bottom-[-2px] left-0 right-0 h-1 bg-navy rounded-full animate-in fade-in duration-300" />}
    </button>
  );
}
