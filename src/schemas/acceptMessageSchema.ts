import { z } from "zod";

export const acceptMessageSchemas = z.object({
  acceptMessage: z.boolean(),
});
