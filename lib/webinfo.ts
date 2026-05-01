export const webinfo: {
  baseURL: string;
  DBURL: string;
  maxFileSize: number;
} = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "",
  DBURL: process.env.DATABASE_URL || "",
  maxFileSize: 5 * 1024 * 1024,
};