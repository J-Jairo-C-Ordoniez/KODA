import { motion } from "framer-motion";

interface StepsProps {
    step: number;
}

export default function Steps({ step }: StepsProps) {
    return (
        <div className="mb-8 flex items-center justify-between px-2">
            <span className={`flex items-center gap-2 ${step >= 1 ? 'text-navy' : 'text-secondary/40'}`}>
                <p className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-md border-2 ${step >= 1 ? 'border-navy bg-navy/5' : 'border-secondary/20'}`}>1</p>
                <p className="text-xs uppercase font-medium tracking-widest hidden sm:inline">Negocio</p>
            </span>
            <span className="h-px grow mx-4 bg-foreground/10 relative">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: step === 2 ? "100%" : "0%" }}
                    className="absolute inset-0 bg-navy"
                />
            </span>
            <span className={`flex items-center gap-2 ${step === 2 ? 'text-navy' : 'text-secondary/40'}`}>
                <p className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-md border-2 ${step === 2 ? 'border-navy bg-navy/5' : 'border-secondary/20'}`}>2</p>
                <span className="text-xs uppercase font-medium tracking-widest hidden sm:inline">Dueño</span>
            </span>
        </div>
    );
}