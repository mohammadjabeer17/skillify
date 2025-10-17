import { readFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
  const basePath = process.cwd();

  const authFilePath = resolve(basePath, "data/auth.json");
  const coursesFilePath = resolve(basePath, "data/courses.json");
  const enrolledCoursesFilePath = resolve(
    basePath,
    "data/enrolledCourses.json"
  );

  const authData = JSON.parse(readFileSync(authFilePath, "utf-8"));
  const coursesData = JSON.parse(readFileSync(coursesFilePath, "utf-8"));
  const enrolledCoursesDataRaw = JSON.parse(
    readFileSync(enrolledCoursesFilePath, "utf-8")
  );

  const enrolledCoursesData = Object.values(enrolledCoursesDataRaw).flat();

  const totalUsers = authData.length;
  const adminUsers = authData.filter(
    (user: any) => user.role === "admin"
  ).length;
  const regularUsers = totalUsers - adminUsers;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newSignups = authData.filter((user: any) => {
    return user.createdAt ? new Date(user.createdAt) > thirtyDaysAgo : false;
  }).length;

  const totalCourses = coursesData.length;
  const totalEnrollments = enrolledCoursesData.length;
  const averageRating =
    coursesData.reduce((sum: number, course: any) => sum + course.rating, 0) /
    totalCourses;

  const totalRevenue = enrolledCoursesData.reduce(
    (sum: number, enrollment: any) => {
      return sum + (enrollment.price || 0);
    },
    0
  );

  const monthlyRevenue = enrolledCoursesData
    .filter((enrollment: any) => {
      const enrollmentDate = new Date(enrollment.enrolledAt || Date.now());
      const now = new Date();
      return (
        enrollmentDate.getMonth() === now.getMonth() &&
        enrollmentDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum: number, enrollment: any) => {
      return sum + (enrollment.price || 0);
    }, 0);

  return {
    userStats: {
      totalUsers,
      adminUsers,
      regularUsers,
      newSignups,
    },
    courseAnalytics: {
      totalCourses,
      totalEnrollments,
      averageRating: Math.round(averageRating * 10) / 10,
    },
    financialSummary: {
      totalRevenue,
      monthlyRevenue,
    },
  };
});
