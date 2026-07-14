import { useRef } from "react";
import { Store, ArrowRight, Phone } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "@/shared/components/Button";

const inputClass = "w-full pl-12 pr-4 py-3 md:py-4 bg-background border border-foreground/8 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-contrast/20 focus:border-contrast outline-none transition-all duration-200 text-sm md:text-base font-medium text-primary placeholder:text-foreground-muted/50";
const labelClass = "block text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground-muted mb-2";
const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors duration-200";

export default function StepOne({ formData, handleChange, nextStep }: { formData: any, handleChange: any, nextStep: any }) {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
    }, { scope: containerRef });

    return (
        <fieldset ref={containerRef} className="space-y-6 w-full">
            <legend className="sr-only">Paso 1: Información de tu negocio</legend>
            <div className="space-y-1.5">
                <label htmlFor="businessName" className={labelClass}>Nombre del Negocio</label>
                <div className="relative group">
                    <Store className={iconClass} size={18} />
                    <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Ej: Moda Stilos"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="type" className={labelClass}>Tipo de Tienda</label>
                <div className="relative group">
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={`${inputClass} pl-4 appearance-none`}
                    >
                        <option value="ropa">Ropa y Accesorios</option>
                        <option value="calzado">Calzado</option>
                        <option value="general">Comercio General</option>
                    </select>
                    <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted rotate-90" size={16} />
                </div>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="whatsapp" className={labelClass}>Número de WhatsApp</label>
                <div className="relative group">
                    <Phone className={iconClass} size={18} />
                    <input
                        id="whatsapp"
                        name="whatsapp"
                        type="text"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="300 123 4567"
                    />
                </div>
            </div>

            <div className="pt-2">
                <Button
                    type="button"
                    onClick={nextStep}
                    variant="contrast"
                    className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-black tracking-widest uppercase text-xs md:text-sm"
                >
                    Continuar →
                </Button>
            </div>
        </fieldset>
    );
}