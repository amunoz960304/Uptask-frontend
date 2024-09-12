import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TaskForm from './TaskForm';
import type { Task, TaskFormData } from '@/types';
import { editTask } from '@/services/TaskAPI';

type EditTaskModalProps = {
  data: TaskFormData;
  taskId: Task['_id'];
};

const EditTaskModal = ({ data, taskId }: EditTaskModalProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const show = Boolean(taskId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: { name: data.name, description: data.description },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: editTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] });
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleForm = (formData: TaskFormData) => {
    mutate({
      projectId,
      formData,
      taskId,
    });
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/60' />
          </TransitionChild>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <DialogPanel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16'>
                  <DialogTitle as='h3' className='font-black text-4xl my-5'>
                    Editar Tarea
                  </DialogTitle>

                  <p className='text-xl font-bold'>
                    Realiza cambios a una tarea en {''}
                    <span className='text-fuchsia-600'>este formulario</span>
                  </p>

                  <form
                    className='mt-10 space-y-3'
                    noValidate
                    onSubmit={handleSubmit(handleForm)}
                  >
                    <TaskForm register={register} errors={errors} />
                    <input
                      type='submit'
                      className='bg-fuchsia-600 w-full p-3 text-white uppercase hover:bg-fuchsia-700 font-bold cursor-pointer transition-colors'
                      value={'Guardar Tarea'}
                    />
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditTaskModal;
