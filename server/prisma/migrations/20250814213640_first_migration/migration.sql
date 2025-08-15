-- CreateEnum
CREATE TYPE "public"."Term" AS ENUM ('FALL', 'SPRING', 'SUMMER', 'INTERSESSION');

-- CreateEnum
CREATE TYPE "public"."Grade" AS ENUM ('A_PLUS', 'A', 'A_MINUS', 'B_PLUS', 'B', 'B_MINUS', 'C_PLUS', 'C', 'C_MINUS', 'D_PLUS', 'D', 'D_MINUS', 'F', 'I', 'WIP');

-- CreateEnum
CREATE TYPE "public"."SemesterStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."Classification" AS ENUM ('FRESHMAN', 'SOPHOMORE', 'JUNIOR', 'SENIOR');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "academicInfoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "bio" TEXT,
    "birthDate" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AcademicInformation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    "majorId" INTEGER NOT NULL,
    "minorId" INTEGER,
    "level" TEXT NOT NULL,
    "degreeType" TEXT NOT NULL,
    "gpa" DOUBLE PRECISION,
    "totalCreditsEarned" INTEGER NOT NULL,
    "creditsRequired" INTEGER NOT NULL,
    "currentSemester" TEXT NOT NULL,
    "expectedGraduation" TIMESTAMP(3),
    "academicStanding" TEXT NOT NULL,
    "enrollmentStatus" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "campus" TEXT NOT NULL,
    "advisorId" INTEGER,
    "honorsProgram" BOOLEAN NOT NULL DEFAULT false,
    "studyAbroad" BOOLEAN NOT NULL DEFAULT false,
    "scholarship" BOOLEAN NOT NULL DEFAULT false,
    "academicHold" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AcademicInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DegreePlan" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "startYear" INTEGER NOT NULL,
    "startTerm" "public"."Term" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DegreePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Semester" (
    "id" SERIAL NOT NULL,
    "degreePlanId" INTEGER NOT NULL,
    "term" "public"."Term" NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SemesterCourse" (
    "id" SERIAL NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "grade" "public"."Grade",
    "status" "public"."SemesterStatus" NOT NULL DEFAULT 'PLANNED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SemesterCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "credits" INTEGER NOT NULL,
    "classification" "public"."Classification" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoursePrerequisites" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "prerequisiteId" INTEGER NOT NULL,

    CONSTRAINT "CoursePrerequisites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."School" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Major" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Minor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "Minor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DegreeSubArea" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "majorId" INTEGER NOT NULL,
    "creditsReq" INTEGER NOT NULL,

    CONSTRAINT "DegreeSubArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Specialization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "majorId" INTEGER NOT NULL,
    "hello" TEXT NOT NULL,

    CONSTRAINT "Specialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_SubAreaCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SubAreaCourses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_SpecializationCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SpecializationCourses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "public"."User"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "User_academicInfoId_key" ON "public"."User"("academicInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicInformation_userId_key" ON "public"."AcademicInformation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicInformation_studentId_key" ON "public"."AcademicInformation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "DegreePlan_userId_key" ON "public"."DegreePlan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Semester_degreePlanId_term_year_key" ON "public"."Semester"("degreePlanId", "term", "year");

-- CreateIndex
CREATE UNIQUE INDEX "SemesterCourse_semesterId_courseId_key" ON "public"."SemesterCourse"("semesterId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "public"."Course"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CoursePrerequisites_courseId_prerequisiteId_key" ON "public"."CoursePrerequisites"("courseId", "prerequisiteId");

-- CreateIndex
CREATE INDEX "_SubAreaCourses_B_index" ON "public"."_SubAreaCourses"("B");

-- CreateIndex
CREATE INDEX "_SpecializationCourses_B_index" ON "public"."_SpecializationCourses"("B");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AcademicInformation" ADD CONSTRAINT "AcademicInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AcademicInformation" ADD CONSTRAINT "AcademicInformation_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "public"."Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AcademicInformation" ADD CONSTRAINT "AcademicInformation_minorId_fkey" FOREIGN KEY ("minorId") REFERENCES "public"."Minor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DegreePlan" ADD CONSTRAINT "DegreePlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Semester" ADD CONSTRAINT "Semester_degreePlanId_fkey" FOREIGN KEY ("degreePlanId") REFERENCES "public"."DegreePlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SemesterCourse" ADD CONSTRAINT "SemesterCourse_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "public"."Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SemesterCourse" ADD CONSTRAINT "SemesterCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Course" ADD CONSTRAINT "Course_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoursePrerequisites" ADD CONSTRAINT "CoursePrerequisites_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoursePrerequisites" ADD CONSTRAINT "CoursePrerequisites_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Major" ADD CONSTRAINT "Major_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Minor" ADD CONSTRAINT "Minor_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DegreeSubArea" ADD CONSTRAINT "DegreeSubArea_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "public"."Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Specialization" ADD CONSTRAINT "Specialization_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "public"."Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SubAreaCourses" ADD CONSTRAINT "_SubAreaCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SubAreaCourses" ADD CONSTRAINT "_SubAreaCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."DegreeSubArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SpecializationCourses" ADD CONSTRAINT "_SpecializationCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SpecializationCourses" ADD CONSTRAINT "_SpecializationCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
