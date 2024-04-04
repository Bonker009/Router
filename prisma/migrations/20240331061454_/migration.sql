-- CreateTable
CREATE TABLE "Customer" (
    "customer_id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "birth_date" DATE NOT NULL,
    "money_spent" DOUBLE PRECISION,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "category_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "order_total" DOUBLE PRECISION NOT NULL,
    "order_qty" INTEGER NOT NULL,
    "order_date" TIMESTAMP NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "product_name" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_key" ON "Category"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_name_key" ON "Product"("product_name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;
-- Create the trigger function to calculate order_total
 