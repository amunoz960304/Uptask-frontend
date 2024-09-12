import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { Project, ProjectFormData } from '@/types';
import ProjectForm from './ProjectForm';
import { updateProject } from '@/services/ProjectAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type EditProjectFormProps = {
  project: Project;
};

const EditProjectForm = ({ project }: EditProjectFormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: project.name,
      client: project.client,
      description: project.description,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['editProject', project._id] });
      toast.success(data);
      navigate('/');
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      project: formData,
      id: project._id,
    };
    mutate(data);
  };

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
            value='Editar Proyecto'
          />
        </form>
      </div>
    </>
  );
};

export default EditProjectForm;
