import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ProjectItem from '@/components/projects/ProjectItem';
import { useAuth } from '@/hooks/useAuth';
import { getProjects } from '@/services/ProjectAPI';
import DeleteProjectModal from '@/components/projects/DeleteProjectModal';

const DashboardPage = () => {
  const { data: user, isLoading: authLoading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  if (isLoading && authLoading) return 'Cargando...';

  if (data && user) {
    return (
      <>
        <h1 className='text-5xl font-black'>Mis Proyectos</h1>
        <p className='text-2xl font-light text-gray-500 mt-5'>
          Maneja y administra tus proyectos
        </p>
        <nav className='my-5'>
          <Link
            to='/projects/create'
            className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
          >
            Nuevo Proyecto
          </Link>
        </nav>

        {data.length ? (
          <ul
            role='list'
            className='divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg'
          >
            {data.map((project) => (
              <ProjectItem key={project._id} project={project} user={user} />
            ))}
          </ul>
        ) : (
          <p className='tex-center py-20'>
            No hay proyectos aún {''}{' '}
            <Link
              className='text-fuchsia-500 font-bold'
              to={'/projects/create'}
            >
              Crear Proyecto
            </Link>
          </p>
        )}

        <DeleteProjectModal />
      </>
    );
  }
};

export default DashboardPage;
