'use client';

import { useState, useEffect } from 'react';
import UploadSection from './UploadSection';
import { Save, AlignLeft, Smartphone } from 'lucide-react';

export default function AboutForm({ initialData, saveAction, onNotify }) {
  const [loading, setLoading] = useState(false);
  const [textParagraphs, setTextParagraphs] = useState('');
  const [formData, setFormData] = useState({
    contact: initialData?.contact || '',
    logo: initialData?.logo || '',
    photo: initialData?.photo || ''
  });

  useEffect(() => {
    if (Array.isArray(initialData?.content)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

    const result = await saveAction({ ...formData, content: contentArray, aboutId: initialData?.aboutId });
    onNotify(result.error ? 'error' : 'success', result.error || 'Información actualizada');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-10 text-left animate-in fade-in duration-500">
      <header className="border-b border-primary/5 pb-4">
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-lg font-bold tracking-wider text-primary/90">Identidad del Negocio</h3>
          <p className="text-md text-secondary tracking-wider">Configura la presencia visual y narrativa de tu marca.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 ml-1">
              <Smartphone className="h-4 w-4 text-secondary" />
              <label className="text-xs font-bold uppercase tracking-wider text-secondary">WhatsApp de Contacto</label>
            </div>
            <input
              type="text"
              placeholder="Ej: 310..."
              className="text-primary/80 tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 ml-1">
              <AlignLeft className="h-4 w-4 text-secondary" />
              <label className="text-xs font-bold uppercase tracking-wider text-secondary">Nuestra Historia / Contenido</label>
            </div>
            <textarea
              rows={10}
              placeholder="Escribe los párrafos de tu marca aquí..."
              className="text-primary/80 tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors"
              value={textParagraphs}
              onChange={(e) => setTextParagraphs(e.target.value)}
            />
            <div className="flex justify-between px-2">
              <p className="text-xs text-secondary/80 italic uppercase tracking-wider">Un salto de línea = Un párrafo nuevo</p>
              <p className="text-xs text-primary/90 font-bold uppercase tracking-widest">{textParagraphs.split('\n').filter(p => p.trim()).length} Párrafos</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <UploadSection
            label="Logo de Marca"
            value={formData.logo}
            preset="landing"
            aspect="aspect-auto"
            onSuccess={(url) => setFormData({ ...formData, logo: url })}
          />

          <UploadSection
            label="Imagen de Portada / Banner"
            value={formData.photo}
            preset="landing"
            aspect="aspect-video"
            onSuccess={(url) => setFormData({ ...formData, photo: url })}
          />
        </div>
      </div>

      <div className="pt-6 border-t border-primary/5 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="group bg-primary text-foreground px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-3 disabled:opacity-50 active:scale-95"
        >
          {loading ? (
            <span className="animate-pulse">Guardando...</span>
          ) : (
            <>
              <Save className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Actualizar Información
            </>
          )}
        </button>
      </div>
    </form>
  );
}