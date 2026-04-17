import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendPasswordResetCode(to, code) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn(`[EMAIL WARNING] SMTP credentials not fully configured in .env. Falling back to console log.`);
      console.log(`[EMAIL DEV MODE] Enviando código de recuperación a: ${to} - Código: ${code}`);
      return { success: true, message: 'Simulated email sent locally' };
    }

    try {
      const info = await this.transporter.sendMail({
        from: `"Moda y Estilo Equipo" <${process.env.SMTP_USER}>`,
        to: to,
        subject: "Código de Recuperación de Contraseña",
        text: `Tu código de recuperación es: ${code}. Este código expirará en 1 hora.`,
        html: `
          <div style="font-family: Arial, sans-serif; p-4">
            <h2 style="color: #333;">Recuperación de Contraseña</h2>
            <p>Has solicitado restablecer tu contraseña en Moda y Estilo. Utiliza el siguiente código para continuar:</p>
            <div style="background-color: #f4f4f4; padding: 10px 20px; font-size: 24px; font-weight: bold; letter-spacing: 5px; display: inline-block; margin: 20px 0;">
              ${code}
            </div>
            <p>Este código es válido por <strong>1 hora</strong>. Si no solicitaste este cambio, puedes ignorar este correo.</p>
            <br/>
            <p>Atentamente,<br/>Equipo Moda y Estilo</p>
          </div>
        `,
      });

      return { success: true };
    } catch (error) {
      throw new Error("No se pudo enviar el correo electrónico.");
    }
  }
}

export const emailService = new EmailService();
