import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(request, { params: { orderId } }) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        order_id: +orderId,
      },
    });

    if (!order) {
      return NextResponse.json({
        status: 404,
        message: `Order ${orderId} not found`,
      });
    }

    return NextResponse.json({
      status: 200,
      result: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching order",
      error: error.message,
    });
  }
}
export async function DELETE(request, { params: { orderId } }) {
  try {
    await prisma.order.delete({
      where: {
        order_id: +orderId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({
      status: 500,
      message: "Error deleting order",
      error: error.message,
    });
  }
}
export async function PUT(request, { params: { orderId } }) {
  try {
    const { product_id, customer_id, order_qty } = await request.json();
    const price = await prisma.product.findUnique({
      where: {
        product_id: +product_id,
      },
    });

    const updatedOrder = await prisma.order.update({
      where: {
        order_id: +orderId,
      },
      data: {
        product_id: +product_id,
        customer_id: +customer_id,
        order_qty: +order_qty,
        order_total: +order_qty * +price.price,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({
      status: 500,
      message: "Error updating order",
      error: error.message,
    });
  }
}
