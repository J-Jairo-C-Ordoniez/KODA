import { ArrowDown, Book, FileText, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: "history",
    title: "No pierdes tu historia",
    description:
      "Si hoy tienes todo en cuaderno o Excel, lo revisamos contigo y lo dejamos listo para empezar sin borrar lo que ya trabajaste.",
    visual: (
      <article className="h-full w-full flex flex-col items-center justify-center space-y-6">
        <div className="flex gap-4">
          <p className="rounded-xl border border-primary/6 bg-primary/1 px-5 py-3 text-md font-medium text-primary shadow-sm flex flex-col justify-center items-center">
            <Book
              className="text-primary/80"
              size={24}
              strokeWidth={1.2}
            />
            Cuaderno
          </p>

          <p className="rounded-xl border border-primary/6 bg-primary/1 px-5 py-3 text-md font-medium text-primary shadow-sm flex flex-col justify-center items-center">
            <FileText
              className="text-primary/80"
              size={24}
              strokeWidth={1.2}
            />
            Excel
          </p>
        </div>

        <ArrowDown
          className="text-primary"
          size={32}
          strokeWidth={2}
        />

        <div className="w-16 h-16 bg-primary group-hover:bg-primary/80 rounded-lg flex items-center justify-center transition-colors">
          <span className="font-black text-3xl text-background">K</span>
        </div>
      </article>
    ),
  },
  {
    id: "data",
    title: "Te dejamos la tienda cargada",
    description:
      "Subimos productos, clientes y fiados para que no tengas que pasar noches digitando ni parar las ventas del local.",
    visual: (
      <article className="h-full w-full flex flex-col items-center justify-center gap-4 px-18 py-6 md:p-20">
        {["Productos", "Clientes", "Fiados"].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-primary/6 bg-background px-5 py-3 shadow-xs flex justify-between items-center w-full"
          >
            <span className="text-md font-medium text-primary">
              {item}
            </span>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle
                size={24}
                strokeWidth={2}
              />
            </div>
          </div>
        ))}
      </article>
    ),
  },
  {
    id: "team",
    title: "Tu equipo aprende rápido",
    description:
      "Te mostramos lo básico con calma: vender, cobrar, mirar stock y revisar fiados. Sin palabras raras ni vueltas largas.",
    visual: (
      <article className="grid w-full h-full grid-cols-2 gap-4 px-25 py-6 md:p-30">
        {["Vender", "Cobrar", "Stock", "Fiados"].map((item) => (
          <div
            key={item}
            className="flex aspect-square flex-col items-center justify-center gap-3 rounded-4xl border border-primary/6 bg-background px-5 py-3 shadow-xs"
          >
            <div className="h-10 w-10 rounded-full bg-accent/60 animate-ping duration-9500" />
            <span className="font-medium text-primary">{item}</span>
          </div>
        ))}
      </article>
    ),
  },
];

export default function MigrationContent() {
  return (
    <div className="scrolltelling-wrapper relative flex flex-col gap-16 md:grid md:grid-cols-12 md:gap-8">
      <div className="w-full md:col-span-6 md:pb-[10vh]">
        {steps.map((step) => (
          <article
            key={step.id}
            className="step-text-block flex flex-col justify-center md:min-h-[60vh] md:pr-12"
          >
            <header className="mb-8 md:mb-0">
              <h3 className="mb-4 text-2xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:mb-6 md:text-5xl">
                {step.title}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-foreground/80 md:text-xl">
                {step.description}
              </p>
            </header>

            <figure
              className="w-full mb-8 overflow-hidden py-4 md:hidden"
              aria-hidden="true"
            >
              {step.visual}
            </figure>
          </article>
        ))}
      </div>

      <aside className="hidden h-full md:col-span-6 md:block">
        <div className="sticky-panel relative flex h-[60vh] w-full items-center justify-center overflow-hidden">
          {steps.map((step) => (
            <figure
              key={step.id}
              className="desktop-visual absolute inset-0 flex items-center justify-center p-8"
              aria-hidden="true"
            >
              {step.visual}
            </figure>
          ))}
        </div>
      </aside>
    </div>
  );
}