import { type TProduct } from '../../../../api/products';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '../../../';

export const ProductTile = (props: { data: TProduct; onLoad: () => void }) => {
  const linkPath = `${ROUTER_PATH.PRODUCT_DETAILS}/${props.data.id}`;

  return (
    <Link to={linkPath}>
      <div className=' flex h-44 overflow-hidden rounded-xl shadow-tile transition-all duration-200 ease-out hover:scale-105 hover:shadow-tile-up sm:aspect-[2/3] sm:h-[27rem] sm:flex-col '>
        <div className=' w-[45%] flex-none bg-white brightness-[0.98] sm:h-3/4 sm:w-full'>
          <img
            alt={props.data.title}
            onLoad={() => props.onLoad()}
            className={`h-full w-full bg-white object-contain p-1 `}
            src={props.data.image}
          />
        </div>
        <div className='mx-2 my-4 flex flex-col justify-between text-sm font-semibold uppercase tracking-wider sm:mx-3 sm:my-3 sm:basis-1/4'>
          <span className='line-clamp-4 sm:line-clamp-2 '>
            {props.data.title}
          </span>
          <div className='flex justify-between'>
            <span>${props.data.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
