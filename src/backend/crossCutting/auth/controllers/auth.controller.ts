import authService from "@/backend/crossCutting/auth/services/auth.service";
import { apiResponse } from "@/backend/core/utils/apiResponse";

const authController = {
  async register(data: { email: string; password: string; name: string; role: string }) {
    try {
      const user = await authService.registerUser(data.email, data.password, data.name, data.role);
      return apiResponse.success(user, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al registrar usuario', 400);
    }
  },

  async login(data: { email: string; password: string }) {
    try {
      const user = await authService.authenticateUser(data.email, data.password);
      return apiResponse.success(user);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al autenticar usuario', 401);
    }
  },

  async requestReset(data: { email: string }) {
    try {
      const result = await authService.requestPasswordReset(data.email);
      return apiResponse.success(result);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al solicitar código', 400);
    }
  },

  async verifyCode(data: { email: string; code: string }) {
    try {
      const result = await authService.verifyResetCode(data.email, data.code);
      return apiResponse.success(result);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al verificar código', 400);
    }
  },

  async resetPassword(data: { email: string; password: string }) {
    try {
      const result = await authService.resetPassword(data.email, data.password);
      return apiResponse.success(result);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al restablecer contraseña', 400);
    }
  }
};

export default authController;