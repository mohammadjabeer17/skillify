import { readFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const searchTerm = (query.q || "").toString().toLowerCase();

  const filePath = resolve(__dirname, "../../../data/auth.json");
  const authData = JSON.parse(readFileSync(filePath, "utf-8"));

  const filteredUsers = authData.filter((user: any) => {
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  });

  const users = filteredUsers.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  return users;
});
