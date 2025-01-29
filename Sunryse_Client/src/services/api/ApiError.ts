import {ZodIssue} from "zod";

export interface ApiError extends Error {
  code: number;
  name: string;
  message: string;
  request: string;
  zodErrors: ZodIssue[];
  stack: string;
  originalStack: string;
}
