import { Oval as Spinner } from 'react-loader-spinner';
import { DivFadeIn } from './DivFadeIn';

export const LoadingIndicator = () => {
  return (
    <DivFadeIn className='fixed inset-0 z-20 flex items-center justify-center bg-white/30 delay-150'>
      <Spinner
        strokeWidth={5}
        color='#525252'
        secondaryColor='#a3a3a3'
        /*  margin={22} */
      />
    </DivFadeIn>
  );
};
