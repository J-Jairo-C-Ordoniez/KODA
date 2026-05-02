'use client';

import { useState } from 'react';
import { Info, ShieldCheck } from 'lucide-react';
import AboutForm from './about';
import PolicyForm from './polices';

export default function MainSettings({ initialAboutUs, initialPolicy, saveAboutUsAction, savePolicyAction }) {
    const [activeTab, setActiveTab] = useState('about');
    const [message, setMessage] = useState({ type: '', text: '' });

    const tabs = [
        { id: 'about', label: 'Nosotros', icon: Info },
        { id: 'policy', label: 'Políticas', icon: ShieldCheck },
    ];

    const showNotification = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    return (
        <section className="flex flex-col md:flex-row gap-8 items-start w-full">
            <aside className="w-full md:w-64 flex flex-col gap-2 shrink-0">
                {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer
                            ${activeTab === id
                                ? 'bg-primary text-foreground shadow-lg shadow-primary/20'
                                : 'text-secondary hover:bg-primary/5 hover:text-primary'}`}
                    >
                        <Icon className="h-4 w-4 shrink-0" />
                        {label}
                    </button>
                ))}

                {message.text && (
                    <div className={`mt-6 p-4 rounded-2xl text-[10px] font-bold uppercase tracking-tighter animate-in fade-in slide-in-from-top-2
                        ${message.type === 'success' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
                        {message.text}
                    </div>
                )}
            </aside>

            <article className="flex-1 w-full">
                {activeTab === 'about' ? (
                    <AboutForm
                        initialData={initialAboutUs}
                        saveAction={saveAboutUsAction}
                        onNotify={showNotification}
                    />
                ) : (
                    <PolicyForm
                        initialData={initialPolicy}
                        saveAction={savePolicyAction}
                        onNotify={showNotification}
                    />
                )}
            </article>
        </section>
    );
}