"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Brain, Copy, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { analyzeJobSchema, type AnalyzeJobInput } from "@/lib/validations/job"
import type { JobAnalysis } from "@/types/job"
import { copyToClipboard } from "@/lib/utils"

export function JobAnalyzer() {
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnalyzeJobInput>({
    resolver: zodResolver(analyzeJobSchema),
  })

  const handleAnalyze = async (data: AnalyzeJobInput) => {
    setIsLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to analyze job description")
      }

      setAnalysis(result)
    } catch (error) {
      console.error("Analysis error:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async (text: string, id: string) => {
    try {
      await copyToClipboard(text)
      setCopiedItems((prev) => new Set(prev).add(id))
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }, 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Job Description Analyzer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleAnalyze)} className="space-y-4">
              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium mb-2">
                  Paste Job Description
                </label>
                <Textarea
                  id="jobDescription"
                  {...register("jobDescription")}
                  placeholder="Paste the full job description here..."
                  rows={8}
                  className={errors.jobDescription ? "border-red-500" : ""}
                />
                {errors.jobDescription && <p className="text-red-500 text-sm mt-1">{errors.jobDescription.message}</p>}
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Analyzing..." : "Analyze Job Description"}
              </Button>
            </form>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
                {error.includes("API key") && (
                  <p className="text-xs text-red-500 mt-2">
                    Please add your OpenAI API key to the environment variables to use this feature.
                  </p>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Job Summary</h3>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(analysis.summary, "summary")}>
                    {copiedItems.has("summary") ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{analysis.summary}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Key Skills to Highlight</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(analysis.keySkills.join(", "), "skills")}
                  >
                    {copiedItems.has("skills") ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.keySkills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
