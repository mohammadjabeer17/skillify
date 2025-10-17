import { v4 as uuidv4 } from "uuid";
import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import type { User } from "@/types/User";

const USERS_FILE = path.resolve("data/auth.json");

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name: string;
    email: string;
    password: string;
    adminSecret?: string;
  }>(event);

  if (!body.name || !body.email || !body.password) {
    throw createError({
      statusCode: 400,
      message: "Name, email, and password are required",
    });
  }

  if (body.password.length < 6) {
    throw createError({
      statusCode: 400,
      message: "Password must be at least 6 characters long",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      message: "Invalid email format",
    });
  }

  try {
    await fs.access(USERS_FILE);
  } catch {
    console.log("Users file not found, creating empty file");
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

  if (users.find((u) => u.email === body.email)) {
    console.log(`Registration attempt for existing email: ${body.email}`);
    throw createError({
      statusCode: 400,
      message: "Email already exists",
    });
  }

  const hashedPassword = body.password;

  const role: User["role"] =
    body.adminSecret && body.adminSecret === process.env.ADMIN_SECRET
      ? "admin"
      : "user";

  const newUser = {
    id: uuidv4(),
    name: body.name.trim(),
    email: body.email.toLowerCase().trim(),
    password: hashedPassword,
    role,
  };

  users.push(newUser);

  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing users file:", error);
    throw createError({
      statusCode: 500,
      message: "Internal server error",
    });
  }

  console.log(`New user registered: ${body.email} (role: ${role})`);

  return { id: newUser.id, name: newUser.name, email: newUser.email, role };
});
