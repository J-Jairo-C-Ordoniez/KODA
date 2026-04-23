import catalogService from "@/core/modules/catalog/services/catalog.service";

const catalogController = {
  async getCategories(tenantId?: string) {
    try {
      const categories = await catalogService.getCategories(tenantId);
      return categories
    } catch (error) {
      return error;
    }
  },
  
  async getColors(tenantId?: string) {
    try {
      const colors = await catalogService.getColors(tenantId);
      return colors;
    } catch (error) {
      return error;
    }
  },
}

export default catalogController;

/* export class CatalogController {
  constructor() {
    this.service = catalogService;
    this.productService = new ProductService();
    this.variantService = new VariantService();
  }

  async getProducts(req) {
    try {
      const { searchParams } = new URL(req.url);
      const filters = {
        categoryId: searchParams.get('category'),
        gender: searchParams.get('gender'),
        search: searchParams.get('search'),
        color: searchParams.get('color'),
        page: searchParams.get('page') ? parseInt(searchParams.get('page')) : 1,
        limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 12,
      };

      const result = await this.service.getAllProducts(filters);
      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getDashboardCatalog() {
    try {
      const products = await this.productService.getAllProducts();
      return NextResponse.json({ success: true, data: products }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getColors() {
    try {
      const colors = await this.service.getColors();
      return NextResponse.json({ success: true, data: colors }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getCategories() {
    try {
      const categories = await this.service.getCategories();
      return NextResponse.json({ success: true, data: categories }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getPopularVariants(req) {
    try {
      const { searchParams } = new URL(req.url);
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 10;
      const variants = await this.service.getPopularVariants(limit);
      return NextResponse.json({ success: true, data: variants }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getAllVariants(req) {
    try {
      const variants = await this.variantService.getAllVariants();
      return NextResponse.json({ success: true, data: variants }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getVariantById(req, id) {
    try {
      const variant = await this.service.getVariantById(id);
      return NextResponse.json({ success: true, data: variant }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getProductById(req, id) {
    try {
      const product = await this.service.getProductById(id);
      return NextResponse.json({ success: true, data: product }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async createProduct(req) {
    try {
      const data = await req.json();
      const product = await this.productService.createProduct(data);
      return NextResponse.json({ success: true, data: product }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async updateProduct(req, id) {
    try {
      const data = await req.json();
      const product = await this.productService.updateProduct(id, data);
      return NextResponse.json({ success: true, data: product }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async deleteProduct(req, id) {
    try {
      await this.productService.deleteProduct(id);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async createVariant(req) {
    try {
      const data = await req.json();
      const variant = await this.variantService.createVariant(data);
      return NextResponse.json({ success: true, data: variant }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async updateVariant(req, id) {
    try {
      const data = await req.json();
      const variant = await this.variantService.updateVariant(id, data);
      return NextResponse.json({ success: true, data: variant }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async deleteVariant(req, id) {
    try {
      await this.variantService.deleteVariant(id);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
} */
