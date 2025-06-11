export interface Job {
  id: string
  title: string
  company: string
  applicationLink: string
  status: JobStatus
  createdAt: string
  updatedAt: string
}

export type JobStatus = "Applied" | "Interviewing" | "Rejected" | "Offer"

export interface JobAnalysis {
  summary: string
  keySkills: string[]
}

export interface CreateJobData {
  title: string
  company: string
  applicationLink: string
  status: JobStatus
}

export interface UpdateJobData extends Partial<CreateJobData> {
  id: string
}
