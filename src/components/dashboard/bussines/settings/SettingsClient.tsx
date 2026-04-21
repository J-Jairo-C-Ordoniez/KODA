'use client';

import React, { useEffect } from 'react';
import Header from '../main/ui/Header';
import MainSettings from './ui/mainSettings';
import { useSettings } from '@/hooks/useSettings';

export default function SettingsPage() {
    const {
        aboutUs,
        policy,
        isLoading,
        error,
        fetchSettingsData,
        savePolicyAction,
        saveAboutUsAction
    } = useSettings();

    useEffect(() => {
        fetchSettingsData();
    }, [fetchSettingsData]);

    if (isLoading || error) {
        return (
            <main className="h-full flex-1 flex justify-center py-20">
                <p className="animate-pulse text-md font-medium tracking-wider text-secondary">
                    {error ? error : "Cargando información..."}
                </p>
            </main>
        );
    }

    return (
        <main className="h-full flex-1 overflow-y-auto transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-10">
            <div className="space-y-6 pt-2">
                <Header
                    title="Ajustes"
                    description="Gestiona el contenido público y las políticas de la tienda."
                />

                <MainSettings
                    initialAboutUs={aboutUs}
                    initialPolicy={policy}
                    savePolicyAction={savePolicyAction}
                    saveAboutUsAction={saveAboutUsAction}
                />
            </div>
        </main>
    );
}