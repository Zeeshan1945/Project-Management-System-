import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  terms: z.boolean().refine((value) => value, 'You must agree to the terms'),
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
})

export const projectSchema = z.object({
  name: z.string().trim().min(1, 'Project name is required'),
  description: z.string().trim().min(1, 'Description is required'),
  status: z.enum(['planning', 'active', 'on-hold', 'completed']),
})

export const taskSchema = z.object({
  title: z.string().trim().min(1, 'Task title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().min(1, 'Due date is required'),
  assignedUserId: z.string().min(1, 'Please assign a user'),
  status: z.enum(['pending', 'in-progress', 'completed']),
  projectId: z.string().min(1, 'Please select a project'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ProjectFormValues = z.infer<typeof projectSchema>
export type TaskFormValues = z.infer<typeof taskSchema>
