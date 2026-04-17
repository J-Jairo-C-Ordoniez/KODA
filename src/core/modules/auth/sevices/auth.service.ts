import bcrypt from 'bcryptjs';
import { AuthRepository } from '../repositories/auth.repository';
import { emailService } from '@/shared/utils/email.service';

export class AuthService {
  constructor() {
    this.repository = new AuthRepository();
  }

  async authenticateUser(email, password) {
    const user = await this.repository.getUserByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  }

  async requestPasswordReset(email) {
    const user = await this.repository.getUserByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = await bcrypt.hash(code, 10);

    const deadLine = new Date();
    deadLine.setHours(deadLine.getHours() + 1);

    await this.repository.createCode({
      userId: user.userId,
      code: hashedCode,
      type: 'reset',
      deadLine: deadLine
    });

    await emailService.sendPasswordResetCode(email, code);

    return { success: true, message: 'Código enviado al correo' };
  }

  async verifyResetCode(email, code) {
    const user = await this.repository.getUserByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const latestCode = await this.repository.getLatestCodeByUserId(user.userId, 'reset');

    if (!latestCode) throw new Error('No se encontró un código de recuperación');

    const now = new Date();
    const dbDeadline = new Date(latestCode.deadLine);

    if (now > dbDeadline) {
      throw new Error('El código ha expirado');
    }

    const isValid = await bcrypt.compare(code, latestCode.code);
    if (!isValid) throw new Error('Código inválido');

    return { success: true, userId: user.userId };
  }

  async resetPassword(email, newPassword) {
    const user = await this.repository.getUserByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.repository.updateUserPassword(user.userId, hashedPassword);

    await this.repository.deleteUserCodes(user.userId);

    return { success: true, message: 'Contraseña actualizada con éxito' };
  async registerBusiness(data) {
    const { businessName, ownerName, email, password, whatsApp } = data;

    // Check if user already exists
    const existingUser = await this.repository.getUserByEmail(email);
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate Slug (basic logic)
    const slug = businessName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // For production, we should check if slug exists and append random chars if so.
    // Simplifying here for now.

    const result = await this.repository.createTenantWithAdmin({
      businessName,
      ownerName,
      email,
      password: hashedPassword,
      whatsApp,
      slug,
      planId: 'plan_emprendedor' // Default plan from seed
    });

    return {
      success: true,
      message: 'Negocio registrado con éxito',
      user: {
        id: result.user.userId,
        email: result.user.email,
        name: result.user.name,
        tenantId: result.user.tenantId,
        role: result.user.role
      }
    };
  }
}
