import { type NextRequest, NextResponse } from "next/server"
import { getJobById, updateJob, deleteJob } from "@/lib/data/jobs"
import { updateJobSchema } from "@/lib/validations/job"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const job = getJobById(params.id)
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }
    return NextResponse.json(job)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const validatedData = updateJobSchema.parse({ ...body, id: params.id })

    const updatedJob = updateJob(params.id, validatedData)
    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    return NextResponse.json(updatedJob)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = deleteJob(params.id)
    if (!success) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Job deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 })
  }
}
