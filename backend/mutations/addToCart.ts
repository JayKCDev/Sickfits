import { Cart } from "./../schemas/Cart";
import { CartCreateInput } from "../.keystone/schema-types";
import { KeystoneContext } from "@keystone-next/types";

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartCreateInput> {
  //1. Checking if the current user is logged in or not
  const sess = context.session;
  if (!sess.itemId) {
    throw new Error("You need to be signed in to do this...");
  }

  //2. Querying the logged in user's cart
  const allCartProducts = await context.lists.Cart.findMany({
    where: { user: { id: sess.itemId }, product: { id: productId } },
    resolveFields: "id, quantity",
  });

  //3. Querying if the product already exists in the cart or not
  ////3.1 If the product exists then simply update the quantity of the product in the cart
  const [existingCartProduct] = allCartProducts;
  if (existingCartProduct) {
    return await context.lists.Cart.updateOne({
      id: existingCartProduct.id,
      data: { quantity: existingCartProduct.quantity + 1 },
      // resolveFields: false,
    });
  }

  //3.2 If product doesn't exist in the cart, add product to the cart
  return await context.lists.Cart.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sess.itemId } },
      // resolveFields: false,
    },
  });
}

export default addToCart;
