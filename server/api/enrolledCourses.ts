import { defineEventHandler, readBody, getQuery } from "h3";
import fsExtra from "fs-extra";
import { join } from "path";

const { readJson, writeJson } = fsExtra;
const filePath = join(process.cwd(), "data", "enrolledCourses.json");

async function loadEnrolledCourses() {
  try {
    return await readJson(filePath);
  } catch {
    return {};
  }
}

async function saveEnrolledCourses(courses: any) {
  await writeJson(filePath, courses, { spaces: 2 });
}

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const query = getQuery(event);
  const userId = query.userId as string;

  if (!userId) {
    return { error: "User ID is required" };
  }

  let allCourses = await loadEnrolledCourses();

  if (method === "GET") {
    return allCourses[userId] || [];
  }

  if (method === "POST") {
    const body = await readBody(event);
    if (!allCourses[userId]) {
      allCourses[userId] = [];
    }
    if (!allCourses[userId].some((c: any) => c.id === body.id)) {
      allCourses[userId].push(body);
      await saveEnrolledCourses(allCourses);
    }
    return { success: true };
  }

  return { error: "Method not allowed" };
});
