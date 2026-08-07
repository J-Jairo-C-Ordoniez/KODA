import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
} as any);

export const emailService = {
  async sendPasswordResetCode(to: string, code: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn(`[EMAIL WARNING] SMTP credentials not fully configured in .env. Falling back to console log.`);
      console.log(`[EMAIL DEV MODE] Enviando código de recuperación a: ${to} - Código: ${code}`);
      return { success: true, message: 'Simulated email sent locally' };
    }

    try {
      const info = await transporter.sendMail({
        from: `"Koda Team" <${process.env.SMTP_USER}>`,
        to: to,
        subject: "Código de Recuperación de Contraseña",
        text: `Tu código de recuperación es: ${code}. Este código expirará en 1 hora.`,
        html: `
          <div style="font-family: Arial, sans-serif; p-4">
            <h2 style="color: #333;">Recuperación de Contraseña</h2>
            <p>Has solicitado restablecer tu contraseña en Koda. Utiliza el siguiente código para continuar:</p>
            <div style="background-color: #f4f4f4; padding: 10px 20px; font-size: 24px; font-weight: bold; letter-spacing: 5px; display: inline-block; margin: 20px 0;">
              ${code}
            </div>
            <p>Este código es válido por <strong>1 hora</strong>. Si no solicitaste este cambio, puedes ignorar este correo.</p>
            <br/>
            <p>Atentamente,<br/>Equipo Koda</p>
          </div>
        `,
      });

      return { success: true };
    } catch (error: any) {
      throw new Error("No se pudo enviar el correo electrónico.");
    }
  }
};
