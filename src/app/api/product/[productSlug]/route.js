import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params: { productSlug } }) {
  try {
    let result;
    if (!isNaN(productSlug)) {
      result = await prisma.product.findMany({
        where: {
          category_id: +productSlug,
        },
      });
    } else {
      result = await prisma.product.findMany({
        where: {
          product_name: productSlug,
        },
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching product",
      error: error.message,
    });
  }
}

export async function PUT(request, { params: { productSlug } }) {
  try {
    const { product_name, category_id, price } = await request.json();
console.log( product_name, category_id, price);
    const updatedData = await prisma.product.update({
      where: {
        product_id: +productSlug,
      },
      data: {
        product_name: product_name,
        category_id: +category_id,
        price: +price,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Product updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({
      status: 500,
      message: "Error updating product",
      error: error.message,
    });
  }
}
export async function DELETE(request, { params: { productSlug } }) {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        product_id: productSlug,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Product deleting successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Error deleting product",
      error: error.message,
    });
  }
}
