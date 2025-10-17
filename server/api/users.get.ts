import { readFileSync } from "fs";
import { join } from "path";

export default defineEventHandler(async (event) => {
  const filePath = join(process.cwd(), "data/auth.json");
  const authData = JSON.parse(readFileSync(filePath, "utf-8"));

  const users = authData.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  return users;
});
