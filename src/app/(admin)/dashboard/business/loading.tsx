export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-foreground/10 border-t-contrast"></div>
        <p className="text-sm font-semibold tracking-wider text-foreground-muted uppercase">Cargando módulo...</p>
      </div>
    </div>
  );
}
