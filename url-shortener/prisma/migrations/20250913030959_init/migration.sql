-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "shorten_code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "owner_key" TEXT NOT NULL,
    "access_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shorten_code_key" ON "Url"("shorten_code");
