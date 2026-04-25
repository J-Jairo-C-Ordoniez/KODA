import { NextResponse } from 'next/server';
import settingsService from '../services/settings.service';
import { apiResponse } from '../../../../shared/utils/apiResponse';

const settingsController = {
  async getSettings(tenantId: string) {
    try {
      const settings = await settingsService.getSettings(tenantId);
      return NextResponse.json(apiResponse(true, settings));
    } catch (error: any) {
      return NextResponse.json(apiResponse(false, null, error.message), { status: 400 });
    }
  },

  async updateTenant(tenantId: string, data: any) {
    try {
      const updated = await settingsService.updateTenant(tenantId, data);
      return NextResponse.json(apiResponse(true, updated));
    } catch (error: any) {
      return NextResponse.json(apiResponse(false, null, error.message), { status: 400 });
    }
  },

  async uploadLogo(tenantId: string, file: File) {
    try {
      const result = await settingsService.uploadLogo(tenantId, file);
      return NextResponse.json(apiResponse(true, result));
    } catch (error: any) {
      return NextResponse.json(apiResponse(false, null, error.message), { status: 500 });
    }
  },
};

export default settingsController;
