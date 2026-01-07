import { z } from 'zod';

// Allowed roles (must match USER_ROLE)
const userRoles = ['admin', 'user'] as const;

const createUserValidationSchema = z.object({
  body: z.object({
    fullName: z.string().nonempty({ message: 'Name is required' }),
    companyName: z.string().nonempty({ message: 'Company name is required' }),
    email: z
      .string()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    contactNumber: z
      .string()
      .nonempty({ message: 'Contact number is required' })
      .regex(/^\+?[0-9]{8,15}$/, { message: 'Invalid contact number format' }),
    password: z
      .string()
      .nonempty({ message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(20, { message: 'Password cannot exceed 20 characters' }),
    role: z.enum(userRoles).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    fullName: z.string().optional(),
    companyName: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    contactNumber: z
      .string()
      .regex(/^\+?[0-9]{8,15}$/, { message: 'Invalid contact number format' })
      .optional(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(20, { message: 'Password cannot exceed 20 characters' })
      .optional(),
    role: z.enum(userRoles).optional(),
    isBlocked: z.boolean().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
