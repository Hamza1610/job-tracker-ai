"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createJobSchema, type CreateJobInput } from "@/lib/validations/job"
import type { JobStatus } from "@/types/job"

interface JobFormProps {
  onSubmit: (data: CreateJobInput) => Promise<void>
  isLoading?: boolean
}

export function JobForm({ onSubmit, isLoading }: JobFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateJobInput>({
    resolver: zodResolver(createJobSchema),
  })

  const handleFormSubmit = async (data: CreateJobInput) => {
    await onSubmit(data)
    reset()
  }

  const statusOptions: JobStatus[] = ["Applied", "Interviewing", "Rejected", "Offer"]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardHeader>
          <CardTitle>Add New Job Application</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Job Title
              </label>
              <Input
                id="title"
                {...register("title")}
                placeholder="e.g. Senior Frontend Developer"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">
                Company Name
              </label>
              <Input
                id="company"
                {...register("company")}
                placeholder="e.g. TechCorp Inc."
                className={errors.company ? "border-red-500" : ""}
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
            </div>

            <div>
              <label htmlFor="applicationLink" className="block text-sm font-medium mb-1">
                Application Link
              </label>
              <Input
                id="applicationLink"
                type="url"
                {...register("applicationLink")}
                placeholder="https://company.com/careers/job-id"
                className={errors.applicationLink ? "border-red-500" : ""}
              />
              {errors.applicationLink && <p className="text-red-500 text-sm mt-1">{errors.applicationLink.message}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Status
              </label>
              <Select id="status" {...register("status")} className={errors.status ? "border-red-500" : ""}>
                <option value="">Select status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Adding..." : "Add Job Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
