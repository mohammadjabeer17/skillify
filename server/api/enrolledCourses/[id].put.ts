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
  if (method !== "PUT") {
    return { error: "Method not allowed" };
  }

  const id = event.context.params?.id;
  const query = getQuery(event);
  const userId = query.userId as string;

  if (!userId) {
    return { error: "User ID is required" };
  }

  const body = await readBody(event);
  let allCourses = await loadEnrolledCourses();

  if (allCourses[userId]) {
    const courseIndex = allCourses[userId].findIndex((c: any) => c.id === id);
    if (courseIndex !== -1) {
      allCourses[userId][courseIndex] = {
        ...allCourses[userId][courseIndex],
        ...body,
      };
      await saveEnrolledCourses(allCourses);
      return { success: true, course: allCourses[userId][courseIndex] };
    }
  }

  return { error: "Course not found" };
});
