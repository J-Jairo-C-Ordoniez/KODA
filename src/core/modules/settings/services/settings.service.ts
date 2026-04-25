import settingsRepository from '../repositories/settings.repository';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const settingsService = {
  async getSettings(tenantId: string) {
    if (!tenantId) throw new Error('Tenant ID requerido');
    return settingsRepository.getTenantSettings(tenantId);
  },

  async updateTenant(tenantId: string, data: any) {
    return settingsRepository.updateTenantInfo(tenantId, data);
  },

  async uploadLogo(tenantId: string, file: File) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: `koda/${tenantId}/logo`,
      transformation: [{ width: 400, height: 400, crop: 'limit' }],
    });

    await settingsRepository.upsertAboutUs(tenantId, { logo: result.secure_url });
    return { url: result.secure_url };
  },

  async updateSocialLinks(tenantId: string, socialLinks: any) {
    return settingsRepository.upsertAboutUs(tenantId, { socialLinks });
  },
};

export default settingsService;
