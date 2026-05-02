export default function Footer() {
  return (
    <footer className="w-full bg-background mt-20 py-20 border-t border-foreground/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-center md:text-right">
          <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.15em]">
            © {new Date().getFullYear()} KODA. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  );
}
