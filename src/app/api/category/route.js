import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.category.findMany();
    console.log(result);
    return NextResponse.json({
      status: 200,
      message: "Get all categories",
      payload: result,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching categories",
      error: error.message,
    });
  }
}
export async function POST(request) {
  const categories = await request.json();
  console.log(categories[0].category_name);
  const result = await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  return NextResponse.json({
    status: 201,
    message: "get all categories",
    result
  });
}
