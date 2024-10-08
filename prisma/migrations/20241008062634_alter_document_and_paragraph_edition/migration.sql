/*
  Warnings:

  - Added the required column `authorId` to the `ParagraphEdition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "file" TEXT;

-- AlterTable
ALTER TABLE "ParagraphEdition" ADD COLUMN     "authorId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ParagraphEdition" ADD CONSTRAINT "ParagraphEdition_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
