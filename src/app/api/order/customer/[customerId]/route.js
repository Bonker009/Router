import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(request, { params: { customerId } }) {
  console.log(customerId);
  const result = await prisma.order.findMany({
    where: {
      customer_id: +customerId,
    },
  });
  return NextResponse.json({
    result,
  });
}
