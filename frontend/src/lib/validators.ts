import { z } from 'zod'

export const emailSchema = z.string().email('Invalid email address')

export const passwordSchema = z.string().min(6, 'Password must be at least 6 characters')

export const symbolSchema = z.string().min(1).max(10).toUpperCase()

export const quantitySchema = z.number().int().positive('Quantity must be positive')

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const researchRequestSchema = z.object({
  symbol: symbolSchema,
  deep_analysis: z.boolean().optional().default(false),
})
