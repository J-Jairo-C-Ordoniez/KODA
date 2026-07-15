/**
 * Utilidades centralizadas para formateo de datos.
 * Esto asegura consistencia en toda la aplicación (Dashboard, Landing, POS).
 */

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

/**
 * Formatea un número como moneda local (Pesos Colombianos)
 * Ejemplo: 15000 -> "$ 15.000"
 */
export const formatCurrency = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '$ 0';
  return CURRENCY_FORMATTER.format(value);
};

/**
 * Formatea un número como porcentaje
 * Ejemplo: 0.15 -> "15.0%"
 */
export const formatPercentage = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0.0%';
  return PERCENTAGE_FORMATTER.format(value);
};

/**
 * Formatea un número estándar (ej. para cantidades en inventario)
 * Ejemplo: 1500 -> "1.500"
 */
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