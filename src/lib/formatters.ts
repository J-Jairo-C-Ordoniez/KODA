const CURRENCY_FORMATTER = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const PERCENTAGE_FORMATTER = new Intl.NumberFormat('es-CO', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const NUMBER_FORMATTER = new Intl.NumberFormat('es-CO');

export const formatCurrency = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '$ 0';
  return CURRENCY_FORMATTER.format(value);
};

export const formatPercentage = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0%';
  return `${value}%`;
};

export const formatNumber = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0';
  return NUMBER_FORMATTER.format(value);
};

export const dateFormatter = (date: Date): string => {
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};