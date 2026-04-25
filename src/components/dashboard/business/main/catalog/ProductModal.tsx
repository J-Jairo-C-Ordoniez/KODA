"use client";

import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Package, Layers, Edit3, Check, Smartphone, Palette, Ruler, DollarSign } from 'lucide-react';
import { useAdminCatalog } from '@/hooks/admin/useAdminCatalog';
import VariantForm from './ui/VariantForm';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenantId: string | undefined;
  categories: any[];
  editingProduct?: any;
}

export default function ProductModal({ isOpen, onClose, tenantId, categories, editingProduct }: ProductModalProps) {
  const { saveProduct, saveVariant, deleteVariant, isSaving, fetchCatalogData } = useAdminCatalog(tenantId);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    gender: 'mixto',
    isPublic: true
  });

  const [activeTab, setActiveTab] = useState<'info' | 'variants'>('info');
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [editingVariant, setEditingVariant] = useState<any>(null);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        categoryId: editingProduct.categoryId,
        gender: editingProduct.gender,
        isPublic: editingProduct.isPublic
      });
    } else {
      setFormData({
        name: '',
        description: '',
        categoryId: categories[0]?.categoryId || '',
        gender: 'mixto',
        isPublic: true
      });
    }
    setActiveTab('info');
    setIsAddingVariant(false);
  }, [editingProduct, categories, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await saveProduct(formData, editingProduct);
    if (result.success) {
      if (!editingProduct) setActiveTab('variants');
      else onClose();
    }
  };

  const handleSaveVariant = async (data: any) => {
    const result = await saveVariant(data, editingVariant, editingProduct?.productId);
    if (result.success) {
      setIsAddingVariant(false);
      setEditingVariant(null);
      fetchCatalogData(); // Refresh to show new variants
    }
  };

  const handleDeleteVariant = async (id: string) => {
    if (confirm('¿Eliminar esta variante?')) {
      await deleteVariant(id);
      fetchCatalogData();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-background rounded-[40px] w-full max-w-4xl max-h-[90vh] shadow-2xl shadow-navy/20 border border-white/20 relative overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-foreground/5 flex items-center justify-between bg-foreground/[0.01]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center shadow-inner">
              <Package size={24} className="text-navy" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-primary tracking-tight">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              <p className="text-secondary font-medium text-sm">Gestiona la información base y variantes.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-foreground/5 text-secondary transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-8 pt-4 flex gap-8 border-b border-foreground/5 bg-foreground/[0.01]">
          <button 
            onClick={() => setActiveTab('info')}
            className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${
              activeTab === 'info' ? 'text-navy' : 'text-secondary hover:text-primary'
            }`}
          >
            Información General
            {activeTab === 'info' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-navy rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('variants')}
            disabled={!editingProduct}
            className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative disabled:opacity-30 ${
              activeTab === 'variants' ? 'text-navy' : 'text-secondary hover:text-primary'
            }`}
          >
            Variantes ({editingProduct?.variants?.length || 0})
            {activeTab === 'variants' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-navy rounded-full" />}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'info' ? (
            <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Nombre del Producto</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02]"
                    placeholder="Ej. Camiseta Oversize Negra"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Categoría</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02] appearance-none"
                  >
                    {categories.map(cat => (
                      <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Género</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['hombre', 'mujer', 'mixto'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: g })}
                        className={`py-3 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all ${
                          formData.gender === g 
                            ? 'bg-navy text-white border-navy shadow-lg shadow-navy/20' 
                            : 'bg-background text-secondary border-foreground/10 hover:border-navy/30'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Descripción</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02] resize-none"
                    placeholder="Describe los materiales, ajuste y detalles del producto..."
                  />
                </div>

                <div className="p-6 rounded-3xl bg-navy/5 border border-navy/10 flex items-center justify-between">
                  <div>
                    <p className="font-black text-navy text-sm">Estado de Visibilidad</p>
                    <p className="text-secondary text-xs font-medium">Define si el producto será público.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                    className={`w-14 h-8 rounded-full p-1 transition-all ${formData.isPublic ? 'bg-navy' : 'bg-foreground/20'}`}
                  >
                    <div className={`w-6 h-6 rounded-full bg-white transition-all transform ${formData.isPublic ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              {isAddingVariant || editingVariant ? (
                <div className="bg-foreground/[0.01] rounded-[32px] p-8 border border-foreground/5 shadow-inner">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-black text-primary flex items-center gap-2">
                      <Layers size={20} className="text-navy" />
                      {editingVariant ? 'Editar Variante' : 'Nueva Variante'}
                    </h4>
                    <button 
                      onClick={() => { setIsAddingVariant(false); setEditingVariant(null); }}
                      className="p-2 rounded-xl hover:bg-foreground/10 text-secondary transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <VariantForm 
                    editingVariant={editingVariant}
                    onSubmit={handleSaveVariant}
                    onCancel={() => { setIsAddingVariant(false); setEditingVariant(null); }}
                    loading={isSaving}
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-black text-primary">Variantes Registradas</h4>
                    <button
                      onClick={() => setIsAddingVariant(true)}
                      className="px-6 py-3 rounded-2xl bg-navy/10 text-navy font-bold text-sm hover:bg-navy hover:text-white transition-all flex items-center gap-2"
                    >
                      <Plus size={16} /> Agregar Variante
                    </button>
                  </div>

                  {editingProduct?.variants?.length === 0 ? (
                    <div className="py-20 text-center space-y-4 border-2 border-dashed border-foreground/5 rounded-[40px]">
                      <div className="w-20 h-20 rounded-[32px] bg-foreground/5 flex items-center justify-center mx-auto text-secondary/30">
                        <Layers size={40} />
                      </div>
                      <p className="text-secondary font-medium">Este producto aún no tiene variantes.<br/>Agrega una para poder venderlo.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {editingProduct?.variants?.map((v: any) => (
                        <div key={v.variantId} className="group bg-background border border-foreground/5 p-4 rounded-3xl flex items-center gap-6 hover:border-navy/20 hover:shadow-xl hover:shadow-navy/5 transition-all">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-foreground/5 shrink-0 border border-foreground/5 shadow-sm">
                            {v.images?.[0] ? (
                              <img src={v.images[0].content} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-secondary/30"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Nombre / SKU</p>
                              <p className="font-black text-primary text-sm truncate">{v.name}</p>
                              <p className="text-[10px] font-bold text-secondary truncate">{v.sku}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Color / Talla</p>
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-navy/20" />
                                <p className="font-bold text-primary text-sm">{v.color} - {v.size}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Precio</p>
                              <p className="font-black text-navy text-sm">${Number(v.price).toLocaleString()}</p>
                            </div>
                            <div className="flex justify-end items-center gap-2 pr-2">
                              <button 
                                onClick={() => setEditingVariant(v)}
                                className="p-2.5 rounded-xl bg-foreground/5 text-secondary hover:bg-navy hover:text-white transition-all shadow-sm"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteVariant(v.variantId)}
                                className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-foreground/5 bg-foreground/[0.01] flex gap-4 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 rounded-2xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 transition-all active:scale-95"
          >
            Cerrar
          </button>
          {activeTab === 'info' && (
            <button
              type="submit"
              form="product-form"
              disabled={isSaving}
              className="px-12 py-4 rounded-2xl bg-navy text-white font-black hover:bg-navy/90 disabled:opacity-50 transition-all shadow-xl shadow-navy/20 active:scale-[0.98] flex items-center gap-2"
            >
              {isSaving ? 'Guardando...' : editingProduct ? 'Actualizar Producto' : 'Guardar y Continuar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
