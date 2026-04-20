import { Store, ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function StepOne({ formData, handleChange, nextStep }: { formData: any, handleChange: any, nextStep: any }) {
    return (
        <motion.div
            key="step1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <label htmlFor="businessName" className="block text-xs font-medium uppercase tracking-widest text-secondary ml-1">
                    Nombre del Negocio
                </label>
                <div className="relative group">
                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
                    <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium placeholder:text-secondary/80"
                        placeholder="Ej: Moda Stilos"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="type" className="block text-xs font-medium uppercase tracking-widest text-secondary ml-1">
                    Tipo de Tienda
                </label>
                <div className="relative group">
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium appearance-none"
                    >
                        <option value="ropa">Ropa y Accesorios</option>
                        <option value="calzado">Calzado</option>
                        <option value="general">Comercio General</option>
                    </select>
                    <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary rotate-90" size={16} />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="whatsapp" className="block text-xs font-medium uppercase tracking-widest text-secondary ml-1">
                    Número de WhatsApp
                </label>
                <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
                    <input
                        id="whatsapp"
                        name="whatsapp"
                        type="text"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium placeholder:text-secondary/80"
                        placeholder="300 123 4567"
                    />
                </div>
            </div>

            <Button
                type="button"
                onClick={nextStep}
                variant="navy"
                className="w-full py-4 rounded-2xl font-black tracking-tight"
            >
                Continuar
            </Button>
        </motion.div>
    );
}