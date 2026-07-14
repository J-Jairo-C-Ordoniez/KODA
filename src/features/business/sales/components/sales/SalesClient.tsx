'use client';

import React, { useState, useEffect } from 'react';
import Header from '../ui/Header';
import Modal from '../categories/ui/Modal';
import SalesHeader from './ui/SalesHeader';
import { SalesTable } from './ui/SalesTable';
import SaleForm from './ui/SaleForm';
import ActionDialog from '../categories/ui/ActionDialog';
import { useSession } from 'next-auth/react';
import { useSales } from '@/hooks/employee/useSales';
import InvoiceModal from './ui/InvoiceModal';

export default function SalesClient() {
    const { data: session } = useSession();
    const tenantId = session?.user?.tenantId;

    const {
        sales,
        variants,
        isLoading: loading,
        isSaving: submitting,
        page,
        hasMore,
        fetchSalesData: fetchData,
        saveSale
    } = useSales(tenantId);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSaleId, setNewSaleId] = useState<string | null>(null);
    const [selectedSaleForInvoice, setSelectedSaleForInvoice] = useState<any>(null);
    const [alertConfig, setAlertConfig] = useState({ isOpen: false, title: '', message: '', variant: 'primary', type: 'alert' });

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSaleSubmit = async (data) => {
        const result = await saveSale(data);

        if (result.success) {
            setIsModalOpen(false);
            if (result.data?.saleId) {
                setNewSaleId(result.data.saleId);
                setTimeout(() => setNewSaleId(null), 5000);
            }
            setAlertConfig({
                isOpen: true,
                title: 'Éxito',
                message: 'Venta registrada correctamente e inventario actualizado.',
                variant: 'success',
                type: 'success'
            });
        } else {
            setAlertConfig({
                isOpen: true,
                title: 'Error',
                message: result.error,
                variant: 'danger',
                type: 'alert'
            });
        }
    };

    const filteredSales = sales.filter(s => {
        const term = searchTerm.toLowerCase();
        if (s.saleId.toString().includes(term)) return true;
        if (s.user?.name?.toLowerCase().includes(term)) return true;
        if (s.customer?.name?.toLowerCase().includes(term)) return true;
        return s.items?.some((item: any) =>
            item.variant?.product?.name?.toLowerCase().includes(term) ||
            item.variant?.name?.toLowerCase().includes(term)
        );
    });

    if (loading && sales.length === 0) {
        return (
            <main className="h-full flex-1 flex justify-center py-20">
                <p className="animate-pulse text-md font-medium tracking-wider text-secondary">
                    Cargando historial de ventas...
                </p>
            </main>
        );
    }

    return (
        <main className="h-full flex-1 overflow-y-auto transition-all duration-300 px-4 sm:px-8 pt-6 pb-12">
            <div className="container mx-auto space-y-8">
                <Header
                    title="Ventas"
                    description="Historial completo de transacciones y registro de nuevas ventas."
                />

                <section className="bg-background border border-foreground/5 rounded-3xl p-4 sm:p-8 flex flex-col gap-6 relative shadow-sm">
                    <SalesHeader
                        saleCount={sales.length}
                        onOpenSaleModal={() => setIsModalOpen(true)}
                    />

                    <SalesTable
                        sales={filteredSales}
                        newSaleId={newSaleId}
                        onViewInvoice={setSelectedSaleForInvoice}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        hasMore={hasMore || false}
                        loading={loading}
                        page={page}
                        onPageChange={(newPage) => fetchData(newPage)}
                    />
                </section>
            </div>


            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Registrar Nueva Venta"
            >
                <SaleForm
                    variants={variants}
                    onSubmit={handleSaleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                    submitting={submitting}
                />
            </Modal>

            {alertConfig.isOpen && (
                <Modal
                    isOpen={alertConfig.isOpen}
                    onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                    title={alertConfig.title}
                >
                    <ActionDialog
                        type={alertConfig.type}
                        title={alertConfig.title}
                        message={alertConfig.message}
                        onConfirm={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                        onCancel={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                        variant={alertConfig.variant}
                        confirmText="Aceptar"
                    />
                </Modal>
            )}
            {selectedSaleForInvoice && (
                <InvoiceModal
                    sale={selectedSaleForInvoice}
                    onClose={() => setSelectedSaleForInvoice(null)}
                />
            )}
        </main>
    );
}
