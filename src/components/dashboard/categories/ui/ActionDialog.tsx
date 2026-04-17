import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

export default function ActionDialog({ 
    type = 'confirm', 
    title, 
    message, 
    onConfirm, 
    onCancel, 
    confirmText = 'Confirmar', 
    cancelText = 'Cancelar',
    variant = 'danger' 
}) {
    const iconMap = {
        confirm: <HelpCircle className="h-10 w-10 text-blue-500" />,
        alert: <AlertCircle className="h-10 w-10 text-red-500" />,
        success: <CheckCircle2 className="h-10 w-10 text-green-500" />
    };

    const variantClasses = {
        danger: 'bg-red-500 hover:bg-red-600',
        primary: 'bg-primary hover:bg-primary/90',
        success: 'bg-green-500 hover:bg-green-600'
    };

    return (
        <div className="space-y-6 text-center py-4">
            <div className="flex justify-center">
                {iconMap[type]}
            </div>
            
            <div className="space-y-2">
                {title && <h4 className="text-lg font-bold text-primary">{title}</h4>}
                <p className="text-secondary text-md">{message}</p>
            </div>

            <div className="flex gap-4 pt-4">
                {type === 'confirm' && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-secondary/10 hover:bg-secondary/20 transition-colors duration-300 text-secondary px-6 py-3 rounded-md cursor-pointer flex-1"
                    >
                        {cancelText}
                    </button>
                )}
                <button
                    type="button"
                    onClick={onConfirm}
                    className={`${variantClasses[variant]} transition-colors duration-300 text-white px-6 py-3 rounded-md cursor-pointer flex-1 font-semibold`}
                >
                    {confirmText}
                </button>
            </div>
        </div>
    );
}
