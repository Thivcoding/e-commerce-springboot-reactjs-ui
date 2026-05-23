import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  addToCartService,
  getCartService,
  removeCartItemService,
  updateCartItemService,
} from "../services/cartService";

import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext();

const emptyCart = {
  id: null,
  items: [],
  subtotal: 0,
  totalItems: 0,
};

export const CartProvider = ({ children }) => {
  const { token } = useAuth();

  const [cart, setCart] = useState(emptyCart);
  const [loading, setLoading] = useState(false);

    const normalizeCart = (data) => {
    const items = Array.isArray(data?.items) ? data.items : [];

    const mapped = items.map((item) => ({
      id: item.id,
      quantity: item.quantity ?? 1,
      productId: item.productId,
      name: item.productName ?? "Unknown product",
      price: item.price ?? 0,
      imageUrl: item.imageUrl ?? "https://via.placeholder.com/300",
      subtotal: (item.price ?? 0) * (item.quantity ?? 1),
    }));

    return {
      id: data?.id ?? null,   
      items: mapped,
      subtotal: mapped.reduce((a, b) => a + b.subtotal, 0),
      totalItems: mapped.reduce((a, b) => a + b.quantity, 0),
    };
  };

  const refreshCart = useCallback(async () => {
    if (!token) {
      setCart(emptyCart);
      return;
    }

    try {
      setLoading(true);

      const data = await getCartService();

      setCart(normalizeCart(data));
    } catch (err) {
      console.error(err);
      setCart(emptyCart);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const addItem = async (productId, quantity = 1) => {
    await addToCartService(productId, quantity);
    await refreshCart();
  };

  const updateItem = async (id, quantity) => {
    await updateCartItemService(id, quantity);
    await refreshCart();
  };

  const removeItem = async (id) => {
    await removeCartItemService(id);
    await refreshCart();
  };

  const clearCart = async () => {
    try {
      await Promise.all(
        cart.items.map((item) =>
          removeCartItemService(item.id),
        ),
      );

      await refreshCart();
    } catch (err) {
      console.error(err);
    }
  };

  const value = useMemo(
    () => ({
      cart,
      cartId: cart.id,

      // IMPORTANT
      cartItems: cart.items,
      subtotal: cart.subtotal,
      totalItems: cart.totalItems,

      loading,

      refreshCart,

      addItem,

      // rename updateItem -> updateQuantity
      updateQuantity: updateItem,

      removeItem,

      clearCart,
    }),
    [cart, loading, refreshCart],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
