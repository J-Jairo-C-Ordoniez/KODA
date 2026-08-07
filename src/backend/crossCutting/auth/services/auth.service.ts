import bcrypt from 'bcryptjs';
import authRepository from '../repositories/auth.repository';
import { emailService } from '@/backend/core/utils/email.service';

const authService = {
  async registerUser(email: string, password: string, name: string, role: string) {
    const user = await authRepository.getUserByEmail(email);
    if (user) {
      throw new Error('Ya existe una cuenta asociada a este correo electrónico.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authRepository.createUser({
      email,
      password: hashedPassword,
      name,
      role: role as string
    });

    return newUser;
  },
  
  async authenticateUser(email: string, password: string) {
    const user = await authRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('No se encontró ninguna cuenta asociada a este correo electrónico.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('La contraseña ingresada es incorrecta. Por favor, intenta de nuevo.');
    }

    return user;
  },

  async requestPasswordReset(email: string) {
    const user = await authRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('No se encontró ninguna cuenta asociada a este correo electrónico.');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = await bcrypt.hash(code, 10);

    const deadLine = new Date();
    deadLine.setHours(deadLine.getHours() + 1);

    await authRepository.createCode({
      userId: user.userId,
      code: hashedCode,
      type: 'reset',
      deadLine: deadLine
    });

    await emailService.sendPasswordResetCode(email, code);

    return { success: true, message: 'Código enviado al correo' };
  },

  async verifyResetCode(email: string, code: string) {
    const user = await authRepository.getUserByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const latestCode = await authRepository.getLatestCodeByUserId(user.userId, 'reset');

    if (!latestCode) throw new Error('No se encontró un código de recuperación');

    const now = new Date();
    const dbDeadline = new Date(latestCode.deadLine);

    if (now > dbDeadline) {
      throw new Error('El código ha expirado');
    }

    const isValid = await bcrypt.compare(code, latestCode.code);
    if (!isValid) throw new Error('El código ingresado es incorrecto o ha expirado. Por favor, solicita uno nuevo.');

    return { success: true, userId: user.userId };
  },

  async resetPassword(email: string, newPassword: string) {
    const user = await authRepository.getUserByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await authRepository.updateUserPassword(user.userId, hashedPassword);

    await authRepository.deleteUserCodes(user.userId);

    return { success: true, message: 'Contraseña actualizada con éxito' };
  }
}

export default authService;