import { type NextRequest, NextResponse } from "next/server"
import { analyzeJobDescription } from "@/lib/openai"
import { analyzeJobSchema } from "@/lib/validations/job"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobDescription } = analyzeJobSchema.parse(body)

    const analysis = await analyzeJobDescription(jobDescription)
    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Analysis API error:", error)

    if (error instanceof Error) {
      // Return specific error messages to the client
      return NextResponse.json({ error: error.message }, { status: error.message.includes("API key") ? 401 : 400 })
    }

    return NextResponse.json({ error: "Failed to analyze job description" }, { status: 500 })
  }
}
