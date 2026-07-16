"use client";

import { Store, Phone, ChevronDown } from "lucide-react";
import Button from "@/shared/components/Button";

const inputClass = "w-full pl-11 pr-4 py-3 bg-background border border-primary/10 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all duration-300 text-md font-medium text-primary placeholder:text-primary/40";
const labelClass = "block text-md font-normal leading-relaxed text-primary mb-2";
const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors duration-300";

export default function StepOne({ formData, handleChange, nextStep }: any) {
    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <label
                    htmlFor="businessName"
                    className={labelClass}
                >
                    Nombre del Negocio
                </label>

                <div className="relative group">
                    <Store
                        className={iconClass}
                        size={20}
                    />
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

            <div className="space-y-2">
                <label
                    htmlFor="type"
                    className={labelClass}
                >
                    Tipo de Tienda
                </label>

                <div className="relative group">
                    <ChevronDown
                        className={iconClass}
                        size={20}
                    />
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={ `${inputClass} appearance-none pr-10`}
                    >
                        <option value="ropa">Ropa y Accesorios</option>
                        <option value="calzado">Calzado</option>
                        <option value="general">Comercio General</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="whatsApp"
                    className={labelClass}
                >
                    Número de WhatsApp
                </label>

                <div className="relative group">
                    <Phone
                        className={iconClass}
                        size={20}
                    />
                    <input
                        id="whatsApp"
                        name="whatsApp"
                        type="text"
                        required
                        value={formData.whatsApp}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="300 123 4567"
                    />
                </div>
            </div>

            <Button
                type="button"
                onClick={nextStep}
                variant="primary"
                className="w-full"
            >
                Continuar
            </Button>
        </div>
    );
}