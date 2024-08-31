-- CreateTable
CREATE TABLE "measures" (
    "measure_uuid" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "measure_value" INTEGER NOT NULL,
    "measure_type" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("measure_uuid")
);
