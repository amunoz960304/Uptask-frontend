import api from '@/lib/axios';
import {
  taskSchema,
  type Project,
  type Task,
  type TaskFormData,
} from '@/types';
import { isAxiosError } from 'axios';

type TaskAPI = {
  projectId: Project['_id'];
  formData: TaskFormData;
  status: Task['status'];
  taskId: Task['_id'];
};

export const createTask = async ({
  projectId,
  formData,
}: Omit<TaskAPI, 'status' | 'taskId'>) => {
  try {
    const { data } = await api.post<string>(
      `/projects/${projectId}/tasks`,
      formData
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Ocurrio un error');
    }
  }
};

export const getTask = async ({
  projectId,
  taskId,
}: Omit<TaskAPI, 'status' | 'formData'>) => {
  try {
    const { data } = await api(`/projects/${projectId}/tasks/${taskId}`);
    const result = taskSchema.safeParse(data);

    if (result.success) {
      console.log(result);
      return result.data;
    }
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Ocurrio un error');
    }
  }
};

export const editTask = async ({
  projectId,
  formData,
  taskId,
}: Omit<TaskAPI, 'status'>) => {
  try {
    const { data } = await api.put<string>(
      `/projects/${projectId}/tasks/${taskId}`,
      formData
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Ocurrio un error');
    }
  }
};

export const deleteTask = async ({
  projectId,
  taskId,
}: Omit<TaskAPI, 'formData' | 'status'>) => {
  try {
    const { data } = await api.delete<string>(
      `/projects/${projectId}/tasks/${taskId}`
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Ocurrio un error');
    }
  }
};

export const updateStatus = async ({
  projectId,
  taskId,
  status,
}: Omit<TaskAPI, 'formData'>) => {
  try {
    const { data } = await api.patch<string>(
      `/projects/${projectId}/tasks/${taskId}/status`,
      {
        status,
      }
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Ocurrio un error');
    }
  }
};
