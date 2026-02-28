import { emit } from "process"
import { email, z } from "zod"

export const registerSchema = z.object({
    email: z.string().email().min(5).max(255).transform((email)=> email.toLowerCase().trim()),
    password: z.string().min(8).max(72), 
    name: z.string().min(1).max(100).optional().nullable().transform((val)=> val?.trim() || null)
})


export const loginSchema = z.object({
    email: z.string().email().transform((email)=> email.toLowerCase().trim()),
    password: z.string().min(1)
})
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>