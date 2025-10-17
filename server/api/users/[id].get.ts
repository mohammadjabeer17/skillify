import { readFileSync } from "fs";
import { join } from "path";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const authData = JSON.parse(
      readFileSync(join(process.cwd(), "data/auth.json"), "utf-8")
    );
    const user = authData.find((u: any) => u.id === id);

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch user data",
    });
  }
});
