import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import AddMemberModal from '@/components/team/AddMemberModal';
import { getProjectTeam } from '@/services/TeamAPI';
import TeamList from '@/components/team/TeamList';

const ProjectTeamPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  });

  if (isLoading) return 'Cargando...';
  if (isError) return <Navigate to={'/404'} />;

  if (data)
    return (
      <>
        <h1 className='text-5xl font-black'>Administrar Equipo</h1>
        <p className='text-2xl font-light text-gray-500 mt-5'>
          Administra el equipo de trabajo para este proyecto
        </p>

        <nav className='my-5 flex gap-3'>
          <button
            type='button'
            className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
            onClick={() => navigate(`${location.pathname}?addMember=true`)}
          >
            Agregar Colaborador
          </button>
          <Link
            className='bg-fuchsia-400 hover:bg-fuchsia-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
            to={`/projects/${projectId}`}
          >
            Volver a Projecto
          </Link>
        </nav>
          <AddMemberModal />
          <TeamList team={data}/>
      </>
    );
};

export default ProjectTeamPage;
