import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProjectForm from '@/components/projects/ProjectForm';
import { createProject } from '@/services/ProjectAPI';
import type { ProjectFormData } from '@/types';

const CreateProjectPage = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate('/');
    },
  });

  const initialValues: ProjectFormData = {
    name: '',
    client: '',
    description: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const handleForm = (project: ProjectFormData) => mutate(project);

  return (
    <>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-5xl font-black'>Crear Proyecto</h1>
        <p className='text-2xl font-light text-gray-500 mt-5'>
          Llena el siguiente formulario para crear un proyecto
        </p>
        <nav className='my-5'>
          <Link
            to='/'
            className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
          >
            Volver a Proyectos
          </Link>
        </nav>

        <form
          className='mt-10 bg-white shadow p-10 rounded-lg'
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm errors={errors} register={register} />
          <input
            className='bg-fuchsia-600 w-full p-3 text-white uppercase hover:bg-fuchsia-700 font-bold cursor-pointer transition-colors'
            type='submit'
            value='Crear Proyecto'
          />
        </form>
      </div>
    </>
  );
};

export default CreateProjectPage;
