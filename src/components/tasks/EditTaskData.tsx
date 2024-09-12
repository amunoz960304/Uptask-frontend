import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { getTask } from '@/services/TaskAPI';
import EditTaskModal from './EditTaskModal';

const EditTaskData = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('taskId')!;

  const { data, isError } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTask({ projectId, taskId }),
    enabled: !!taskId,
    retry: 1,
  });

  if (isError) return <Navigate to={'/404'} />;
  if (data) return <EditTaskModal data={data} taskId={taskId} />;
};

export default EditTaskData;
