import api from '@/lib/axios';
import { teamMemberSchema, TeamMembersSchema } from '@/types';
import { isAxiosError } from 'axios';
import type { Project, TeamMember, TeamMemberForm } from '@/types';

type TeamMemberFind = {
  formData: TeamMemberForm;
  projectId: Project['_id'];
};

type TeamMemberAdd = {
  id: TeamMember['_id'];
  projectId: Project['_id'];
};

type TeamMemberDelete = {
  memberId: TeamMember['_id'];
  projectId: Project['_id'];
};

export const findMember = async ({ formData, projectId }: TeamMemberFind) => {
  try {
    const { data } = await api.post(
      `projects/${projectId}/team/find`,
      formData
    );
    const response = teamMemberSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const addMember = async ({ id, projectId }: TeamMemberAdd) => {
  try {
    const { data } = await api.post<string>(`projects/${projectId}/team/`, {
      id,
    });
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getProjectTeam = async (projectId: Project['_id']) => {
  try {
    const { data } = await api(`projects/${projectId}/team/`);
    const response = TeamMembersSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const deleteMember = async ({projectId, memberId}: TeamMemberDelete) => {
  try {
    const { data } = await api.delete<string>(`projects/${projectId}/team/${memberId}`);
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
