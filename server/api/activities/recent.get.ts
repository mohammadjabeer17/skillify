import { defineEventHandler } from "h3";
import fsExtra from "fs-extra";
import { join } from "path";

const { readJson } = fsExtra;

interface Activity {
  message: string;
  timestamp: string;
  type: string;
}

export default defineEventHandler(async (event) => {
  try {
    const basePath = process.cwd();

    const authFilePath = join(basePath, "data/auth.json");
    const authData = await readJson(authFilePath);

    const enrolledCoursesFilePath = join(basePath, "data/enrolledCourses.json");
    const enrolledCoursesDataRaw = await readJson(enrolledCoursesFilePath);
    const enrolledCoursesData = Object.values(enrolledCoursesDataRaw).flat();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activities: Activity[] = [];

    const recentUsers = authData
      .filter((user: any) => {
        if (!user.createdAt) return false;
        return new Date(user.createdAt) > sevenDaysAgo;
      })
      .slice(0, 3);

    recentUsers.forEach((user: any) => {
      activities.push({
        message: `New user registered: ${user.email}`,
        timestamp: new Date(user.createdAt).toLocaleString(),
        type: "user_registration",
      });
    });

    const recentEnrollments = enrolledCoursesData
      .filter((enrollment: any) => {
        if (!enrollment.enrolledAt) return false;
        return new Date(enrollment.enrolledAt) > sevenDaysAgo;
      })
      .slice(0, 3);

    recentEnrollments.forEach((enrollment: any) => {
      activities.push({
        message: `Course "${enrollment.title}" enrolled by user`,
        timestamp: new Date(enrollment.enrolledAt).toLocaleString(),
        type: "course_enrollment",
      });
    });

    activities.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return activities.slice(0, 10);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return [
      {
        message: "System initialized successfully",
        timestamp: new Date().toLocaleString(),
        type: "system",
      },
    ];
  }
});
