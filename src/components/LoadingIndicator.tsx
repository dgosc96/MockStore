import { PulseLoader } from 'react-spinners';
import { DivFadeIn } from './DivFadeIn';

export const LoadingIndicator = () => {
  return (
    <DivFadeIn className='fixed inset-0 z-10 delay-150 '>
      <PulseLoader
        className='absolute top-1/3 w-full text-center '
        color='#dc2626'
        margin={10}
      />
    </DivFadeIn>
  );
};
