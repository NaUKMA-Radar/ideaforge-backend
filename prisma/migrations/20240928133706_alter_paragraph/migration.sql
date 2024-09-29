/*
  Warnings:

  - A unique constraint covering the columns `[documentId,ordinalId]` on the table `Paragraph` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Paragraph_documentId_ordinalId_key" ON "Paragraph"("documentId", "ordinalId");
