import { Store, Phone, Link2, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function StoreProfileCard({ formData, setFormData, isEditing }: { formData: any, setFormData: any, isEditing: boolean }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <article className="lg:col-span-2 bg-white border border-gray-100 shadow-sm rounded-2xl p-6 transition-all">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                    <Store size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Información Pública</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4 md:col-span-2">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden relative group">
                        {formData.logo ? (
                            <Image src={formData.logo} alt="Logo" width={64} height={64} className="w-full h-full object-cover" />
                        ) : (
                            <Store className="text-gray-400" size={28} />
                        )}
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-[10px] text-white font-bold uppercase tracking-wider">Cambiar</p>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="text-sm text-gray-500 font-medium mb-1 block">Nombre Comercial</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base font-semibold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        ) : (
                            <p className="text-lg font-bold text-gray-900">{formData.businessName}</p>
                        )}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="text-sm text-gray-500 font-medium mb-1 block">Descripción de la tienda</label>
                    {isEditing ? (
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                            placeholder="Añade una descripción para tus clientes..."
                        />
                    ) : (
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {formData.description || "Aún no has agregado una descripción para tus clientes."}
                        </p>
                    )}
                </div>

                <div className={`p-4 rounded-xl border ${isEditing ? 'bg-white border-gray-200' : 'bg-gray-50/50 border-gray-100'}`}>
                    <label className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-2">
                        <Phone size={16} /> WhatsApp Ventas
                    </label>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-medium">+57</span>
                            <input
                                type="text"
                                name="whatsApp"
                                value={formData.whatsApp}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-semibold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    ) : (
                        <p className="font-semibold text-gray-900">+57 {formData.whatsApp}</p>
                    )}
                </div>

                <div className={`p-4 rounded-xl border ${isEditing ? 'bg-white border-gray-200' : 'bg-gray-50/50 border-gray-100'}`}>
                    <label className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-2">
                        <Link2 size={16} /> Enlace del Catálogo
                    </label>
                    {isEditing ? (
                        <div className="flex items-center gap-1">
                            <span className="text-gray-400 text-sm hidden sm:inline">koda.app/</span>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 text-primary font-semibold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    ) : (
                        <Link
                            href={`/${formData.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors break-all"
                        >
                            https://kodaebon.vercel.app/{formData.slug} <ArrowUpRight size={14} />
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}