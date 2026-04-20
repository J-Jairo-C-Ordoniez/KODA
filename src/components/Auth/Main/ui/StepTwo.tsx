import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function StepTwo({ formData, handleChange, prevStep, loading }: any) {
    return (
        <motion.div
            key="step2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <label htmlFor="ownerName" className="block text-xs font-medium uppercase tracking-widest text-secondary ml-1">
                    Nombre del Responsable
                </label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
                    <input
                        id="ownerName"
                        name="ownerName"
                        type="text"
                        required
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium placeholder:text-secondary/80"
                        placeholder="Tu nombre completo"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-secondary ml-1">
                    Correo Electrónico
                </label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium placeholder:text-secondary/80"
                        placeholder="tucorreo@ejemplo.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="block text-xs font-medium uppercase tracking-widest text-secondary ml-1">
                    Contraseña
                </label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium placeholder:text-secondary/80"
                        placeholder="Mínimo 8 caracteres"
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <Button
                    type="button"
                    onClick={prevStep}
                    variant="secondary"
                    className="bg-foreground/5 hover:bg-foreground/10 py-4 px-6 rounded-2xl font-medium text-secondary"
                >
                    <ArrowLeft size={18} />
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                    variant="navy"
                    className="grow py-4 rounded-2xl font-medium tracking-tight"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando...
                        </>
                    ) : (
                        "Completar Registro"
                    )}
                </Button>
            </div>
        </motion.div>
    );
}