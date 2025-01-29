import {z} from "zod";
import axios from "../../axios";

export const otpSenderRequestSchema = z.object({
  data: z.object({
    email: z.string().email(),
  }),
});
export type OtpSenderRequestPayload = z.infer<typeof otpSenderRequestSchema>;

export async function sendOtp(data: OtpSenderRequestPayload) {
  otpSenderRequestSchema.parse(data);
  await axios.post("/auth/otp", data);
}

export const otpVerifierRequestSchema = z.object({
  data: z.object({
    email: z.string().email(),
    code: z.string(),
  }),
});
export type OtpVerifierRequestPayload = z.infer<
  typeof otpVerifierRequestSchema
>;

export async function verifyOtp(data: OtpVerifierRequestPayload) {
  otpVerifierRequestSchema.parse(data);
  await axios.post("/auth/otp/verify", data);
}
