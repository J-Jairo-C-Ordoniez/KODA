import aboutUsService from '../services/aboutUs.service';
import { apiResponse } from '@/backend/core/utils/apiResponse';

const aboutUsController = {
    async getAboutUs() {
        try {
            const data = await aboutUsService.getAboutUs();
            if (!data) {
                return apiResponse.error('No se encontró información de Sobre Nosotros', 404);
            }
            return apiResponse.success(data);
        } catch (error: any) {
            return apiResponse.error(error.message, 500);
        }
    },

    async updateAboutUs(req: any) {
        try {
            const data = await req.json();
            const updatedAboutUs = await aboutUsService.updateAboutUs(data);
            return apiResponse.success(updatedAboutUs);
        } catch (error: any) {
            return apiResponse.error(error.message, 500);
        }
    }
};

export default aboutUsController;