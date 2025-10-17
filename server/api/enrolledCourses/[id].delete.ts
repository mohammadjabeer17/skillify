import { defineEventHandler, getQuery } from "h3";
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
  if (method !== "DELETE") {
    return { error: "Method not allowed" };
  }

  const id = event.context.params?.id;
  const query = getQuery(event);
  const userId = query.userId as string;

  if (!userId) {
    return { error: "User ID is required" };
  }

  let allCourses = await loadEnrolledCourses();

  if (allCourses[userId]) {
    allCourses[userId] = allCourses[userId].filter((c: any) => c.id !== id);
    await saveEnrolledCourses(allCourses);
  }

  return { success: true };
});
