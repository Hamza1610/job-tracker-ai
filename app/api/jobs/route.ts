import { type NextRequest, NextResponse } from "next/server"
import { getAllJobs, createJob } from "@/lib/data/jobs"
import { createJobSchema } from "@/lib/validations/job"

export async function GET() {
  try {
    const jobs = getAllJobs()
    return NextResponse.json(jobs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createJobSchema.parse(body)

    const newJob = createJob(validatedData)
    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
