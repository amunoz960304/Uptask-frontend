import ErrorMessage from '@/components/ErrorMessage';
import type { ProjectFormData } from '@/types';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

type ProjectFormProps = {
  errors: FieldErrors<ProjectFormData>;
  register: UseFormRegister<ProjectFormData>;
};

export default function ProjectForm({ errors, register }: ProjectFormProps) {
  return (
    <>
      <div className='mb-5 space-y-3'>
        <label htmlFor='projectName' className='text-sm uppercase font-bold'>
          Nombre del Proyecto
        </label>
        <input
          id='projectName'
          className='w-full p-3  border border-gray-200'
          type='text'
          placeholder='Nombre del Proyecto'
          {...register('name', {
            required: 'El Titulo del Proyecto es obligatorio',
          })}
        />

        {errors.name && <ErrorMessage message={errors.name.message!} />}
      </div>

      <div className='mb-5 space-y-3'>
        <label htmlFor='clientName' className='text-sm uppercase font-bold'>
          Nombre Cliente
        </label>
        <input
          id='clientName'
          className='w-full p-3  border border-gray-200'
          type='text'
          placeholder='Nombre del Cliente'
          {...register('client', {
            required: 'El Nombre del Cliente es obligatorio',
          })}
        />

        {errors.client && <ErrorMessage message={errors.client.message!} />}
      </div>

      <div className='mb-5 space-y-3'>
        <label htmlFor='description' className='text-sm uppercase font-bold'>
          Descripción
        </label>
        <textarea
          id='description'
          className='w-full p-3  border border-gray-200'
          placeholder='Descripción del Proyecto'
          {...register('description', {
            required: 'Una descripción del proyecto es obligatoria',
          })}
        />

        {errors.description && (
          <ErrorMessage message={errors.description.message!} />
        )}
      </div>
    </>
  );
}
