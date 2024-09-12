import EditProjectForm from '@/components/projects/EditProjectForm';
import { getProject } from '@/services/ProjectAPI';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';

const EditProjectPage = () => {
  const { projectId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProject(projectId!),
    retry: false,
  });

  if (isLoading) return 'Cargando...';
  if (isError) return <Navigate to={'/404'} />;
  if (data) return <EditProjectForm project={data} />;
};

export default EditProjectPage;
 