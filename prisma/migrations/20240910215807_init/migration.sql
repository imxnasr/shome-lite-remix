-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ShowType" AS ENUM ('MOVIE', 'TV');

-- CreateEnum
CREATE TYPE "ActorGender" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Show" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ShowType" NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "cover" TEXT,
    "numEpisodes" INTEGER,
    "runtime" INTEGER,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "country" TEXT NOT NULL,
    "trailerLink" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "ActorGender" NOT NULL,
    "birthDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Act" (
    "id" TEXT NOT NULL,
    "actAs" TEXT NOT NULL,
    "showId" TEXT,
    "actorId" TEXT,

    CONSTRAINT "Act_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Watchlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ShowGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Act_showId_actorId_key" ON "Act"("showId", "actorId");

-- CreateIndex
CREATE UNIQUE INDEX "_Watchlist_AB_unique" ON "_Watchlist"("A", "B");

-- CreateIndex
CREATE INDEX "_Watchlist_B_index" ON "_Watchlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ShowGenre_AB_unique" ON "_ShowGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_ShowGenre_B_index" ON "_ShowGenre"("B");

-- AddForeignKey
ALTER TABLE "Act" ADD CONSTRAINT "Act_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Act" ADD CONSTRAINT "Act_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Watchlist" ADD CONSTRAINT "_Watchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Watchlist" ADD CONSTRAINT "_Watchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowGenre" ADD CONSTRAINT "_ShowGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowGenre" ADD CONSTRAINT "_ShowGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;
