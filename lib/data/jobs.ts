import type { Job } from "@/types/job"
import { nanoid } from "nanoid"

// In-memory storage for jobs (in production, use a database)
const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    applicationLink: "https://techcorp.com/careers/senior-frontend",
    status: "Applied",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    applicationLink: "https://startupxyz.com/jobs/fullstack",
    status: "Interviewing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const getAllJobs = (): Job[] => {
  return jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const getJobById = (id: string): Job | undefined => {
  return jobs.find((job) => job.id === id)
}

export const createJob = (jobData: Omit<Job, "id" | "createdAt" | "updatedAt">): Job => {
  const newJob: Job = {
    ...jobData,
    id: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  jobs.push(newJob)
  return newJob
}

export const updateJob = (id: string, updates: Partial<Omit<Job, "id" | "createdAt">>): Job | null => {
  const jobIndex = jobs.findIndex((job) => job.id === id)
  if (jobIndex === -1) return null

  jobs[jobIndex] = {
    ...jobs[jobIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return jobs[jobIndex]
}

export const deleteJob = (id: string): boolean => {
  const jobIndex = jobs.findIndex((job) => job.id === id)
  if (jobIndex === -1) return false

  jobs.splice(jobIndex, 1)
  return true
}
