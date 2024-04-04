import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const customers = await prisma.customer.findMany();

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching customers",
      error: error.message,
    });
  }
}

export async function POST(request) {
  try {
    const { first_name, last_name, birth_date, money_spent } =
      await request.json();

    const newCustomer = await prisma.customer.create({
      data: {
          first_name: first_name,
          last_name: last_name,
          birth_date: new Date(birth_date),
          money_spent: parseFloat(money_spent),
      },
    });

    return NextResponse.json({
      status: 201,
      message: "Customer created successfully",
      data: newCustomer,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json({
      status: 500,
      message: "Error creating customer",
      error: error.message,
    });
  }
}
