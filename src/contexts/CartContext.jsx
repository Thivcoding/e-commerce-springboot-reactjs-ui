import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "../hooks/useAuth";
import {
  addToCartService,
  clearCartService,
  getCartService,
  removeCartItemService,
  updateCartItemService,
} from "../services/cartService";

const emptyCart = {
  items: [],
  subtotal: 0,
  totalItems: 0,
};

const extractCartItems = (payload) => {
  const source = payload?.body ?? payload ?? {};

  if (Array.isArray(source)) return source;
  if (Array.isArray(source.items)) return source.items;
  if (Array.isArray(source.cartItems)) return source.cartItems;
  if (Array.isArray(source.cartItemList)) return source.cartItemList;
  if (source?.cart && Array.isArray(source.cart.items)) return source.cart.items;
  if (source?.cart && Array.isArray(source.cart.cartItems)) return source.cart.cartItems;

  return [];
};

const normalizeCart = (payload) => {
  const rawItems = extractCartItems(payload);

  const items = rawItems.map((item, index) => {
    const product = item?.product ?? item;
    const productId =
      item?.productId ?? product?.id ?? product?._id ?? item?.id;

    return {
      id:
        item?.id ??
        item?.cartItemId ??
        item?.itemId ??
        `${productId}-${index}`,
      productId,
      name: product?.name ?? item?.productName ?? "Product",
      price: Number(product?.price ?? item?.price ?? 0),
      quantity: Number(item?.quantity ?? 1),
      stock: Number(product?.stock ?? item?.stock ?? 0),
      imageUrl:
        product?.images?.[0]?.imageUrl ||
        product?.imageUrl ||
        item?.imageUrl ||
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
      categoryName: product?.categoryName ?? item?.categoryName ?? "General",
      subtotal:
        Number(product?.price ?? item?.price ?? 0) *
        Number(item?.quantity ?? 1),
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    subtotal,
    totalItems,
  };
};

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState(emptyCart);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!token) {
      setCart(emptyCart);
      return;
    }

    try {
      setLoading(true);
      const response = await getCartService();
      setCart(normalizeCart(response));
    } catch (error) {
      console.error("GET CART ERROR", error);
      setCart(emptyCart);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const addItem = useCallback(
    async (productId, quantity = 1) => {
      if (!token) {
        throw new Error("Please login to add items to cart.");
      }

      await addToCartService({
        productId,
        quantity: Number(quantity) || 1,
      });

      await refreshCart();
    },
    [refreshCart, token],
  );

  const updateQuantity = useCallback(
    async (itemId, quantity) => {
      await updateCartItemService(itemId, Number(quantity));
      await refreshCart();
    },
    [refreshCart],
  );

  const removeItem = useCallback(
    async (itemId) => {
      await removeCartItemService(itemId);
      await refreshCart();
    },
    [refreshCart],
  );

  const clearCart = useCallback(async () => {
    await clearCartService();
    await refreshCart();
  }, [refreshCart]);

  const value = useMemo(
    () => ({
      cart,
      cartItems: cart.items,
      subtotal: cart.subtotal,
      totalItems: cart.totalItems,
      cartCount: cart.totalItems,
      loading,
      refreshCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [addItem, cart, clearCart, loading, refreshCart, removeItem, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
};

export default CartContext;
