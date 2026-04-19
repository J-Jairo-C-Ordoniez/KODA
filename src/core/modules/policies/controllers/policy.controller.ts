import { NextResponse } from 'next/server';
import { PolicyService } from '../services/policy.service';

export class PolicyController {
  constructor() {
    this.service = new PolicyService();
  }

  async getPolicyByTitle(req, title: string) {
    try {
      const data = await this.service.getPolicyByTitle(title);
      if (!data) {
        return NextResponse.json({ success: false, message: `No se encontró la política: ${title}` }, { status: 404 });
      }
      return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getLatestPolicy() {
    try {
      const data = await this.service.getLatestPolicy();
      if (!data) {
        return NextResponse.json({ success: false, message: 'No se encontraron políticas' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async updatePolicy(req) {
    try {
      const body = await req.json();
      const data = await this.service.updatePolicy(body);
      return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}
