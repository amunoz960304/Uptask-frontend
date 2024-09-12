import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/AuthAPI';

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getUser,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading };
};
