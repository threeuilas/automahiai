import z from 'zod';

const baseSchema = {
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
};

export const SignupSchema = z
  .object({
    ...baseSchema,
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be 100 characters or less'),
    confirmPassword: baseSchema.password,
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'Please read and agree to the terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  ...baseSchema,
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
