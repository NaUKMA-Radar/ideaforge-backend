-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT,
    "firstName" VARCHAR(50),
    "lastName" VARCHAR(50),
    "image" TEXT,
    "userRegistrationMethodId" SMALLINT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRegistrationMethod" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "UserRegistrationMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToProject" (
    "userId" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "userRoleId" SMALLINT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "UserToProject_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "UserToStage" (
    "userId" UUID NOT NULL,
    "stageId" UUID NOT NULL,
    "userRoleId" SMALLINT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "UserToStage_pkey" PRIMARY KEY ("userId","stageId")
);

-- CreateTable
CREATE TABLE "UserToDocument" (
    "userId" UUID NOT NULL,
    "documentId" UUID NOT NULL,
    "userRoleId" SMALLINT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "UserToDocument_pkey" PRIMARY KEY ("userId","documentId")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "url" TEXT NOT NULL,
    "socialMediaLinks" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "stageTypeId" SMALLINT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StageType" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "StageType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" UUID NOT NULL,
    "stageId" UUID NOT NULL,
    "documentTypeId" SMALLINT NOT NULL,
    "isFinalized" BOOLEAN NOT NULL DEFAULT false,
    "initialData" JSON NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentType" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paragraph" (
    "id" UUID NOT NULL,
    "documentId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "ordinalId" SMALLINT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Paragraph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParagraphComment" (
    "id" UUID NOT NULL,
    "paragraphId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "replyToParagraphCommentId" UUID,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ParagraphComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParagraphGrade" (
    "paragraphId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "grade" SMALLINT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ParagraphGrade_pkey" PRIMARY KEY ("paragraphId","userId")
);

-- CreateTable
CREATE TABLE "ParagraphEdition" (
    "id" UUID NOT NULL,
    "paragraphId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ParagraphEdition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParagraphEditionComment" (
    "id" UUID NOT NULL,
    "paragraphEditionId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "replyToParagraphEditionCommentId" UUID,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ParagraphEditionComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParagraphEditionGrade" (
    "paragraphEditionId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "grade" SMALLINT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ParagraphEditionGrade_pkey" PRIMARY KEY ("paragraphEditionId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserRegistrationMethod_name_key" ON "UserRegistrationMethod"("name");

-- CreateIndex
CREATE INDEX "UserRegistrationMethod_name_idx" ON "UserRegistrationMethod"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_key" ON "UserRole"("name");

-- CreateIndex
CREATE INDEX "UserRole_name_idx" ON "UserRole"("name");

-- CreateIndex
CREATE INDEX "UserToProject_userRoleId_idx" ON "UserToProject"("userRoleId");

-- CreateIndex
CREATE INDEX "UserToStage_userRoleId_idx" ON "UserToStage"("userRoleId");

-- CreateIndex
CREATE INDEX "UserToDocument_userRoleId_idx" ON "UserToDocument"("userRoleId");

-- CreateIndex
CREATE INDEX "Project_name_url_idx" ON "Project"("name", "url");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_url_key" ON "Project"("name", "url");

-- CreateIndex
CREATE INDEX "Stage_projectId_stageTypeId_idx" ON "Stage"("projectId", "stageTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_projectId_stageTypeId_key" ON "Stage"("projectId", "stageTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "StageType_name_key" ON "StageType"("name");

-- CreateIndex
CREATE INDEX "StageType_name_idx" ON "StageType"("name");

-- CreateIndex
CREATE INDEX "Document_stageId_documentTypeId_isFinalized_idx" ON "Document"("stageId", "documentTypeId", "isFinalized");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentType_name_key" ON "DocumentType"("name");

-- CreateIndex
CREATE INDEX "DocumentType_name_idx" ON "DocumentType"("name");

-- CreateIndex
CREATE INDEX "Paragraph_documentId_isApproved_idx" ON "Paragraph"("documentId", "isApproved");

-- CreateIndex
CREATE INDEX "ParagraphComment_paragraphId_idx" ON "ParagraphComment"("paragraphId");

-- CreateIndex
CREATE INDEX "ParagraphGrade_grade_idx" ON "ParagraphGrade"("grade");

-- CreateIndex
CREATE INDEX "ParagraphEdition_paragraphId_idx" ON "ParagraphEdition"("paragraphId");

-- CreateIndex
CREATE INDEX "ParagraphEditionComment_paragraphEditionId_idx" ON "ParagraphEditionComment"("paragraphEditionId");

-- CreateIndex
CREATE INDEX "ParagraphEditionGrade_grade_idx" ON "ParagraphEditionGrade"("grade");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userRegistrationMethodId_fkey" FOREIGN KEY ("userRegistrationMethodId") REFERENCES "UserRegistrationMethod"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToProject" ADD CONSTRAINT "UserToProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToProject" ADD CONSTRAINT "UserToProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToProject" ADD CONSTRAINT "UserToProject_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToStage" ADD CONSTRAINT "UserToStage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToStage" ADD CONSTRAINT "UserToStage_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToStage" ADD CONSTRAINT "UserToStage_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToDocument" ADD CONSTRAINT "UserToDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToDocument" ADD CONSTRAINT "UserToDocument_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToDocument" ADD CONSTRAINT "UserToDocument_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_stageTypeId_fkey" FOREIGN KEY ("stageTypeId") REFERENCES "StageType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paragraph" ADD CONSTRAINT "Paragraph_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParagraphComment" ADD CONSTRAINT "ParagraphComment_paragraphId_fkey" FOREIGN KEY ("paragraphId") REFERENCES "Paragraph"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParagraphComment" ADD CONSTRAINT "ParagraphComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParagraphComment" ADD CONSTRAINT "ParagraphComment_replyToParagraphCommentId_fkey" FOREIGN KEY ("replyToParagraphCommentId") REFERENCES "ParagraphComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParagraphGrade" ADD CONSTRAINT "ParagraphGrade_paragraphId_fkey" FOREIGN KEY ("paragraphId") REFERENCES "Paragraph"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParagraphGrade" ADD CONSTRAINT "ParagraphGrade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParagraphEdition" ADD CONSTRAINT "ParagraphEdition_paragraphId_fkey" FOREIGN KEY ("paragraphId") REFERENCES "Paragraph"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParagraphEditionComment" ADD CONSTRAINT "ParagraphEditionComment_paragraphEditionId_fkey" FOREIGN KEY ("paragraphEditionId") REFERENCES "ParagraphEdition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParagraphEditionComment" ADD CONSTRAINT "ParagraphEditionComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParagraphEditionComment" ADD CONSTRAINT "ParagraphEditionComment_replyToParagraphEditionCommentId_fkey" FOREIGN KEY ("replyToParagraphEditionCommentId") REFERENCES "ParagraphEditionComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParagraphEditionGrade" ADD CONSTRAINT "ParagraphEditionGrade_paragraphEditionId_fkey" FOREIGN KEY ("paragraphEditionId") REFERENCES "ParagraphEdition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParagraphEditionGrade" ADD CONSTRAINT "ParagraphEditionGrade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
