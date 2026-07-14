import { User, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import Button from "@/shared/components/Button";

const inputClass = "w-full pl-12 pr-4 py-3 md:py-4 bg-background border border-foreground/8 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-contrast/20 focus:border-contrast outline-none transition-all duration-200 text-sm md:text-base font-medium text-primary placeholder:text-foreground-muted/50";
const labelClass = "block text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground-muted mb-2";
const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors duration-200";

export default function StepTwo({ formData, handleChange, prevStep, loading }: any) {
    return (
        <fieldset className="space-y-6 w-full">
            <legend className="sr-only">Paso 2: Datos del responsable</legend>
            <div className="space-y-1.5">
                <label htmlFor="ownerName" className={labelClass}>Nombre del Responsable</label>
                <div className="relative group">
                    <User className={iconClass} size={18} />
                    <input
                        id="ownerName"
                        name="ownerName"
                        type="text"
                        required
                        value={formData.ownerName}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Tu nombre completo"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="email" className={labelClass}>Correo Electrónico</label>
                <div className="relative group">
                    <Mail className={iconClass} size={18} />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="tucorreo@ejemplo.com"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="password" className={labelClass}>Contraseña</label>
                <div className="relative group">
                    <Lock className={iconClass} size={18} />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Mínimo 8 caracteres"
                    />
                </div>
            </div>

            <div className="flex gap-3 md:gap-4 pt-2">
                <Button
                    type="button"
                    onClick={prevStep}
                    variant="secondary"
                    className="bg-foreground/5 hover:bg-foreground/10 py-3 md:py-4 px-5 md:px-6 rounded-xl md:rounded-2xl font-bold text-primary border border-foreground/8 flex items-center justify-center shrink-0"
                    title="Volver"
                >
                    <ArrowLeft size={18} />
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                    variant="contrast"
                    className="grow py-3 md:py-4 rounded-xl md:rounded-2xl font-black tracking-widest uppercase text-xs md:text-sm flex items-center justify-center"
                >
                    {loading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando...</>
                    ) : (
                        'Completar Registro'
                    )}
                </Button>
            </div>
        </fieldset>
    );
}