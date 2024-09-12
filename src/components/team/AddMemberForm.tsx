import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import ErrorMessage from '../ErrorMessage';
import type { TeamMemberForm } from '@/types';
import { findMember } from '@/services/TeamAPI';
import SearchResult from './SearchResult';


const AddMemberForm = () => {
  const initialValues: TeamMemberForm = {
    email: '',
  };
  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: findMember,
  });

  const handleSearchUser = async (formData: TeamMemberForm) => {
    mutation.mutate({ formData, projectId });
  };

  const resetData = () => {
    reset();
    mutation.reset();
  }

  return (
    <>
      <form
        className='mt-10 space-y-5'
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className='flex flex-col gap-3'>
          <label className='font-normal text-2xl' htmlFor='name'>
            E-mail de Usuario
          </label>
          <input
            id='name'
            type='text'
            placeholder='E-mail del usuario a Agregar'
            className='w-full p-3  border-gray-300 border'
            {...register('email', {
              required: 'El Email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'E-mail no válido',
              },
            })}
          />
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </div>

        <input
          type='submit'
          className=' bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
          value='Buscar Usuario'
        />
      </form>
      <div className='mt-10'>
        {mutation.isPending && <p className='text-center'>Cargando......</p>}
        {mutation.isError && (
          <p className='text-center'>{mutation.error.message}</p>
        )}
        {mutation.data && <SearchResult user={mutation.data} resetData={resetData}/>}
      </div>
    </>
  );
};

export default AddMemberForm;
