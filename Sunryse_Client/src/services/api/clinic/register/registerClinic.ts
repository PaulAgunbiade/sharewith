import axios from "../../axios";
import {z} from "zod";

export const registerClinicRequestSchema = z
  .object({
    data: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      passwordConfirmation: z.string().min(8),
    }),
  })
  .superRefine(({data}, ctx) => {
    if (data.passwordConfirmation !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirmation"],
      });
    }
  });

export type RegisterClinicRequestPayload = z.infer<
  typeof registerClinicRequestSchema
>;

export async function registerClinic(data: RegisterClinicRequestPayload) {
  registerClinicRequestSchema.parse(data);
  await axios.post("/clinic", data);
}
