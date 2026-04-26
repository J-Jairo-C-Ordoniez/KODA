import prisma from '@/infrastructure/db/client';

const customerRepository = {
  async getCustomersByTenant(tenantId: string) {
    return prisma.customer.findMany({
      where: { tenantId },
      include: {
        sales: { orderBy: { createdAt: 'desc' }, take: 10 },
        payments: { orderBy: { createdAt: 'desc' }, take: 20 },
      },
      orderBy: { totalDebt: 'desc' },
    });
  },

  async createCustomer(tenantId: string, data: { name: string; phone: string }) {
    return prisma.customer.create({
      data: { tenantId, name: data.name, phone: data.phone },
    });
  },

  async registerPayment(tenantId: string, customerId: string, data: { amount: number; paymentMethod: string; note?: string }) {
    return prisma.$transaction(async (tx) => {
      const customer = await tx.customer.findFirst({ where: { customerId, tenantId } });
      if (!customer) throw new Error('Cliente no encontrado');

      const amount = Number(data.amount);
      if (amount > Number(customer.totalDebt)) throw new Error('El abono supera la deuda actual');

      await tx.customer.update({
        where: { customerId },
        data: { totalDebt: { decrement: amount } },
      });

      return tx.payment.create({
        data: {
          tenantId,
          customerId,
          amount,
          paymentMethod: data.paymentMethod as any,
          note: data.note,
        },
      });
    });
  },

  async getCustomersWithDebt(tenantId: string) {
    const result = await prisma.customer.aggregate({
      where: {
        tenantId,
        totalDebt: {
          gt: 0
        }
      },
      _count: {
        tenantId: true,
      }
    });

    return { totalCustomersWithDebt: result._count.tenantId || 0 };

  }
};

export default customerRepository;