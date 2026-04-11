import postgres from "postgres";

declare global {
  var __movieSql: ReturnType<typeof postgres> | undefined;
}

function createClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return postgres(process.env.DATABASE_URL, {
    ssl: "require",
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });
}

export const sql = global.__movieSql ?? createClient();

if (process.env.NODE_ENV !== "production") {
  global.__movieSql = sql;
}
