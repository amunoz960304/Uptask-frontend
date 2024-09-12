import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Note, NoteFormData, Project, Task } from '@/types';

type AddNoteType = {
  formData: NoteFormData;
  projectId: Project['_id'];
  taskId: Task['_id'];
};

type DeleteNoteType = {
  projectId: Project['_id'];
  taskId: Task['_id'];
  noteId: Note['_id'];
};

export const addNote = async ({ formData, projectId, taskId }: AddNoteType) => {
  try {
    const { data } = await api.post<string>(
      `/projects/${projectId}/task/${taskId}/notes`,
      formData
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const deleteNote = async ({
  projectId,
  taskId,
  noteId,
}: DeleteNoteType) => {
  try {
    const { data } = await api.delete<string>(
      `/projects/${projectId}/task/${taskId}/notes/${noteId}`
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
