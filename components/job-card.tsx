"use client"

import { motion } from "framer-motion"
import { ExternalLink, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Job } from "@/types/job"
import { formatDate } from "@/lib/utils"

interface JobCardProps {
  job: Job
  onEdit: (job: Job) => void
  onDelete: (id: string) => void
}

const statusColors = {
  Applied: "info",
  Interviewing: "warning",
  Rejected: "destructive",
  Offer: "success",
} as const

export function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -2 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base sm:text-lg truncate">{job.title}</CardTitle>
              <p className="text-sm sm:text-base text-muted-foreground font-medium truncate">{job.company}</p>
            </div>
            <Badge variant={statusColors[job.status]} className="shrink-0">{job.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
              <a
                href={job.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 truncate"
              >
                View Application
              </a>
            </div>

            <div className="text-xs text-muted-foreground">Applied: {formatDate(job.createdAt)}</div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(job)} className="flex-1">
                <Edit className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(job.id)}
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
