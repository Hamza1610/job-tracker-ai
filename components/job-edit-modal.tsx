"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createJobSchema, type CreateJobInput } from "@/lib/validations/job"
import type { Job, JobStatus } from "@/types/job"

interface JobEditModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (id: string, data: CreateJobInput) => Promise<void>
  isLoading?: boolean
}

export function JobEditModal({ job, isOpen, onClose, onSubmit, isLoading }: JobEditModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateJobInput>({
    resolver: zodResolver(createJobSchema),
  })

  useEffect(() => {
    if (job) {
      reset({
        title: job.title,
        company: job.company,
        applicationLink: job.applicationLink,
        status: job.status,
      })
    }
  }, [job, reset])

  const handleFormSubmit = async (data: CreateJobInput) => {
    if (job) {
      await onSubmit(job.id, data)
      onClose()
    }
  }

  const statusOptions: JobStatus[] = ["Applied", "Interviewing", "Rejected", "Offer"]

  if (!isOpen || !job) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Edit Job Application</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium mb-1">
                    Job Title
                  </label>
                  <Input id="edit-title" {...register("title")} className={errors.title ? "border-red-500" : ""} />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <label htmlFor="edit-company" className="block text-sm font-medium mb-1">
                    Company Name
                  </label>
                  <Input
                    id="edit-company"
                    {...register("company")}
                    className={errors.company ? "border-red-500" : ""}
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
                </div>

                <div>
                  <label htmlFor="edit-applicationLink" className="block text-sm font-medium mb-1">
                    Application Link
                  </label>
                  <Input
                    id="edit-applicationLink"
                    type="url"
                    {...register("applicationLink")}
                    className={errors.applicationLink ? "border-red-500" : ""}
                  />
                  {errors.applicationLink && (
                    <p className="text-red-500 text-sm mt-1">{errors.applicationLink.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="edit-status" className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <Select id="edit-status" {...register("status")} className={errors.status ? "border-red-500" : ""}>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                  {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
