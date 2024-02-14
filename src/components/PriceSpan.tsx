import React from 'react';

type PriceSpanProps = {
  price: number;
};

const PriceSpan = ({
  price,
  ...spanProps
}: PriceSpanProps & React.ComponentPropsWithoutRef<'span'>) => {
  const priceFormatted = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(price)
    .split('.');
  return (
    <span {...spanProps}>
      {priceFormatted[0]}
      <span className='align-[0.3em] text-[0.7em] leading-none opacity-60'>{`.${priceFormatted[1]}`}</span>
    </span>
  );
};

export default PriceSpan;
