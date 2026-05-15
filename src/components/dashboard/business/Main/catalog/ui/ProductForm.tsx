import { Check } from 'lucide-react';
import ProductCategorySelect from './ProductCategorySelect';
import ProductGenderSelect from './ProductGenderSelect';
import ProductVisibilityToggle from './ProductVisibilityToggle';

export default function ProductForm({ formData, setFormData, categories, isSaving, onSubmit, onClose, editingProduct }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 pt-1">
      <div className="space-y-2">
        <label htmlFor="productName" className="text-sm font-medium text-foreground/80 tracking-tight ml-1 block">Nombre del producto</label>
        <input
          id="productName"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-medium text-primary bg-background text-sm placeholder:text-foreground-muted/70"
          placeholder="Ej. Gorras de béisbol"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="productDescription" className="text-sm font-medium text-foreground/80 tracking-tight ml-1 block">Descripción del producto</label>
        <textarea
          id="productDescription"
          rows={2}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-medium text-primary bg-background text-sm placeholder:text-foreground-muted/70 resize-none"
          placeholder="Materiales, ajuste y detalles..."
        />
      </div>

      <ProductCategorySelect 
        categoryId={formData.categoryId} 
        setCategoryId={(id: string) => setFormData({ ...formData, categoryId: id })} 
        categories={categories} 
      />

      <ProductGenderSelect 
        gender={formData.gender} 
        setGender={(g: string) => setFormData({ ...formData, gender: g })} 
      />

      <ProductVisibilityToggle 
        isPublic={formData.isPublic} 
        setIsPublic={(p: boolean) => setFormData({ ...formData, isPublic: p })} 
      />

      <div className="flex gap-3 sticky bottom-0 bg-background-elevated pt-4 pb-2 border-t border-foreground/5 mt-4 z-10">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3.5 rounded-2xl border border-foreground/10 font-semibold text-sm text-foreground/80 hover:bg-foreground/5 hover:text-primary transition-all active:scale-95"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 py-3.5 rounded-2xl bg-contrast text-white font-bold text-sm hover:bg-contrast-hover disabled:opacity-50 transition-all shadow-lg shadow-contrast/25 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <span className="flex items-center gap-2" role="status">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" /> 
              Guardando...
            </span>
          ) : (
            <><Check size={16} aria-hidden="true" /> {editingProduct ? 'Actualizar' : 'Crear Producto'}</>
          )}
        </button>
      </div>
    </form>
  );
}