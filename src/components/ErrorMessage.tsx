type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className='text-center my-4 bg-red-100 text-red-600 font-bold py-3 text-sm uppercase'>
      {message}
    </div>
  );
};

export default ErrorMessage;
