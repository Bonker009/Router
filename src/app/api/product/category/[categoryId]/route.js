import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params: { categoryId } }) {
  try {
    const result = await prisma.product.findMany({
      where: {
        category_id: +categoryId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching products",
      error: error.message,
    });
  }
}
