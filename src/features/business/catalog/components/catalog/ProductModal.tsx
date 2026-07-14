"use client";

import { useState, useEffect } from 'react';
import { Package, Check } from 'lucide-react';
import { useAdminCatalog } from '@/features/business/catalog/hooks/useAdminCatalog';
import Modal from '../categories/ui/Modal';
import { Toaster, useToast } from '@/shared/components/ui/Toast';
import ProductForm from './ui/ProductForm';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenantId: string | undefined;
  categories: any[];
  editingProduct?: any;
  onSave: (data: any, editingProduct?: any) => Promise<{ success: boolean; error?: string }>;
  isSaving: boolean;
  size?: 'md' | 'lg' | 'xl' | '2xl';
}

export default function ProductModal({ isOpen, onClose, tenantId, categories, editingProduct, onSave, isSaving, size = 'md' }: ProductModalProps) {
  const { toasts, showToast, removeToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    gender: 'mixto',
    isPublic: true
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        description: editingProduct.description || '',
        categoryId: editingProduct.categoryId || '',
        gender: editingProduct.gender || 'mixto',
        isPublic: editingProduct.isPublic ?? true
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
  }, [editingProduct, categories, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await onSave(formData, editingProduct);
      if (result.success) {
        showToast('success', editingProduct ? 'Producto actualizado' : 'Producto creado', 'Los cambios se han guardado correctamente.');
        setTimeout(() => onClose(), 1500);
      } else {
        showToast('error', 'Error', result.error || 'Error al guardar el producto');
      }
    } catch (err) {
      showToast('error', 'Error', 'Error de conexión');
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={size}
      title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
      icon={<Package size={24} className="text-contrast" />}
    >
      <Toaster toasts={toasts} removeToast={removeToast} />
      <ProductForm 
        formData={formData} 
        setFormData={setFormData} 
        categories={categories} 
        isSaving={isSaving} 
        onSubmit={handleSubmit} 
        onClose={onClose} 
        editingProduct={editingProduct} 
      />
    </Modal>
  );
}
