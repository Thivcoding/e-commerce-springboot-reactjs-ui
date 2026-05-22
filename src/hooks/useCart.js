import { useCartContext } from "../contexts/CartContext";

export const useCart = () => {
  return useCartContext();
};

export default useCart;
