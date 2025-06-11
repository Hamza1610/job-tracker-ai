import { z } from "zod"

export const jobStatusSchema = z.enum(["Applied", "Interviewing", "Rejected", "Offer"])

export const createJobSchema = z.object({
  title: z.string().min(1, "Job title is required").max(100, "Job title too long"),
  company: z.string().min(1, "Company name is required").max(100, "Company name too long"),
  applicationLink: z.string().url("Please enter a valid URL"),
  status: jobStatusSchema,
})

export const updateJobSchema = createJobSchema.partial().extend({
  id: z.string().min(1, "Job ID is required"),
})

export const analyzeJobSchema = z.object({
  jobDescription: z.string().min(10, "Job description must be at least 10 characters"),
})

export type CreateJobInput = z.infer<typeof createJobSchema>
export type UpdateJobInput = z.infer<typeof updateJobSchema>
export type AnalyzeJobInput = z.infer<typeof analyzeJobSchema>
