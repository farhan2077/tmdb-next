import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().min(3, "Search term must be at least 3 characters long"),
});
