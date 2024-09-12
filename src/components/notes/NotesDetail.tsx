import type { Note } from '@/types';
import { formatDate } from '../../utils/index';
import { useAuth } from '@/hooks/useAuth';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams, useSearchParams } from 'react-router-dom';
import { deleteNote } from '@/services/NoteAPI';

type NoteDetailProps = {
  note: Note;
};

const NotesDetail = ({ note }: NoteDetailProps) => {
  const { isLoading, data } = useAuth();
  const canDelete = useMemo(() => note.createdBy._id === data?._id, [data]);

  const params = useParams();
  const [searchParams] = useSearchParams();

  const taskId = searchParams.get('viewTask')!;
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['task', note.task] });
    },
  });

  const handleDeleteNote = () => {
    mutate({
      noteId: note._id,
      projectId,
      taskId,
    });
  };

  if (isLoading) return 'Cargando...';
  return (
    <div className='p-3 flex justify-between items-center'>
      <div>
        <p>
          {note.content} por:{' '}
          <span className='font-bold'>{note.createdBy.name}</span>
        </p>
        <p className='text-xs text-slate-500'>{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          className='bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold transition-colors cursor-pointer'
          onClick={handleDeleteNote}
        >
          Eliminar
        </button>
      )}
    </div>
  );
};

export default NotesDetail;
