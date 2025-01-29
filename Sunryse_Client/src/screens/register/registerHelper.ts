import {z} from "zod";

export const registerFormSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z
      .string()
      .min(8, "Passwords must be at least 8 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.passwordConfirmation !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      });
    }
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;
