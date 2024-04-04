import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params: { customerId } }) {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        customer_id: +customerId,
      },
    });

    if (!customer) {
      return NextResponse.json({
        status: 404,
        message: "Customer not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: customer,
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching customer",
      error: error.message,
    });
  }
}

export async function PUT(request, { params: { customerId } }) {
  try {
    const { first_name, last_name, birth_date, money_spent } =
      await request.json();

    const existingCustomer = await prisma.customer.findUnique({
      where: {
        customer_id: +customerId,
      },
    });

    if (!existingCustomer) {
      return NextResponse.json({
        status: 404,
        message: "Customer not found",
      });
    }

    const updatedCustomer = await prisma.customer.update({
      where: {
        customer_id: +customerId,
      },
      data: {
        first_name: first_name,
        last_name: last_name,
        birth_date: new Date(birth_date),
        money_spent: parseFloat(money_spent),
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json({
      status: 500,
      message: "Error updating customer",
      error: error.message,
    });
  }
}

export async function DELETE(request, { params: { customerId } }) {
  try {
    const deletedCustomer = await prisma.customer.delete({
      where: {
        customer_id: +customerId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Customer ${customerId} successfully deleted`,
      deletedCustomer,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error deleting customer",
      error: error,
    });
  }
}
