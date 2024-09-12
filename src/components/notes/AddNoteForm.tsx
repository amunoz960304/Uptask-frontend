import { useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NoteFormData } from '@/types';
import ErrorMessage from '../ErrorMessage';
import { addNote } from '@/services/NoteAPI';

const AddNoteForm = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const taskId = searchParams.get('viewTask')!;
  const projectId = params.projectId!;

  const initialValues: NoteFormData = {
    content: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addNote,
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      reset();
    },
  });

  const handleAddNote = (formData: NoteFormData) => {
    mutate({
      formData,
      projectId,
      taskId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className='space-y-3'
      noValidate
    >
      <div className='flex flex-col gap-2'>
        <label className='font-bold' htmlFor='content'>
          Crear Nota
        </label>
        <input
          id='content'
          type='text'
          placeholder='Contenido de la nota'
          className='w-full p-3 border border-gray-300'
          {...register('content', {
            required: 'El contenido de la nota es obligatorio',
          })}
        />
        {errors.content && <ErrorMessage message={errors.content.message!} />}
      </div>

      <input
        type='submit'
        value='Crear nota'
        className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-bold cursor-pointer'
      />
    </form>
  );
};

export default AddNoteForm;
