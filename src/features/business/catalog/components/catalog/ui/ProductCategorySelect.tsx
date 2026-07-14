export default function ProductCategorySelect({ categoryId, setCategoryId, categories }: { categoryId: string, setCategoryId: (id: string) => void, categories: any[] }) {
  return (
    <div className="space-y-2">
      <label htmlFor="productCategory" className="text-sm font-medium text-foreground/80 tracking-tight ml-1 block">Categoría</label>
      <div className="relative">
        <select
          id="productCategory"
          required
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-medium text-primary bg-background text-sm appearance-none cursor-pointer"
        >
          <option value="" disabled>Seleccionar categoría</option>
          {categories.map(cat => (
            <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
          ))}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground-muted"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  );
}
