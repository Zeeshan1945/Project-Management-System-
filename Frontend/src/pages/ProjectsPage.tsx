import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProjectForm } from '../components/projects/ProjectForm'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Icon } from '../components/ui/Icon'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { Modal } from '../components/ui/Modal'
import { useErrorToast } from '../hooks/useErrorToast'
import type { AppDispatch, RootState } from '../store'
import { confirmDelete } from '../lib/swal'
import { showSuccessToast } from '../lib/toast'
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from '../store/slices/projectsSlice'
import type { CreateProjectPayload, Project } from '../types'
import {
  formatDate,
  getProjectStatusLabel,
  getProjectStatusVariant,
} from '../utils/statusHelpers'

export function ProjectsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: projects, loading, error } = useSelector((state: RootState) => state.projects)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useErrorToast(error)

  const openCreate = () => {
    setEditingProject(null)
    setModalOpen(true)
  }

  const openEdit = (project: Project) => {
    setEditingProject(project)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingProject(null)
  }

  const handleSubmit = async (data: CreateProjectPayload) => {
    try {
      if (editingProject) {
        await dispatch(updateProject({ id: editingProject.id, ...data })).unwrap()
        showSuccessToast('Project updated successfully.')
      } else {
        await dispatch(createProject(data)).unwrap()
        showSuccessToast('Project created successfully.')
      }
      closeModal()
    } catch {
      // Error toast handled via useErrorToast
    }
  }

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirmDelete(name)
    if (!confirmed) return

    setDeletingId(id)
    try {
      await dispatch(deleteProject(id)).unwrap()
      showSuccessToast('Project deleted successfully.')
    } catch {
      // Error toast handled via useErrorToast
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-stack-lg max-w-[var(--spacing-container-max)] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-headline-lg text-primary tracking-tight font-extrabold">Projects</h2>
            <p className="text-body-md text-on-surface-variant">
              Create, edit, and manage all your projects.
            </p>
          </div>
          <Button icon={<Icon name="add" className="text-sm" />} onClick={openCreate}>
            New Project
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <LoadingSpinner size="lg" label="Loading projects..." />
          </div>
        ) : projects.length === 0 ? (
          <Card className="text-center py-16">
            <Icon name="folder_open" className="text-5xl text-outline-variant mb-4" />
            <h3 className="text-title-md font-bold text-primary mb-2">No projects yet</h3>
            <p className="text-body-md text-on-surface-variant mb-6">
              Get started by creating your first project.
            </p>
            <Button onClick={openCreate}>Create Project</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {projects.map((project) => (
              <Card key={project.id} padding="md" className="flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-primary-fixed rounded-lg text-on-primary-fixed">
                    <Icon name="folder" />
                  </div>
                  <Badge variant={getProjectStatusVariant(project.status)}>
                    {getProjectStatusLabel(project.status)}
                  </Badge>
                </div>
                <h3 className="text-title-md font-bold text-primary mb-2">{project.name}</h3>
                <p className="text-body-md text-on-surface-variant mb-4 flex-1 line-clamp-3">
                  {project.description}
                </p>
                <p className="text-metadata text-outline mb-4 flex items-center gap-1">
                  <Icon name="calendar_today" className="text-sm" />
                  Created {formatDate(project.createdDate)}
                </p>
                <div className="flex gap-2 pt-3 border-t border-outline-variant">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => openEdit(project)}
                    icon={<Icon name="edit" className="text-sm" />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-error hover:bg-error-container"
                    loading={deletingId === project.id}
                    onClick={() => handleDelete(project.id, project.name)}
                    icon={<Icon name="delete" className="text-sm" />}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingProject ? 'Edit Project' : 'Create Project'}
        size="md"
      >
        <ProjectForm
          initial={editingProject ?? undefined}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </DashboardLayout>
  )
}
