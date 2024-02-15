import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '../../lib/firebase/firebase';
import { useState } from 'react';
import { toastSingedIn } from '../../lib/notifications/toasts';

export const Login = () => {
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    if (email && password) {
      handleSignIn(email, password);
      event.currentTarget.reset();
    }
  };

  const handleSignIn = (email: string, password: string) =>
    signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('loginHandler SUCCESSFUL: ', userCredential);
        toastSingedIn(
          (userCredential.user.displayName
            ? userCredential.user.displayName
            : userCredential.user.email) + '',
        );
        navigate('/');
        if (error) setError('');
      })
      .catch((err) => {
        if (err.code === 'auth/invalid-login-credentials') {
          setError('The email or password is incorrect. Try again.');
        } else {
          setError('Something went wrong. Try again later.');
        }
        console.log('loginHandler ERROR: ', err);
      });

  return (
    <div className='mx-auto mt-16 flex max-w-lg flex-col rounded-lg border px-6 py-6 '>
      <h1 className='mb-10 text-center'>Login</h1>
      <form onSubmit={handleSubmit} className=' flex grow flex-col gap-4'>
        <div className=' flex flex-col gap-0.5'>
          <label className=' text-sm font-medium text-gray-700' htmlFor='email'>
            Email
          </label>
          <input
            required
            id='email'
            placeholder='Enter Email'
            autoComplete='username'
            type='email'
            className='w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none '
          />
        </div>

        <div className='flex flex-col gap-0.5'>
          <label
            className=' text-sm font-medium text-gray-700'
            htmlFor='password'
          >
            Password
          </label>
          <div className=''>
            <input
              required
              id='password'
              placeholder='Enter Password'
              autoComplete='current-password'
              type='password'
              className='w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none '
            />
          </div>
        </div>

        <div className='my-1 flex justify-between text-xs'>
          <div className='space-x-1'>
            <input id='remember-me' type='checkbox' />
            <label htmlFor='remember-me'>Keep me signed in</label>
          </div>

          <p className='text-gray-400'>Forgot your password?</p>
        </div>
        {error && <span className=' text-sm text-red-500  '>{error}</span>}
        <div className=' flex flex-col items-stretch gap-3'>
          <button
            type='submit'
            className=' w-full rounded-lg bg-neutral-800 px-4 py-2 font-medium text-white transition duration-300 hover:bg-neutral-700 active:scale-[0.99] active:duration-0'
          >
            Login
          </button>
          <button
            className='w-full rounded-lg bg-neutral-200 px-4 py-2 font-medium transition duration-300 hover:bg-neutral-300 active:scale-[0.99] active:duration-0'
            onClick={(e) => {
              e.preventDefault();
              handleSignIn('test@test.com', 'test1234');
            }}
          >
            Login with Test Credentials
          </button>
        </div>
        <Link className='mb-3 text-center text-sm text-gray-400' to='/signup'>
          Create a new account?
        </Link>
      </form>
    </div>
  );
};
