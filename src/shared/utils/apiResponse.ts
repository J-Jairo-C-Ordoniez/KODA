/**
 * Estandariza la respuesta de la API para mantener consistencia con los hooks.
 * @param success Indica si la operación fue exitosa.
 * @param data Los datos resultantes de la operación.
 * @param error Mensaje de error en caso de fallo.
 */
export const apiResponse = (success: boolean, data: any = null, error: string | null = null) => {
  return {
    success,
    data,
    error,
  };
};
