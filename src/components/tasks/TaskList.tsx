import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateStatus } from '@/services/TaskAPI';
import { useParams } from 'react-router-dom';
import { Task, Project, type Tasks } from '@/types';
import TaskCard from './TaskCard';
import { statusTranslations } from '@/locales/es';
import DropTask from './DropTask';

type TaskListProps = {
  tasks: Tasks;
  canEdit: boolean;
};

type GroupTask = {
  [key: string]: Task[];
};

const initialStatusGroup: GroupTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusStyles: { [key: string]: string } = {
  pending: 'border-t-slate-500',
  onHold: 'border-t-red-500',
  inProgress: 'border-t-blue-500',
  underReview: 'border-t-amber-500',
  completed: 'border-t-emerald-500',
};

const TaskList = ({ tasks, canEdit }: TaskListProps) => {
  const params = useParams();
  const projectId = params.projectId!;

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroup);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as Task['status'];
      mutate({
        projectId,
        taskId,
        status,
      });

      queryClient.setQueryData(['project', projectId], (oldData: Project) => {
        const updatedTask = oldData.tasks.map((task) => {
          if (task._id === taskId) {
            return {
              ...task,
              status,
            };
          }
          return task;
        });

        return {
          ...oldData,
          tasks: updatedTask,
        };
      });
    }
  };

  return (
    <>
      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
              <h3
                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
              >
                {statusTranslations[status]}
              </h3>
              <DropTask status={status} />
              <ul className='mt-5 space-y-5'>
                {tasks.length === 0 ? (
                  <li className='text-gray-500 text-center pt-3'>
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
};

export default TaskList;
