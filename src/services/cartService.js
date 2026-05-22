// src/services/cartService.js

import {
  addToCartApi,
  createCartApi,
  getMyCartApi,
  removeCartItemApi,
  updateCartItemApi,
} from "../api/cartApi";

const emptyCart = {
  id: null,
  items: [],
  cartItems: [],
  subtotal: 0,
  totalItems: 0,
};

const getCartBody = (response) =>
  response?.data?.body ?? response?.data ?? response;

const getCartItems = (cart = {}) => {
  if (Array.isArray(cart?.items)) return cart.items;
  if (Array.isArray(cart?.cartItems)) return cart.cartItems;
  if (Array.isArray(cart?.cartItemList)) return cart.cartItemList;
  return [];
};

const getCartItemId = (item = {}) =>
  item?.id ?? item?.cartItemId ?? item?.itemId;

const normalizeProductId = (value) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

const normalizeQuantity = (value) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
};

export const getCartService = async () => {
  try {
    const response = await getMyCartApi();
    return getCartBody(response);
  } catch (error) {
    const status = error?.response?.status;

    if (status === 404 || status === 500) {
      try {
        await createCartApi();
        const retryResponse = await getMyCartApi();

        return getCartBody(retryResponse);
      } catch (retryError) {
        console.log("GET CART RETRY ERROR :", retryError);
        throw retryError;
      }
    }

    console.log("GET CART ERROR :", error);
    throw error;
  }
};

export const addToCartService = async (data) => {
  const productId = normalizeProductId(data?.productId);
  const quantity = normalizeQuantity(data?.quantity);

  if (productId === null) {
    throw new Error("Invalid product ID for add to cart.");
  }

  const payload = {
    productId,
    quantity,
  };

  try {
    const response = await addToCartApi(payload);

    return getCartBody(response);
  } catch (error) {
    const status = error?.response?.status;

    if (status === 500) {
      try {
        await createCartApi();
      } catch {
        // ignore create-cart failure and retry the original add once
      }

      try {
        const retryResponse = await addToCartApi(payload);

        return getCartBody(retryResponse);
      } catch (retryError) {
        console.log("ADD TO CART RETRY ERROR :", retryError);
        throw retryError;
      }
    }

    console.log("ADD TO CART ERROR :", error);
    throw error;
  }
};

export const updateCartItemService = async (id, quantity) => {
  try {
    const response = await updateCartItemApi(id, Number(quantity));

    return getCartBody(response);
  } catch (error) {
    console.log("UPDATE CART ERROR :", error);
    throw error;
  }
};

export const removeCartItemService = async (id) => {
  try {
    const response = await removeCartItemApi(id);

    return getCartBody(response);
  } catch (error) {
    console.log("REMOVE CART ERROR :", error);
    throw error;
  }
};

export const clearCartService = async () => {
  try {
    const cart = await getCartService().catch(() => emptyCart);
    const items = getCartItems(cart);

    if (!items.length) {
      return cart;
    }

    await Promise.all(
      items
        .map(getCartItemId)
        .filter(Boolean)
        .map((itemId) => removeCartItemApi(itemId)),
    );

    return getCartService();
  } catch (error) {
    console.log("CLEAR CART ERROR :", error);
    throw error;
  }
};

export const createCartService = async () => {
  try {
    const response = await createCartApi();

    return getCartBody(response);
  } catch (error) {
    console.log("CREATE CART ERROR :", error);
    throw error;
  }
};
