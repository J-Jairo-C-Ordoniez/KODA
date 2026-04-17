import { useState, useCallback } from 'react';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/categories');
      const json = await response.json();
      if (json.success) setCategories(json.data);
      else setError(json.error || 'Error al cargar categorías');
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveCategory = async (name, editingCategory = null) => {
    setIsSaving(true);
    
    try {
      const url = editingCategory ? `/api/categories/${editingCategory.categoryId}` : '/api/categories';
      const method = editingCategory ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      const json = await response.json();
      if (json.success) {
        await fetchCategories();
        return { success: true };
      } else {
        return { success: false, error: json.error || 'Error al guardar' };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión al guardar' };
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/categories/${categoryId}`, { method: 'DELETE' });
      const json = await response.json();
      if (json.success) {
        await fetchCategories();
        return { success: true };
      } else {
        return { success: false, error: json.error || 'Error al eliminar la categoría' };
      }
    } catch (err) {
      return { success: false, error: 'No se pudo conectar con el servidor para eliminar la categoría' };
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    categories,
    isLoading,
    error,
    setError,
    isSaving,
    isDeleting,
    fetchCategories,
    saveCategory,
    deleteCategory
  };
}
