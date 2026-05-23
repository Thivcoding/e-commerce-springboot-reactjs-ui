import {
  addToCartApi,
  createCartApi,
  getCartApi,
  removeCartItemApi,
  updateCartItemApi,
} from "../api/cartApi";

const getBody = (res) => res?.data?.body || res?.data;

export const getCartService = async () => {
  try {
    const res = await getCartApi();
    return getBody(res);
  } catch (err) {
    if (err?.response?.status === 404) {
      await createCartApi();

      const retry = await getCartApi();
      return getBody(retry);
    }

    throw err;
  }
};

export const addToCartService = async (productId, quantity = 1) => {
  try {
    const res = await addToCartApi({
      productId,
      quantity,
    });

    return getBody(res);
  } catch (err) {
    if (err?.response?.status === 500) {
      await createCartApi();

      const retry = await addToCartApi({
        productId,
        quantity,
      });

      return getBody(retry);
    }

    throw err;
  }
};

export const updateCartItemService = async (id, quantity) => {
  const res = await updateCartItemApi(id, quantity);

  return getBody(res);
};

export const removeCartItemService = async (id) => {
  const res = await removeCartItemApi(id);

  return getBody(res);
};