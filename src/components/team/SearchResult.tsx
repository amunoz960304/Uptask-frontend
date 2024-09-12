import { addMember } from '@/services/TeamAPI';
import type { TeamMember } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type SearchResultProps = {
  user: TeamMember;
  resetData: () => void;
};

const SearchResult = ({ user, resetData }: SearchResultProps) => {
  const params = useParams();
  const projectId = params.projectId!;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addMember,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      resetData();
      navigate(location.pathname, { replace: true });
      queryClient.invalidateQueries({ queryKey: ['projectTeam'] });
    },
  });

  const handleAddMember = () => {
    mutate({
      id: user._id,
      projectId,
    });
  };

  return (
    <>
      <p className='mt-10 text-center font-bold'>Resultado:</p>
      <div className='flex justify-between items-center'>
        <p>{user.name}</p>
        <button
          className='text-purple-600 hover:text-purple-100 px-10 py-3 font-bold cursor-pointer'
          onClick={handleAddMember}
        >
          Agregar al Proyecto
        </button>
      </div>
    </>
  );
};

export default SearchResult;
