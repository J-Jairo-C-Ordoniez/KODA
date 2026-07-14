export default function Footer() {
  return (
    <footer className="w-full bg-background mt-32 py-16 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center">
        <p className="text-[9px] font-black text-foreground-muted uppercase tracking-[0.2em] opacity-20">
          © {new Date().getFullYear()} KODA • TODOS LOS DERECHOS RESERVADOS.
        </p>
      </div>
    </footer>
  );
}
