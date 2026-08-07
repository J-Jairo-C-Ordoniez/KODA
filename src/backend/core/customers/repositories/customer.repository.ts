import prisma from '@/infrastructure/db/client';
import { PaginationOptions } from '@/backend/core/sales/repositories/sales.repository';
import { CreateCustomerDTO, UpdateCustomerDTO, CustomerPaymentDTO } from '../types';
import { PaymentMethod } from '@prisma/client';

const customerRepository = {
  async getCustomersByTenant(tenantId: string, { page = 1, limit = 50 }: PaginationOptions = {}) {
    const skip = (page - 1) * limit;
    return prisma.customer.findMany({
      where: { tenantId },
      select: {
        customerId: true,
        name: true,
        phone: true,
        totalDebt: true,
        createdAt: true,
        _count: {
          select: { sales: true, payments: true },
        },
      },
      orderBy: { totalDebt: 'desc' },
      skip,
      take: limit,
    });
  },

  async createCustomer(tenantId: string, data: CreateCustomerDTO) {
    return prisma.customer.create({
      data: { tenantId, name: data.name, phone: data.phone },
    });
  },

  async registerPayment(
    tenantId: string,
    customerId: string,
    data: CustomerPaymentDTO
  ) {
    return prisma.$transaction(
      async (tx) => {
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
            paymentMethod: data.paymentMethod as PaymentMethod,
            note: data.note,
          },
        });
      },
      {
        maxWait: 10000,
        timeout: 20000,
      }
    );
  },

  async getCustomersWithDebt(tenantId: string) {
    const result = await prisma.customer.aggregate({
      where: {
        tenantId,
        totalDebt: {
          gt: 0,
        },
      },
      _sum: {
        totalDebt: true,
      },
      _count: {
        tenantId: true,
      },
    });

    return {
      totalCustomersWithDebt: result._count.tenantId || 0,
      totalDebt: result._sum.totalDebt || 0,
    };
  },

  async getTopDebtors(tenantId: string) {
    const customers = await prisma.customer.findMany({
      where: {
        tenantId,
        totalDebt: {
          gt: 0,
        },
      },
      select: {
        customerId: true,
        name: true,
        phone: true,
        totalDebt: true,
        sales: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
          select: {
            createdAt: true,
          },
        },
      },
      orderBy: {
        totalDebt: 'desc',
      },
      take: 5,
    });

    const today = new Date();

    return customers.map((customer) => {
      const lastSale = customer.sales[0]?.createdAt;

      const daysPending = lastSale
        ? Math.floor((today.getTime() - lastSale.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

      return {
        id: customer.customerId,
        name: customer.name,
        phone: customer.phone,
        totalDebt: Number(customer.totalDebt),
        daysPending,
        isOverdue: daysPending > 30,
      };
    });
  },

  async updateCustomer(tenantId: string, customerId: string, data: UpdateCustomerDTO) {
    return prisma.customer.update({
      where: { customerId, tenantId },
      data: {
        ...(data.name ? { name: data.name } : {}),
        ...(data.phone ? { phone: data.phone } : {}),
      },
    });
  },

  async deleteCustomer(tenantId: string, customerId: string) {
    return prisma.$transaction(async (tx) => {
      const customer = await tx.customer.findFirst({
        where: { customerId, tenantId },
        select: { totalDebt: true },
      });
      if (!customer) throw new Error('Cliente no encontrado');
      if (Number(customer.totalDebt) > 0) {
        throw new Error('No se puede eliminar un cliente con deuda pendiente');
      }
      return tx.customer.delete({ where: { customerId } });
    });
  },

  async getCustomerHistory(tenantId: string, customerId: string) {
    const customer = await prisma.customer.findFirst({
      where: { customerId, tenantId },
      select: { customerId: true, name: true, phone: true, totalDebt: true, createdAt: true },
    });

    if (!customer) throw new Error('Cliente no encontrado');

    const [sales, payments] = await Promise.all([
      prisma.sale.findMany({
        where: { tenantId, customerId },
        select: {
          saleId: true,
          total: true,
          paymentMethod: true,
          createdAt: true,
          items: {
            select: {
              quantity: true,
              priceAtSale: true,
              variant: {
                select: {
                  name: true,
                  product: { select: { name: true } }
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'asc' },
      }),
      prisma.payment.findMany({
        where: { tenantId, customerId },
        select: {
          paymentId: true,
          amount: true,
          paymentMethod: true,
          createdAt: true,
          note: true,
        },
        orderBy: { createdAt: 'asc' },
      }),
    ]);

    type HistoryEvent = {
      id: string;
      type: 'charge' | 'abono';
      amount: number;
      paymentMethod: string;
      createdAt: string;
      note?: string;
      items?: Array<{
        name: string;
        quantity: number;
        price: number;
      }>;
    };

    const events: HistoryEvent[] = [];

    sales.forEach((sale) => {
      events.push({
        id: sale.saleId,
        type: 'charge',
        amount: Number(sale.total),
        paymentMethod: sale.paymentMethod,
        createdAt: sale.createdAt.toISOString(),
        note: sale.paymentMethod === 'debt' ? 'Compra a crédito (Fiado)' : 'Compra al contado',
        items: sale.items.map((item) => ({
          name: `${item.variant.product.name} - ${item.variant.name}`,
          quantity: item.quantity,
          price: Number(item.priceAtSale),
        })),
      });
    });

    payments.forEach((payment) => {
      events.push({
        id: payment.paymentId,
        type: 'abono',
        amount: Number(payment.amount),
        paymentMethod: payment.paymentMethod,
        createdAt: payment.createdAt.toISOString(),
        note: payment.note || 'Abono a deuda',
      });
    });

    events.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    let runningDebt = 0;
    const timelineWithBalance = events.map((ev) => {
      if (ev.type === 'charge' && ev.paymentMethod === 'debt') {
        runningDebt += ev.amount;
      } else if (ev.type === 'abono') {
        runningDebt -= ev.amount;
      }
      return {
        ...ev,
        balanceAfter: Math.max(0, runningDebt),
      };
    });

    timelineWithBalance.reverse();

    return {
      customer: {
        customerId: customer.customerId,
        name: customer.name,
        phone: customer.phone,
        totalDebt: Number(customer.totalDebt),
        createdAt: customer.createdAt.toISOString(),
      },
      timeline: timelineWithBalance,
    };
  },

  async getSevereDebtsCount(tenantId: string): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return prisma.customer.count({
      where: {
        tenantId,
        totalDebt: { gt: 0 },
        OR: [
          { payments: { none: {} } },
          { payments: { none: { createdAt: { gte: thirtyDaysAgo } } } },
        ],
      },
    });
  },

  async getPaymentsToday(tenantId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const result = await prisma.payment.aggregate({
      where: {
        tenantId,
        createdAt: { gte: startOfDay, lte: endOfDay },
      },
      _sum: { amount: true },
      _count: { paymentId: true },
    });

    return {
      totalRevenue: Number(result._sum.amount ?? 0),
      totalPayments: result._count.paymentId ?? 0,
    };
  },

  async addDebt(tenantId: string, customerId: string, amount: number) {
    return prisma.customer.update({
      where: { customerId, tenantId },
      data: { totalDebt: { increment: amount } },
    });
  },
};

export default customerRepository;