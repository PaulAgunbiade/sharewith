import {z} from "zod";
import axios from "../../axios";

export const refreshResponseSchema = z.object({
  data: z.object({
    accessToken: z.string().min(1),
  }),
});

export type RefreshResponsePayload = z.infer<typeof refreshResponseSchema>;

export async function refreshAccessToken() {
  const response = await axios.post("/auth/login/refresh");
  const sanitizedResponse: RefreshResponsePayload = refreshResponseSchema.parse(
    response.data
  );
  return sanitizedResponse;
}
