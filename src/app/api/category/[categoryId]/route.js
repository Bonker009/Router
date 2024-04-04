import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request, { params: { categoryId } }) {
  const { category_name } = await request.json();
  const existingCategory = await prisma.category.findUnique({
    where: {
      category_id: +categoryId,
    },
  });
  if (!existingCategory) {
    return NextResponse.json({
      status: 404,
      message: `Category ID ${categoryId} not found`,
    });
  }
  const updatedCategory = await prisma.category.update({
    where: {
      category_id: +categoryId,
    },
    data: {
      category_name: category_name,
    },
  });
  return NextResponse.json({
    status: 200,
    message: `Category ID ${categoryId} updated successfully`,
    data: updatedCategory,
  });
}
export async function GET(request, { params: { categoryId } }) {
  const result = await prisma.category.findUnique({
    where: {
      category_id: +categoryId,
    },
  });

  if (!result) {
    return NextResponse.json({
      status: 404,
      message: `Category with ID ${categoryId} not found`,
    });
  }
  return NextResponse.json({
    status: 200,
    message: `Category with ID ${categoryId} found`,
    data: result,
  });
}

export async function DELETE(request, { params: { categoryId } }) {
  const existingCategory = await prisma.category.findUnique({
    where: {
      category_id: +categoryId,
    },
  });

  if (!existingCategory) {
    return NextResponse.json({
      status: 404,
      message: `Category ID ${categoryId} not found`,
    });
  }

  await prisma.category.delete({ where: { category_id: +categoryId } });

  return NextResponse.json({
    status: 200,
    message: `Category ID ${categoryId} deleted successfully`,
  });
}
