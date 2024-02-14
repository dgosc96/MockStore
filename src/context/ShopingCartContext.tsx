import { createContext, useContext, type ReactNode, useState } from 'react';
import { useLocalStorage } from '../utils/hooks/useLocalStorage';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShopingCartContext = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  setItemQuantity: (
    id: number,
    value: number | ((currVal: number) => number),
  ) => void;
  increaseCartQuantity: (id: number) => boolean;
  decreaseCartQuantity: (id: number) => boolean;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: Array<CartItem>;
};

export type CartItem = {
  id: number;
  quantity: number;
};

export const ShopingCartContext = createContext({} as ShopingCartContext);

export const useShoppingCart = () => {
  return useContext(ShopingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const PARAMS = {
    MAX_ITEM_QUANTITY: 99,
    MIN_ITEM_QUANTITY: 1,
  };

  const [isOpen, setIsOpen] = useState(false);

  const [cartItems, setCartItems] = useLocalStorage<Array<CartItem>>(
    'shopping-cart',
    [],
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const setItemQuantity = (
    id: number,
    value: number | ((currVal: number) => number),
  ) => {
    setCartItems((currItems) => {
      const targetItemIndex = currItems.findIndex((item) => item.id === id);
      if (targetItemIndex === -1) {
        return [
          ...currItems,
          {
            id,
            quantity: typeof value === 'number' ? value : value(0),
          },
        ];
      }
      return currItems.map((item) => {
        if (item.id !== id) return item;

        let newQuantity =
          typeof value === 'number' ? value : value(item.quantity);

        return {
          ...item,
          quantity: Math.min(
            Math.max(PARAMS.MIN_ITEM_QUANTITY, newQuantity),
            PARAMS.MAX_ITEM_QUANTITY,
          ),
        };
      });
    });
  };

  const increaseCartQuantity = (id: number) => {
    if (getItemQuantity(id) < PARAMS.MAX_ITEM_QUANTITY) {
      setItemQuantity(id, (currValue) => currValue + 1);
      return true;
    }
    return false;
  };

  const decreaseCartQuantity = (id: number) => {
    if (getItemQuantity(id) > PARAMS.MIN_ITEM_QUANTITY) {
      setItemQuantity(id, (currValue) => currValue - 1);
      return true;
    }
    return false;
  };
  const removeFromCart = (id: number) => {
    setCartItems((currItems) => currItems.filter((item) => item.id != id));
  };

  return (
    <ShopingCartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        getItemQuantity,
        setItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
};
