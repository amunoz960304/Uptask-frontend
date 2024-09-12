import api from '@/lib/axios';
import {
  dashboardProjectSchema,
  projectSchema,
  type Project,
  type ProjectFormData,
} from '@/types';
import { isAxiosError } from 'axios';

export const createProject = async (project: ProjectFormData) => {
  try {
    const { data } = await api.post('/projects', project);
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getProjects = async () => {
  try {
    const { data } = await api<string>('/projects');
    const result = dashboardProjectSchema.safeParse(data);

    if (result.success) {
      return result.data;
    }
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getProject = async (id: Project['_id']) => {
  try {
    const { data } = await api(`/projects/${id}`);
    const result = projectSchema.safeParse(data);

    if (result.success) {
      return result.data;
    }
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

type ProjectAPIType = {
  project: ProjectFormData;
  id: Project['_id'];
};

export const updateProject = async ({ id, project }: ProjectAPIType) => {
  try {
    const { data } = await api.put(`/projects/${id}`, project);
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const deleteProject = async (id: Project['_id']) => {
  try {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
