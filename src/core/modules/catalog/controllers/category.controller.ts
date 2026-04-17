import { NextResponse } from 'next/server';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  constructor() {
    this.service = new CategoryService();
  }

  async getAllCategories() {
    try {
      const categories = await this.service.getAllCategories();
      return NextResponse.json({ success: true, data: categories }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getCategoryById(id) {
    try {
      const category = await this.service.getCategoryById(id);
      return NextResponse.json({ success: true, data: category }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 });
    }
  }

  async createCategory(req) {
    try {
      const body = await req.json();
      const category = await this.service.createCategory(body);
      return NextResponse.json({ success: true, data: category }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }

  async updateCategory(req, id) {
    try {
      const body = await req.json();
      const category = await this.service.updateCategory(id, body);
      return NextResponse.json({ success: true, data: category }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }

  async deleteCategory(id) {
    try {
      await this.service.deleteCategory(id);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }
}
