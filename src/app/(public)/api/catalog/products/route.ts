import catalogController from "@/core/modules/catalog/controllers/catalog.controller";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return
}


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const gender = searchParams.get('gender');
  const color = searchParams.get('color');
  const category = searchParams.get('category');
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const tenantId = searchParams.get('tenantId');


  const products = await catalogController.getProducts(tenantId, {
    gender: gender || '',
    color: color || [],
    category: category || [],
    page: Number(page) || 1,
    limit: Number(limit) || 12,
  });

  console.log(products);


  return NextResponse.json(products);
}