-- CreateTable
CREATE TABLE "public"."photos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);
