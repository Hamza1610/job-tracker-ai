"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Briefcase, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JobForm } from "@/components/job-form"
import { JobCard } from "@/components/job-card"
import { JobEditModal } from "@/components/job-edit-modal"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import { JobAnalyzer } from "@/components/job-analyzer"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Job } from "@/types/job"
import type { CreateJobInput } from "@/lib/validations/job"

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [deletingJob, setDeletingJob] = useState<Job | null>(null)
  const [activeTab, setActiveTab] = useState<"dashboard" | "add" | "analyze">("dashboard")

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs")
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    }
  }

  const handleCreateJob = async (data: CreateJobInput) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await fetchJobs()
        setActiveTab("dashboard")
      }
    } catch (error) {
      console.error("Failed to create job:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateJob = async (id: string, data: CreateJobInput) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await fetchJobs()
      }
    } catch (error) {
      console.error("Failed to update job:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteJob = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchJobs()
        setDeletingJob(null)
      }
    } catch (error) {
      console.error("Failed to delete job:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusCounts = () => {
    return jobs.reduce(
      (acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              <h1 className="text-xl sm:text-2xl font-bold">Job Tracker</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[57px] z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: TrendingUp },
              { id: "add", label: "Add Job", icon: Plus },
              { id: "analyze", label: "AI Analyzer", icon: Briefcase },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 py-3 sm:py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{jobs.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Applied</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{statusCounts.Applied || 0}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Interviewing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{statusCounts.Interviewing || 0}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Offers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{statusCounts.Offer || 0}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Jobs Grid */}
              {jobs.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No job applications yet</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Start tracking your job applications by adding your first one.
                    </p>
                    <Button onClick={() => setActiveTab("add")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Job
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  <AnimatePresence>
                    {jobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onEdit={setEditingJob}
                        onDelete={(id) => {
                          const job = jobs.find((j) => j.id === id)
                          if (job) setDeletingJob(job)
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "add" && (
            <motion.div
              key="add"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <JobForm onSubmit={handleCreateJob} isLoading={isLoading} />
            </motion.div>
          )}

          {activeTab === "analyze" && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <JobAnalyzer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <JobEditModal
        job={editingJob}
        isOpen={!!editingJob}
        onClose={() => setEditingJob(null)}
        onSubmit={handleUpdateJob}
        isLoading={isLoading}
      />

      <DeleteConfirmationModal
        isOpen={!!deletingJob}
        onClose={() => setDeletingJob(null)}
        onConfirm={() => deletingJob && handleDeleteJob(deletingJob.id)}
        jobTitle={deletingJob?.title || ""}
        isLoading={isLoading}
      />
    </div>
  )
}
