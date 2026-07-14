import { MessageCircle } from "lucide-react";

const products = [
  { name: "Chaqueta Denim Classic", price: "$ 95.000", sizes: ["S", "M", "L"] },
  { name: "Camiseta Polo Classic", price: "$ 105.000", sizes: ["S", "M", "L"] },
  { name: "Camiseta", price: "$ 105.000", sizes: ["S", "M", "L"] },

];

function ProductCard({ name, price, sizes }: { name: string; price: string; sizes: string[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-primary/10 bg-background shadow-sm">
      <div className="flex h-20 w-full items-center justify-center bg-primary/4">
        <span className="text-xs font-bold uppercase tracking-widest text-primary/40">
          {name.split(" ").slice(0, 2).join(" ")}
        </span>
      </div>
      <div className="space-y-1.5 p-3">
        <p className="text-md font-bold leading-tight text-primary">
          {name}
        </p>
        <p className="font-mono text-sm font-medium leading-none text-primary/60">
          {price}
        </p>
        <div className="flex gap-1 pt-1">
          {sizes.map((s) => (
            <span key={s} className="flex h-4 w-4 items-center justify-center rounded bg-accent/10 text-xs font-bold text-accent">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function IntegrationsPhoneMock() {
  return (
    <div className="relative w-full h-full flex justify-center pt-2 pb-6">
      <dialog className="floating-chat absolute top-4 sm:top-12 -left-2 sm:-left-8 z-30 flex items-start gap-3 rounded-2xl border border-primary/10 bg-background p-3 shadow-xl">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-300/50 text-green-600">
          <MessageCircle size={16} fill="currentColor" />
        </span>
        <div>
          <p className="text-md font-bold text-foreground">Nuevo pedido</p>
          <p className="mt-1 text-sm leading-tight text-foreground/70">
            "Hola, quiero la Chaqueta Denim en talla M"
          </p>
        </div>
      </dialog>

      <div
        className="relative flex w-full max-w-[350px] h-full flex-col rounded-4xl border-6 border-primary bg-background shadow-2xl z-10"
        aria-label="Simulador de catálogo móvil"
      >
        <div className="absolute left-1/2 top-2.5 z-30 h-[18px] w-[75px] -translate-x-1/2 rounded-full bg-primary shadow-sm" />

        <div className="relative z-20 select-none rounded-t-4xl bg-background px-4 pb-3 pt-9">
          <span className="flex items-center gap-1.5 text-md font-black tracking-widest text-primary">
            KODA
          </span>
        </div>

        <div className="flex-1 rounded-b-4xl space-y-3 overflow-hidden px-3 py-4 select-none relative z-10">
          {products.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}