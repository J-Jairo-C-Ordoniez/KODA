"use client";

import { useState, useEffect } from 'react';
import { X, Layers, Check } from 'lucide-react';
import VariantForm from './ui/VariantForm';
import Modal from '../categories/ui/Modal';

interface VariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  editingVariant?: any;
  loading?: boolean;
  size?: 'md' | 'lg' | 'xl' | '2xl';
}

export default function VariantModal({ isOpen, onClose, onSubmit, editingVariant, loading, size = 'md' }: VariantModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={size}
      title={editingVariant ? 'Editar Variante' : 'Nueva Variante'}
      description={editingVariant ? 'Actualiza los detalles de esta variante.' : 'Define el color, talla, precio y stock inicial.'}
      icon={<Layers size={32} className="text-navy" />}
    >
      <div className="pt-2">
        <VariantForm 
          editingVariant={editingVariant}
          onSubmit={onSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </div>
    </Modal>
  );
}
