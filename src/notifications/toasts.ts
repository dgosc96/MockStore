import toast from 'react-hot-toast';

export const toastCartItemAdd = () => {
  toast.success('Your item has been added to the cart. Happy shopping! ');
};

export const toastCartItemRemove = () =>
  toast('Item removed! Your cart has been updated', {
    icon: '🗑️',
  });

export const toastCartItemFull = () =>
  toast.error('You cannot add more of this item.');
