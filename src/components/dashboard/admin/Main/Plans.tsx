'use client';

import { useState } from 'react';
import { Package, Plus, Search, X, Edit3, Trash2, Check, Info } from 'lucide-react';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import Loader from '@/components/ui/Loader';
import Metric from '@/components/dashboard/admin/Main/ui/Metric';
import Table from '@/components/dashboard/admin/Main/ui/Table';
import { usePlans } from '@/hooks/superAdmin/usePlans';
import { useToast, Toaster } from '@/components/ui/Toast';

export default function Plans() {
  const { plans, isLoading, error, createPlan, updatePlan, deletePlan } = usePlans();
  const { toasts, removeToast, showToast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    interval: 'mes',
    feature: ['']
  });

  const filteredPlans = plans.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (plan: any = null) => {
    if (plan) {
      setSelectedPlan(plan);
      setFormData({
        name: plan.name,
        description: plan.description,
        price: plan.price.toString(),
        interval: plan.interval,
        feature: plan.feature.length > 0 ? plan.feature : ['']
      });
    } else {
      setSelectedPlan(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        interval: 'mes',
        feature: ['']
      });
    }
    setIsModalOpen(true);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.feature];
    newFeatures[index] = value;
    setFormData({ ...formData, feature: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, feature: [...formData.feature, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.feature.filter((_, i) => i !== index);
    setFormData({ ...formData, feature: newFeatures.length > 0 ? newFeatures : [''] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanFeatures = formData.feature.filter(f => f.trim() !== '');
    const data = { ...formData, feature: cleanFeatures };

    let res;
    if (selectedPlan) {
      res = await updatePlan(selectedPlan.planId, data);
    } else {
      res = await createPlan(data);
    }

    if (res.success) {
      setIsModalOpen(false);
    } else {
      showToast('error', 'Error', res.error);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este plan?')) {
      await deletePlan(id);
    }
  };

  return (
    <main className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 pb-24 relative">
      <Toaster toasts={toasts} removeToast={removeToast} />
      <SectionHeader title="Gestión de Planes">
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-contrast text-white font-bold rounded-2xl hover:bg-contrast-hover transition-all shadow-lg shadow-contrast/20"
        >
          <Plus size={20} />
          Nuevo Plan
        </button>
      </SectionHeader>

      {isLoading && <Loader />}
      
      {!isLoading && !error && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Metric
              stat={{
                label: 'Planes Activos',
                value: plans.length.toString().padStart(2, '0'),
                icon: Package,
                color: 'bg-contrast/10 text-contrast'
              }}
            />
            <Metric
              stat={{
                label: 'Suscripción Promedio',
                value: `$${(plans.reduce((acc, p) => acc + Number(p.price), 0) / (plans.length || 1)).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
                icon: Check,
                color: 'bg-green-500/10 text-green-500'
              }}
            />
            <Metric
              stat={{
                label: 'Más Popular',
                value: plans.length > 0 ? plans[0].name : 'N/A',
                icon: Info,
                color: 'bg-blue-500/10 text-blue-500'
              }}
            />
          </div>

          <div className="bg-background-elevated border border-foreground/8 p-6 lg:p-8 rounded-[32px]">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h3 className="text-xl font-black text-primary tracking-tight">Lista de Planes</h3>
                <p className="text-foreground-muted text-sm font-medium mt-1">Configura los precios y beneficios del sistema.</p>
              </div>

              <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-contrast transition-colors" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar plan..."
                  className="w-full pl-12 pr-4 py-3.5 bg-background border border-foreground/10 rounded-2xl focus:ring-2 focus:ring-contrast/20 focus:border-contrast outline-none transition-all font-medium placeholder:text-secondary/80 text-sm"
                />
              </div>
            </header>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-secondary text-[11px] font-black uppercase tracking-widest px-4">
                    <th className="pb-4 pl-6">Nombre</th>
                    <th className="pb-4">Precio</th>
                    <th className="pb-4">Intervalo</th>
                    <th className="pb-4">Características</th>
                    <th className="pb-4 pr-6 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlans.map((plan) => (
                    <tr key={plan.planId} className="group bg-foreground/2 hover:bg-foreground/[0.04] transition-all">
                      <td className="py-5 pl-6 rounded-l-2xl border-y border-l border-foreground/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-contrast/10 flex items-center justify-center text-contrast font-bold">
                            {plan.name.charAt(0)}
                          </div>
                          <div>
                            <span className="block font-bold text-primary">{plan.name}</span>
                            <span className="block text-xs text-secondary font-medium">{plan.description.substring(0, 30)}...</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 border-y border-foreground/5">
                        <span className="font-bold text-primary">${Number(plan.price).toLocaleString('en-US')}</span>
                      </td>
                      <td className="py-5 border-y border-foreground/5">
                        <span className="px-3 py-1 bg-foreground/5 rounded-lg text-xs font-bold text-secondary uppercase tracking-tight">
                          {plan.interval}
                        </span>
                      </td>
                      <td className="py-5 border-y border-foreground/5">
                        <span className="text-xs font-medium text-secondary">{plan.feature.length} beneficios</span>
                      </td>
                      <td className="py-5 pr-6 rounded-r-2xl border-y border-r border-foreground/5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleOpenModal(plan)}
                            className="p-2 hover:bg-contrast/10 text-secondary hover:text-contrast transition-all rounded-xl"
                            title="Editar"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(plan.planId)}
                            className="p-2 hover:bg-red-500/10 text-secondary hover:text-red-500 transition-all rounded-xl"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-background-elevated border border-foreground/10 rounded-[32px] p-8 w-full max-w-2xl shadow-2xl relative my-8">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-secondary hover:text-primary transition-colors bg-foreground/5 rounded-full hover:bg-foreground/10"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black text-primary mb-2">
              {selectedPlan ? "Editar Plan" : "Nuevo Plan de Suscripción"}
            </h2>
            <p className="text-sm text-foreground-muted mb-6">
              Define los beneficios y el costo para los negocios.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Nombre del Plan</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3.5 bg-background border border-foreground/10 rounded-2xl text-primary font-bold focus:border-contrast outline-none"
                    placeholder="Ej. Básico, Pro, Premium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Precio</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                    <input 
                      type="number" 
                      required
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full pl-12 pr-4 py-3.5 bg-background border border-foreground/10 rounded-2xl text-primary font-bold focus:border-contrast outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Descripción Corta</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3.5 bg-background border border-foreground/10 rounded-2xl text-primary font-medium focus:border-contrast outline-none resize-none"
                  rows={2}
                  placeholder="Describe brevemente el plan..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Intervalo de Cobro</label>
                <div className="flex gap-4">
                  {['mes', 'anual'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({...formData, interval: opt})}
                      className={`flex-1 py-3.5 rounded-2xl font-bold border transition-all ${
                        formData.interval === opt 
                          ? 'bg-contrast/10 border-contrast text-contrast' 
                          : 'bg-background border-foreground/10 text-secondary hover:border-foreground/20'
                      }`}
                    >
                      {opt === 'mes' ? 'Mensual' : 'Anual'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Beneficios y Características</label>
                  <button 
                    type="button"
                    onClick={addFeature}
                    className="text-xs font-bold text-contrast hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} /> Añadir otro
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.feature.map((feat, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" 
                        value={feat}
                        onChange={e => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-background border border-foreground/10 rounded-xl text-primary text-sm focus:border-contrast outline-none"
                        placeholder="Ej. Soporte 24/7, Reportes VIP..."
                      />
                      {formData.feature.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-3 text-secondary hover:text-red-500 bg-foreground/5 rounded-xl transition-all"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 mt-4 bg-contrast text-white font-bold rounded-2xl hover:bg-contrast-hover transition-colors shadow-lg shadow-contrast/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader /> : <>{selectedPlan ? 'Guardar Cambios' : 'Crear Plan'}</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
