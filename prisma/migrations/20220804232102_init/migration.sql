-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "usarname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personal" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "account" TEXT NOT NULL,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_usarname_key" ON "Users"("usarname");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_account_key" ON "Personal"("account");

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_account_fkey" FOREIGN KEY ("account") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
