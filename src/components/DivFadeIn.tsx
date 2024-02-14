import React, { useEffect, useState } from 'react';

export const DivFadeIn = (props: React.ComponentPropsWithoutRef<'div'>) => {
  const { className: propClassName, ...rest } = props;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      {...rest}
      className={`${propClassName} transition-opacity delay-75 duration-200 ease-linear ${
        !isLoaded && ' invisible opacity-0'
      }`}
    ></div>
  );
};
