import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function analyzeJobDescription(jobDescription: string) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured")
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Changed from gpt-4 to gpt-3.5-turbo for better availability
      messages: [
        {
          role: "system",
          content: `You are a career advisor AI. Analyze job descriptions and provide:
1. A concise summary (2-3 sentences)
2. Exactly 3 key skills candidates should highlight

Respond ONLY in valid JSON format:
{
  "summary": "Brief job summary here",
  "keySkills": ["skill1", "skill2", "skill3"]
}`,
        },
        {
          role: "user",
          content: `Analyze this job description:\n\n${jobDescription}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error("No response from OpenAI")
    }

    // Clean the response to ensure it's valid JSON
    const cleanedResponse = response.trim()
    let parsedResponse

    try {
      parsedResponse = JSON.parse(cleanedResponse)
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.error("Raw response:", cleanedResponse)

      // Fallback response if JSON parsing fails
      return {
        summary: "Unable to parse the job description analysis. Please try again with a different job description.",
        keySkills: ["Communication", "Problem Solving", "Technical Skills"],
      }
    }

    // Validate the response structure
    if (!parsedResponse.summary || !Array.isArray(parsedResponse.keySkills)) {
      throw new Error("Invalid response format from OpenAI")
    }

    return parsedResponse
  } catch (error) {
    console.error("OpenAI API error:", error)

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error("OpenAI API key is not configured. Please add your API key to continue.")
      } else if (error.message.includes("quota")) {
        throw new Error("OpenAI API quota exceeded. Please check your OpenAI account.")
      } else if (error.message.includes("rate limit")) {
        throw new Error("Rate limit exceeded. Please wait a moment and try again.")
      }
    }

    throw new Error("Failed to analyze job description. Please try again.")
  }
}
