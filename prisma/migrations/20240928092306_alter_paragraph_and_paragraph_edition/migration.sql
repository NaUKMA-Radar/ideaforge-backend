-- AlterTable
ALTER TABLE "Paragraph" ADD COLUMN     "content" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "rating" DECIMAL NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ParagraphEdition" ADD COLUMN     "rating" DECIMAL NOT NULL DEFAULT 0;
