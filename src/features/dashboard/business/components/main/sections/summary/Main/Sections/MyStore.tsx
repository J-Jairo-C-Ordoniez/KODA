'use client';

import { useState, useEffect } from 'react';
import { LoaderCircle } from "lucide-react";
import { StoreDataStats } from '@/features/dashboard/business/api/dashboard.api';
import useTabStats from "@/features/dashboard/business/hooks/useTabStats";
import Loader from "@/shared/components/Loader";
import Error from "@/shared/components/Error";
import StoreSubscriptionCard from '@/features/dashboard/business/components/main/sections/summary/Main/ui/StoreSubscriptionCard';
import StoreProfileCard from '@/features/dashboard/business/components/main/sections/summary/Main/ui/StoreProfileCard';
import Button from '@/shared/components/Button';

export default function MyStore({ activeTab }: { activeTab: string }) {
    const { data, isLoading, error, updateStoreProfile, isSaving } = useTabStats<StoreDataStats>(activeTab);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        businessName: data?.profile.businessName || '',
        description: data?.profile.description || "",
        whatsApp: data?.profile.whatsApp,
        slug: data?.profile.slug,
        logo: data?.profile.logo,
    });

    const handleSave = async () => {
        const ok = await updateStoreProfile(formData);

        if (ok) {
            setIsEditing(false);
        }
    };

    useEffect(() => {
        if (data) {
            setFormData({
                businessName: data.profile.businessName,
                description: data.profile.description || "",
                whatsApp: data.profile.whatsApp,
                slug: data.profile.slug,
                logo: data.profile.logo
            });
        }
    }, [data]);

    return (
        <section className="space-y-6 animate-in fade-in duration-500">
            <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Mi Tienda
                    </h2>
                    <p className="text-gray-500 text-base mt-1 max-w-2xl">
                        Administra la identidad de tu marca, tu catálogo público y el estado de tu suscripción en la plataforma.
                    </p>
                </div>

                {data && (
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <Button
                                    onClick={() => setIsEditing(false)}
                                    variant="secondary"
                                    disabled={isSaving}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    variant="primary"
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <>
                                            <LoaderCircle size={16} className="animate-spin" />
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            Guardar cambios
                                        </>
                                    )}
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => setIsEditing(true)}
                                variant='primary'
                            >
                                Editar Perfil
                            </Button>
                        )}
                    </div>
                )}
            </header>

            {isLoading && !data && <Loader />}
            {error && <Error message={error} />}

            {data && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <StoreProfileCard
                        formData={formData}
                        setFormData={setFormData}
                        isEditing={isEditing}
                    />
                    <StoreSubscriptionCard subscription={data.subscription} />
                </div>
            )}
        </section>
    );
}