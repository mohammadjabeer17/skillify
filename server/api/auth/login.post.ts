import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import type { User } from "@/types/User";

const USERS_FILE = path.resolve("data/auth.json");

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string }>(event);

  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      message: "Email and password are required",
    });
  }

  try {
    await fs.access(USERS_FILE);
  } catch {
    console.error("Users file not found, creating empty file");
    await fs.writeFile(USERS_FILE, "[]");
  }

  let users: any[];
  try {
    users = JSON.parse(await fs.readFile(USERS_FILE, "utf-8"));
  } catch (error) {
    console.error("Error parsing users file:", error);
    throw createError({
      statusCode: 500,
      message: "Internal server error",
    });
  }

  const user = users.find((u) => u.email === body.email);
  if (!user) {
    console.log(`Login attempt for non-existent user: ${body.email}`);
    throw createError({
      statusCode: 401,
      message: "Invalid email or password",
    });
  }

  if (!user.password) {
    console.error(`User ${body.email} has no password set`);
    throw createError({
      statusCode: 500,
      message: "Account configuration error",
    });
  }

  if (body.password !== user.password) {
    console.log(`Invalid password for user: ${body.email}`);
    throw createError({
      statusCode: 401,
      message: "Invalid email or password",
    });
  }

  const safeUser: User = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || "user",
  };

  console.log(`Successful login for user: ${body.email}`);
  return safeUser;
});
