'use client';

import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

export default function VariantForm({ editingVariant, onSubmit, onCancel, onUploadSuccess, loading, error }) {
    const [imageUrl, setImageUrl] = useState(editingVariant?.image || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.isActive = e.target.isActive.checked;
        data.image = imageUrl;

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                    <p className="text-sm font-medium tracking-wider">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Nombre de la variante
                    </label>
                    <input
                        required
                        name="name"
                        defaultValue={editingVariant?.name}
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent"
                        placeholder="Ej: Negro L"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        SKU
                    </label>
                    <input
                        required
                        name="sku"
                        defaultValue={editingVariant?.sku}
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent"
                        placeholder="TSHIRT-BLK-L"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Color
                    </label>
                    <input
                        required
                        name="color"
                        defaultValue={editingVariant?.color}
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent"
                        placeholder="Negro"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Talla
                    </label>
                    <input
                        required
                        name="size"
                        defaultValue={editingVariant?.size}
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent"
                        placeholder="L"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Precio
                    </label>
                    <input
                        required
                        type="number"
                        step="0.01"
                        name="price"
                        defaultValue={editingVariant?.price}
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent"
                        placeholder="95000"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Imagen de la Variante
                    </label>
                    <div className="flex items-center gap-3">
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="h-12 w-12 object-cover rounded-md border border-secondary/20 shadow-sm"
                            />
                        )}

                        <CldUploadWidget
                            uploadPreset="clothing_upload"
                            onSuccess={(result) => {
                                if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
                                    setImageUrl(result.info.secure_url as string);
                                    if (onUploadSuccess) onUploadSuccess();
                                }
                            }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="text-primary tracking-wider flex-1 border border-secondary/10 p-3 rounded-sm hover:bg-secondary/5 transition-colors flex justify-center items-center"
                                >
                                    {imageUrl ? 'Cambiar Imagen' : 'Subir Foto de Prenda'}
                                </button>
                            )}
                        </CldUploadWidget>
                    </div>
                    <input type="hidden" required name="imageValidation" value={imageUrl} />
                </div>
            </div>

            <div className="flex items-center gap-3 bg-secondary/5 p-4 rounded-lg border border-secondary/10">
                <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    defaultChecked={editingVariant ? editingVariant.isActive : true}
                    className="h-5 w-5 rounded border-secondary/20 text-primary focus:ring-primary shadow-sm cursor-pointer"
                />
                <label htmlFor="isActive" className="text-sm font-bold text-primary/80 cursor-pointer select-none">
                    Variante Activa y Visible en Catálogo
                </label>
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-secondary/10 hover:bg-secondary/20 transition-colors duration-300 text-secondary px-6 py-3 rounded-md cursor-pointer disabled:opacity-50 flex-1"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading || !imageUrl}
                    className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer disabled:opacity-50 flex-1"
                >
                    {loading ? 'Procesando...' : 'Guardar Variante'}
                </button>
            </div>
        </form>
    );
}