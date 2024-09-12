import { z } from 'zod';

/** Auth & Users */
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  current_password: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<
  Auth,
  'name' | 'email' | 'password' | 'password_confirmation'
>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ConfirmToken = Pick<Auth, 'token'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>;
export type NewPasswordRequest = Pick<
  Auth,
  'password' | 'password_confirmation' | 'token'
>;
export type ChangePasswordForm = Pick<
  Auth,
  'password' | 'password_confirmation' | 'current_password'
>;
export type CheckPasswordForm = Pick<Auth, 'password'>;

/** Users */
export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });

export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'email' | 'name'>;

/** Notes */
const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

/** Tasks */
export const taskStatusSchema = z.enum([
  'pending',
  'onHold',
  'inProgress',
  'underReview',
  'completed',
]);

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: taskStatusSchema,
    })
  ),
  notes: z.array(
    noteSchema.extend({
      createdBy: userSchema,
    })
  ),
});

export const tasksSchema = z.array(taskSchema.omit({
  completedBy: true,
  notes: true
}));

export type Task = z.infer<typeof taskSchema>;
export type Tasks = z.infer<typeof tasksSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;

/** Projects */
export const projectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  client: z.string(),
  description: z.string(),
  tasks: z.array(
    taskSchema.omit({
      completedBy: true,
      notes: true,
    })
  ),
  manager: z.string(userSchema.pick({ _id: true })),
});

export const dashboardProjectItemSchema = projectSchema.pick({
  _id: true,
  name: true,
  description: true,
  client: true,
  manager: true,
});

export const dashboardProjectSchema = z.array(dashboardProjectItemSchema);

export type ProjectItem = z.infer<typeof dashboardProjectItemSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'name' | 'client' | 'description'>;

/** Team */
export const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true,
});

export const TeamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;
