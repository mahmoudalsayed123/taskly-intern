import z from "zod";

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters")
      .regex(
        /^(?!.*\s{2,})[\p{L}]+(?:\s[\p{L}]+)*$/u,
        "Name can only contain letters and single spaces",
      ),

    email: z.string().trim().email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must not exceed 64 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      )
      .regex(/^\S+$/, "Password must not contain spaces"),

    confirmPassword: z.string(),

    jobTitle: z
      .string()
      .trim()
      .max(100, "Job title must not exceed 100 characters")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(8, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must not exceed 64 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      )
      .regex(/^\S+$/, "Password must not contain spaces"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must not exceed 100 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});

export const createEpicSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),

  description: z.string().optional(),

  assignee_id: z
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .optional(),

  deadline: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;

        const selectedDate = new Date(value);

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return selectedDate >= today;
      },
      {
        message: "Deadline must be today or a day after today",
      },
    ),
});

export const updateEpicSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .optional(),

  description: z.string().optional(),

  assignee_id: z
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .optional(),

  deadline: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;

        const selectedDate = new Date(value);

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return selectedDate >= today;
      },
      {
        message: "Deadline must be today or a day after today",
      },
    ),
});

export const createTaskSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),

  description: z.string().optional(),

  assignee_id: z.string().optional(),

  epic_id: z.string().optional(),

  status: z.string().optional(),

  due_date: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;

        const selectedDate = new Date(value);

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return selectedDate >= today;
      },
      {
        message: "Deadline must be today or a day after today",
      },
    ),
});

export const inviteMemberSchema = z.object({
  p_email: z.string().trim().email("Please enter a valid email address"),
});
