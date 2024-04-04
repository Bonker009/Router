import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const results = await prisma.order.findMany();
  return NextResponse.json({
    status: 200,
    message: "Get all order",
    payload: results,
  });
}
export async function POST(request) {
  try {
    const { product_id, customer_id, order_qty } = await request.json();
    console.log("Hello World");
    console.log(product_id, customer_id, order_qty);
    const result1 = await prisma.customer.findUnique({
      where: {
        customer_id: +customer_id,
      },
    });
    console.log(result1);
    const price = await prisma.product.findUnique({
      where: {
        product_id: +product_id,
      },
    });

    const newData = await prisma.order.create({
      data: {
        order_qty: +order_qty,
        customer_id: +customer_id,
        product_id: +product_id,
        order_total: +order_qty * price.price,
        order_date: new Date(),
      },
    });
    return NextResponse.json({
      status: 201,
      message: "Order created successfully",
      data: newData,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({
      status: 500,
      message: "Error creating order",
      error: error.message,
    });
  }
}
