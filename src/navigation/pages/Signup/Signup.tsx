import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  validatePassword,
} from '../../../lib/firebase/firebase';
import { updateProfile } from 'firebase/auth';
import { toastSingedUp } from '../../../lib/notifications/toasts';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [terms, setTerms] = useState(false);

  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateInput().then((result) => {
      if (!result) return;
      console.log('Validation RESULT: ' + result);
      createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          updateProfile(userCredential.user, { displayName: username }).then(
            () => navigate('/'),
          );
          toastSingedUp();
          navigate('/');
        })
        .catch((error) => {
          console.log('SIGNUP ERROR: ', error);
          setError('Failed to create an account: ' + error.code);
        });
    });
  };

  const validateInput = async () => {
    if (password != confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    const validationStatus = await validatePassword(password);

    console.log(validationStatus);

    if (validationStatus.isValid) {
      setError('');
      return true;
    }
    if (validationStatus.containsUppercaseLetter === false) {
      setError('Your password must contain at least 1 uppercase letter.');
      return false;
    }
    if (validationStatus.containsLowercaseLetter === false) {
      setError('Your password must contain at least 1 lowercase letter.');
      return false;
    }
    if (validationStatus.containsNumericCharacter === false) {
      setError('Your password must contain at least 1 numeric character.');
      return false;
    }
    if (validationStatus.containsNonAlphanumericCharacter === false) {
      setError(
        'Your password must contain at least 1 non-alphanumeric character.',
      );
      return false;
    }
    if (validationStatus.meetsMaxPasswordLength === false) {
      setError('Your password is too long.');
      return false;
    }
    if (validationStatus.meetsMinPasswordLength === false) {
      setError(
        `Your password must be at least ${validationStatus.passwordPolicy.customStrengthOptions.minPasswordLength} characters long.`,
      );
      return false;
    }
    setError('');
    return true;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto mt-10 max-w-lg rounded-lg border p-6'
    >
      <h1 className='mb-10 text-center'>Create a new Account</h1>
      <div className='mb-4'>
        <label
          htmlFor='firstName'
          className=' text-sm font-medium text-gray-700'
        >
          Username
        </label>
        <input
          id='firstName'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter Your Username'
          className='w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none '
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='email' className=' text-sm font-medium text-gray-700'>
          Email Address
        </label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Email'
          className='w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none '
          required
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='password'
          className=' text-sm font-medium text-gray-700'
        >
          Password
        </label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Password'
          className='w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none '
          required
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='confirmPassword'
          className=' text-sm font-medium text-gray-700'
        >
          Confirm Password
        </label>
        <input
          id='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Enter Password Again'
          className='w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none '
          required
        />
      </div>

      <div className='mb-4 flex'>
        <input
          id='terms'
          type='checkbox'
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className='h-4 w-4 rounded border-gray-300 '
          required
        />
        <label htmlFor='terms' className='ml-2 block text-sm text-gray-900'>
          I accept all terms and conditions
        </label>
      </div>
      {error && <span className=' text-sm text-red-500  '>{error}</span>}
      <div className='mb-4'>
        <button
          type='submit'
          className=' w-full rounded-lg bg-neutral-800 px-4 py-2 font-medium text-white transition duration-300 hover:bg-neutral-700 active:scale-[0.99] active:duration-0'
        >
          Sign Up
        </button>
      </div>
      <div className='mb-4'>
        <button
          type='button'
          className='w-full rounded-lg bg-neutral-200 px-4 py-2 font-medium transition duration-300 hover:bg-neutral-300 active:scale-[0.99] active:duration-0'
        >
          Login with Test Credentials
        </button>
      </div>
      <p className='mb-3 text-center text-sm text-gray-400'>
        Already have an account?{' '}
        <Link
          to={'/login'}
          className='text-indigo-600 underline hover:text-indigo-700'
        >
          Login
        </Link>
      </p>
    </form>
  );
};
