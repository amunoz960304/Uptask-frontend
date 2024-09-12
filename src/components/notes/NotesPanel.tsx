import type { Task } from '@/types';
import AddNoteForm from './AddNoteForm';
import NotesDetail from './NotesDetail';

type NotesPanelType = {
  notes: Task['notes'];
};

const NotesPanel = ({ notes }: NotesPanelType) => {
  return (
    <>
      <AddNoteForm />
      <div className='divide-y divide-gray-100 mt-10'>
        {notes.length ? (
          <>
            <p className='font-bold text-2xl text-slate-600 my-5'>Notas:</p>
            {notes.map((note) => (
              <NotesDetail key={note._id} note={note} />
            ))}
          </>
        ) : (
          <p className='text-gray-500 text-center pt-3'>No Hay notas</p>
        )}
      </div>
    </>
  );
};

export default NotesPanel;
