import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const filePath = resolve(__dirname, "../../../data/auth.json");
  const authData = JSON.parse(readFileSync(filePath, "utf-8"));

  const userIndex = authData.findIndex((user: any) => user.id === id);
  if (userIndex === -1) {
    throw createError({ statusCode: 404, statusMessage: "User not found" });
  }

  authData.splice(userIndex, 1);

  writeFileSync(filePath, JSON.stringify(authData, null, 2));

  return { success: true, message: "User deleted successfully" };
});
