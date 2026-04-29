import authService from "@/core/modules/auth/services/auth.service";
import { apiResponse } from "@/core/utils/apiResponse";

const authController = {
  async register(data: any) {
    try {
      const { email, password, name, role } = data;
      const user = await authService.registerUser(email, password, name, role);
      return apiResponse.success(user, 201);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  },

  async login(data: any) {
    try {
      const { email, password } = data;
      const user = await authService.authenticateUser(email, password);
      return apiResponse.success(user);
    } catch (error: any) {
      return apiResponse.error(error.message, 401);
    }
  },

  async requestReset(data: any) {
    try {
      const { email } = data;
      const result = await authService.requestPasswordReset(email);
      return apiResponse.success(result);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  },

  async verifyCode(data: any) {
    try {
      const { email, code } = data;
      const result = await authService.verifyResetCode(email, code);
      return apiResponse.success(result);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  },

  async resetPassword(data: any) {
    try {
      const { email, password } = data;
      const result = await authService.resetPassword(email, password);
      return apiResponse.success(result);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  }
};

export default authController;