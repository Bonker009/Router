import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const results = await prisma.product.findMany();
  return NextResponse.json({
    status: 200,
    message: "get all products",
    results: results,
  });
}
export async function POST(request) {
  const { product_name, category_id, price } = await request.json();
  console.log(product_name, category_id, price)
  const newData = await prisma.product.create({
    data: {
      product_name: product_name,
      price: +price,
      category_id: +category_id,
    },
  });
  return NextResponse.json({
    status: 201,
    message: "a new product is created successfully",
    payload: newData,
  });
}
