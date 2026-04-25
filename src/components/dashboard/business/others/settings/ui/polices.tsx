import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function PolicyForm({ initialData, saveAction, onNotify }) {
    const [loading, setLoading] = useState(false);
    const [textParagraphs, setTextParagraphs] = useState('');

    useEffect(() => {
        if (Array.isArray(initialData?.content)) {
            setTextParagraphs(initialData.content.join('\n\n'));
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const contentArray = textParagraphs
            .split('\n')
            .map(p => p.trim())
            .filter(p => p.length > 0);

        const result = await saveAction({ content: contentArray, policyId: initialData.policyId });
        onNotify(result.error ? 'error' : 'success', result.error || 'Políticas de privacidad actualizadas');
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 space-y-8 text-left animate-in fade-in duration-500">
            <header className="border-b border-primary/5 pb-4">
                <div className="flex flex-col items-start gap-1">
                    <h3 className="text-lg font-bold tracking-wider text-primary/90">Políticas de Privacidad</h3>
                    <p className="text-md text-secondary tracking-wider">Redacta los términos y condiciones de tu tienda.</p>
                </div>
            </header>

            <div className="space-y-4">
                <textarea
                    rows={16}
                    placeholder="Escribe aquí tus políticas párrafo por párrafo..."
                    className="text-primary/80 tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors"
                    value={textParagraphs}
                    onChange={(e) => setTextParagraphs(e.target.value)}
                />

                <div className="flex justify-between items-center px-2">
                    <p className="text-xs text-secondary font-medium uppercase tracking-widest">
                        Total Párrafos Detectados: <span className="text-primary font-bold">{textParagraphs.split('\n').filter(p => p.trim()).length}</span>
                    </p>
                    <p className="text-xs text-secondary/80 italic uppercase tracking-tighter">Utiliza doble salto de línea para separar visualmente los bloques.</p>
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-primary/5">
                <button type="submit" disabled={loading} className="bg-primary text-foreground px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 shadow-xl shadow-primary/10 active:scale-95">
                    <Save className="h-4 w-4" />
                    {loading ? 'Guardando cambios...' : 'Confirmar Políticas'}
                </button>
            </div>
        </form>
    );
}