import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import type { ConfirmToken, NewPasswordForm } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { newPassword } from '@/services/AuthAPI';

type NewPasswordFormProps = {
  token: ConfirmToken['token'];
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewPasswordForm = ({
  token,
  setToken,
  setIsValidToken,
}: NewPasswordFormProps) => {
  const navigate = useNavigate();
  const initialValues: NewPasswordForm = {
    password: '',
    password_confirmation: '',
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: newPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      setToken('');
      setIsValidToken(false);
      navigate('/auth/login');
    },
  });

  const handleNewPassword = (formData: NewPasswordForm) => {
    mutate({
      token,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
    });
  };

  const password = watch('password');

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className='space-y-8 p-10  bg-white mt-10'
        noValidate
      >
        <div className='flex flex-col gap-5'>
          <label className='font-normal text-2xl'>Password</label>

          <input
            type='password'
            placeholder='Password de Registro'
            className='w-full p-3  border-gray-300 border'
            {...register('password', {
              required: 'El Password es obligatorio',
              minLength: {
                value: 8,
                message: 'El Password debe ser mínimo de 8 caracteres',
              },
            })}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message!} />
          )}
        </div>

        <div className='flex flex-col gap-5'>
          <label className='font-normal text-2xl'>Repetir Password</label>

          <input
            id='password_confirmation'
            type='password'
            placeholder='Repite Password de Registro'
            className='w-full p-3  border-gray-300 border'
            {...register('password_confirmation', {
              required: 'Repetir Password es obligatorio',
              validate: (value) =>
                value === password || 'Los Passwords no son iguales',
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage message={errors.password_confirmation.message!} />
          )}
        </div>

        <input
          type='submit'
          value='Establecer Password'
          className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
        />
      </form>
    </>
  );
};

export default NewPasswordForm;
