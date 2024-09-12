import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import {
  userSchema,
  type ChangePasswordForm,
  type CheckPasswordForm,
  type ConfirmToken,
  type ForgotPasswordForm,
  type NewPasswordRequest,
  type RequestConfirmationCodeForm,
  type UserLoginForm,
  type UserProfileForm,
  type UserRegistrationForm,
} from '@/types';

export const register = async (registerFormData: UserRegistrationForm) => {
  try {
    const { data } = await api.post<string>(
      '/auth/create-account',
      registerFormData
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const confirmAccount = async (confirmToken: ConfirmToken) => {
  try {
    const { data } = await api.post<string>(
      '/auth/confirm-account',
      confirmToken
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const requestCode = async (
  requestConfirmationCodeForm: RequestConfirmationCodeForm
) => {
  try {
    const { data } = await api.post<string>(
      '/auth/request-code',
      requestConfirmationCodeForm
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const login = async (userLoginForm: UserLoginForm) => {
  try {
    const { data } = await api.post<string>('/auth/login', userLoginForm);
    localStorage.setItem('AUTH_TOKEN', data);
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const forgotPassword = async (
  forgotPasswordForm: ForgotPasswordForm
) => {
  try {
    const { data } = await api.post<string>(
      '/auth/forgot-password',
      forgotPasswordForm
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const validateToken = async (confirmTokenForm: ConfirmToken) => {
  try {
    const { data } = await api.post<string>(
      '/auth/validate-token',
      confirmTokenForm
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const newPassword = async ({
  token,
  password,
  password_confirmation,
}: NewPasswordRequest) => {
  try {
    const { data } = await api.post<string>(`/auth/new-password/${token}`, {
      password,
      password_confirmation,
    });
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getUser = async () => {
  try {
    const { data } = await api<string>(`/auth/user`);
    const response = userSchema.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const updateProfile = async (formData: UserProfileForm) => {
  try {
    const { data } = await api.put<string>(`/auth/profile`, formData);
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const updatePassword = async (formData: ChangePasswordForm) => {
  try {
    const { data } = await api.post<string>(`/auth/update-password`, formData);
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const checkPassword = async (formData: CheckPasswordForm) => {
  try {
    const { data } = await api.post<string>(`/auth/check-password`, formData);
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
