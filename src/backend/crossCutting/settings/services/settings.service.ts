import settingsRepository from '../repositories/settings.repository';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UpdateTenantSettingsDTO {
  businessName?: string;
  description?: string;
  whatsApp?: string;
  type?: string;
  slug?: string;
  socialLinks?: any;
}

const settingsService = {
  async getSettings(tenantId: string) {
    return settingsRepository.getTenantSettings(tenantId);
  },

  async updateTenant(tenantId: string, data: UpdateTenantSettingsDTO) {
    const { socialLinks, ...tenantData } = data;
    
    const cleanTenantData = {
      ...(tenantData.businessName && { businessName: tenantData.businessName }),
      ...(tenantData.description !== undefined && { description: tenantData.description }),
      ...(tenantData.whatsApp && { whatsApp: tenantData.whatsApp }),
      ...(tenantData.type && { type: tenantData.type }),
      ...(tenantData.slug && { slug: tenantData.slug })
    };

    const [updatedTenant] = await Promise.all([
      settingsRepository.updateTenantInfo(tenantId, cleanTenantData),
      socialLinks ? settingsRepository.upsertAboutUs(tenantId, { socialLinks }) : Promise.resolve(null)
    ]);
    
    return updatedTenant;
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
