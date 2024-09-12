import NewPasswordForm from '@/components/auth/NewPasswordForm';
import NewPasswordToken from '@/components/auth/NewPasswordToken';
import type { ConfirmToken } from '@/types';
import { useState } from 'react';

const NewPasswordPage = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const [token, setToken] = useState<ConfirmToken['token']>('');
  return (
    <>
      <h1 className='text-5xl font-black text-white'>Reestablecer password</h1>
      <p className='text-2xl font-light text-white mt-5'>
        Ingresa el codigo que recibiste {''}
        <span className=' text-fuchsia-500 font-bold'> por email</span>
      </p>
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      )}
    </>
  );
};

export default NewPasswordPage;
