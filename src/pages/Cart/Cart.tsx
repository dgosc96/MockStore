import { useProductList, type TProduct } from '../../adapters/products';
import {
  useShoppingCart,
  type CartItem,
} from '../../context/ShopingCartContext';
import { ROUTER_PATH } from '../../navigation';
import { HiOutlineTrash } from 'react-icons/hi';
import { FaPlus as PlusIcon, FaMinus as MinusIcon } from 'react-icons/fa6';

import { DivFadeIn } from '../../components/DivFadeIn';
import IntervalRunnerButton from '../../components/IntervalRunnerButton';
import PriceSpan from '../../components/PriceSpan';
import { Link, useNavigate } from 'react-router-dom';
import { toastCartItemRemove } from '../../lib/notifications/toasts';
import { useState } from 'react';

export const Cart = () => {
  const { cartItems, cartQuantity } = useShoppingCart();
  const { data: products } = useProductList();
  let subtotal = 0;

  const mapCartItems = () => {
    return cartItems.map((item) => {
      const product = products?.find(({ id }) => id === item.id);
      if (!product) return;
      subtotal += product.price * item.quantity;
      return (
        <CartItemComponent
          key={`cart-item_${item.id}`}
          item={{ ...product, quantity: item.quantity }}
        />
      );
    });
  };
  if (cartQuantity === 0) {
    return (
      <h1 className='my-5 text-center text-4xl font-bold'>
        Your cart is empty :(
      </h1>
    );
  }
  return (
    <DivFadeIn className='my-10'>
      <h1 className='text-center text-5xl font-bold'>Your cart:</h1>
      <p className='text-center text-sm font-semibold text-gray-400'>
        ({cartQuantity} items)
      </p>
      <div className=' mt-14 flex flex-wrap justify-evenly gap-4'>
        <DivFadeIn className=' sm:space-y-5 '>{mapCartItems()}</DivFadeIn>
        <CartSummary subtotal={subtotal} />
      </div>
    </DivFadeIn>
  );
};

type CartItemComponentProps = {
  item: TProduct & CartItem;
};

const CartItemComponent = ({ item }: CartItemComponentProps) => {
  const cartItemLinkPath = `${ROUTER_PATH.PRODUCT_DETAILS}/${item.id}`;
  const navigate = useNavigate();

  const { removeFromCart } = useShoppingCart();

  const priceSum = item.price * item.quantity;

  return (
    <div className=' mx-2 flex max-w-md flex-col items-center justify-between gap-2 overflow-hidden border-t pt-3 first:border-0 sm:max-w-none sm:flex-row sm:border-none sm:pt-0'>
      <div className='group flex-none rounded-lg bg-white brightness-95'>
        <img
          className='m-2 aspect-square w-24 scale-75 cursor-pointer object-contain transition-transform group-hover:scale-100 '
          src={item.image}
          alt={item.title}
          onClick={() => navigate(cartItemLinkPath)}
        />
      </div>
      <div className='flex w-full flex-col justify-center text-center sm:w-[20rem] sm:text-left '>
        <Link
          to={cartItemLinkPath}
          className='font-semibold underline-offset-1 hover:underline'
        >
          {item.title}
        </Link>
        <span className='text-xs font-semibold text-gray-400 sm:indent-1'>
          {item.category}
        </span>
      </div>
      <QuantityModifier id={item.id} />
      <PriceSpan
        price={priceSum}
        className='w-20 text-center text-lg font-semibold sm:text-right'
      />
      <button
        className='m-2 aspect-square rounded-md bg-white object-right brightness-95 transition-colors delay-75 duration-200 hover:bg-red-500 hover:text-neutral-100'
        onClick={() => {
          removeFromCart(item.id);
          toastCartItemRemove();
        }}
      >
        <HiOutlineTrash size={'1.5rem'} className='m-[3px] stroke-[1.4px]' />
      </button>
    </div>
  );
};

type QuantityModifierProps = {
  id: number;
};
const QuantityModifier = ({ id }: QuantityModifierProps) => {
  const { getItemQuantity, setItemQuantity } = useShoppingCart();

  const [localVal, setLocalVal] = useState<number>(getItemQuantity(id));

  const decreaseLocal = () =>
    setLocalVal((prev) => (prev > 1 ? prev - 1 : prev));
  const increaseLocal = () =>
    setLocalVal((prev) => (prev < 99 ? prev + 1 : prev));

  const handleOnIntervalStop = () => {
    setItemQuantity(id, localVal);
  };

  return (
    <div className='mx-2 grid flex-none grid-flow-col justify-center overflow-hidden rounded-md border border-neutral-400 transition-transform'>
      <IntervalRunnerButton
        className='border-r border-inherit bg-inherit p-1 transition-colors hover:bg-neutral-100 active:bg-neutral-200'
        onPressedDown={() => decreaseLocal()}
        onStop={() => handleOnIntervalStop()}
      >
        <MinusIcon />
      </IntervalRunnerButton>
      <input
        type='number'
        name='cartItemQty'
        onClick={(e) => e.currentTarget.select()}
        min={1}
        value={localVal}
        onWheel={(e) => {
          e.currentTarget.blur();
        }}
        onChange={(e) => {
          const newVal = e.target.value === '' ? 0 : e.target.valueAsNumber;
          setItemQuantity(id, newVal);
          setLocalVal(() => Math.min(Math.max(1, newVal), 99));
        }}
        className='w-7 bg-inherit text-center font-semibold [appearance:textfield] hover:bg-neutral-100 focus:bg-neutral-200 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none '
      />
      <IntervalRunnerButton
        className='border-l border-inherit bg-inherit p-1 transition-colors hover:bg-neutral-100 active:bg-neutral-200'
        onPressedDown={() => increaseLocal()}
        onStop={() => handleOnIntervalStop()}
      >
        <PlusIcon />
      </IntervalRunnerButton>
    </div>
  );
};

type CartSummaryProps = {
  subtotal: number;
};

const CartSummary = ({ subtotal }: CartSummaryProps) => {
  return (
    <div className='sticky top-36 flex h-fit w-full flex-col items-stretch gap-3 border px-5 py-2 md:w-[25rem]'>
      <h2 className='text-xl font-bold'>Order Summary: </h2>
      <div className=' inline-flex justify-between'>
        <span>Subtotal:</span>
        <PriceSpan className='text-end' price={subtotal} />
      </div>
      <div className=' inline-flex justify-between'>
        <span>Discount:</span>
        <span className='text-end'>$0</span>
      </div>
      <div className=' inline-flex justify-between'>
        <span>Shipping:</span>
        <span className='text-end'>Free</span>
      </div>
      <div className=' inline-flex justify-between text-2xl font-bold'>
        <span>Total:</span>
        <PriceSpan price={subtotal} />
      </div>
      <Link
        to={`/${ROUTER_PATH.CHECKOUT}`}
        className='rounded-full bg-neutral-800 py-1 text-center text-xl text-neutral-50'
      >
        <span className=''>Place Order</span>
      </Link>
    </div>
  );
};
