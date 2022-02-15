const calcCartTotal = (cart) => {
  if (!cart) return null;
  return cart.reduce((acc, cartProduct) => {
    return acc + cartProduct.quantity * cartProduct.product.productPrice;
  }, 0);
};

export default calcCartTotal;
