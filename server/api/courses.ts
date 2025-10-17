import { defineEventHandler, readBody } from "h3";
import { v4 as uuidv4 } from "uuid";
import fsExtra from "fs-extra";
const { readJson, writeJson } = fsExtra;
import { join } from "path";

const filePath = join(process.cwd(), "data", "courses.json");

async function loadCourses() {
  try {
    return await readJson(filePath);
  } catch {
    return [];
  }
}

async function saveCourses(courses: any[]) {
  await writeJson(filePath, courses, { spaces: 2 });
}

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  let courses = await loadCourses();

  if (method === "GET") {
    return courses;
  }

  const body = await readBody(event);

  if (method === "POST") {
    const { title, description, imgUrl, price, mrp, rating, professor } = body;

    if (
      !title ||
      !description ||
      !imgUrl ||
      !price ||
      !mrp ||
      !rating ||
      !professor
    ) {
      return { error: "All fields are required" };
    }

    const course = {
      id: uuidv4(),
      title,
      description,
      imgUrl,
      price,
      mrp,
      rating,
      professor,
      createdAt: new Date().toISOString().split("T")[0],
    };

    courses.unshift(course);
    await saveCourses(courses);
    return course;
  }

  if (method === "PUT") {
    const { id, ...rest } = body;
    const idx = courses.findIndex((c: any) => c.id === id);
    if (idx === -1) return { error: "Course not found" };

    courses[idx] = {
      ...courses[idx],
      ...rest,
    };

    await saveCourses(courses);
    return courses[idx];
  }

  if (method === "DELETE") {
    const { id } = body;
    const beforeCount = courses.length;
    courses = courses.filter((c: any) => c.id !== id);

    if (courses.length === beforeCount) {
      return { error: "Course not found" };
    }

    await saveCourses(courses);
    return { ok: true };
  }

  return { error: "Method not allowed" };
});
