import { useDroppable } from '@dnd-kit/core';

type DropTaskProps = {
  status: string;
};

const DropTask = ({ status }: DropTaskProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const style = {
    opacity: isOver ? 0.4 : undefined,
  };

  return (
    <div
      className='text-xs font-semibold p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500 uppercase'
      ref={setNodeRef}
      style={style}
    >
      Soltar tarea aqui
    </div>
  );
};

export default DropTask;
