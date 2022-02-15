import stripeConfig from "../lib/stripe";
import { CartCreateInput } from "./../.keystone/schema-types";
import { OrderCreateInput } from "../.keystone/schema-types";
import { KeystoneContext } from "@keystone-next/types";

interface Arguments {
  token: string;
}

async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  //1. Make sure the user is signed in
  const itemId = context.session.itemId;
  if (!itemId) {
    throw new Error("You need to be signed in to do this...");
  }

  //2. Query the currently signed in user
  const user = await context.lists.User.findOne({
    where: { id: itemId },
    resolveFields: `
        id
        name
        email
        cart{
            id
            quantity
            product{
                id
                productName
                productDescription
                productPrice
                productPhoto{
                    id
                    productImage{
                        id
                        publicUrlTransformed
                    }
                }
            }
        }
    `,
  });

  //3. Calculate the order total
  const cartProducts = user.cart.filter((cartProduct) => cartProduct.product);
  const cartAmount = cartProducts.reduce(
    (acc: number, cartProduct: CartCreateInput) => {
      return acc + cartProduct.quantity * cartProduct.product.productPrice;
    },
    0
  );

  //4. Create stripe payment methods to charge order amount
  const charge = await stripeConfig.paymentIntents
    .create({
      confirm: true,
      currency: "USD",
      amount: cartAmount,
      payment_method: token,
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  //5. Covert all the cart products to order products
  const orderProducts = cartProducts.map((cartProduct) => {
    const orderProduct = {
      quantity: cartProduct.quantity,
      productName: cartProduct.product.productName,
      productPrice: cartProduct.product.productPrice,
      productDescription: cartProduct.product.productDescription,
      productPhoto: { connect: { id: cartProduct.product.productPhoto.id } },
    };
    return orderProduct;
  });

  //6. Create the order and return it.
  const order = context.lists.Order.createOne({
    data: {
      charge: charge.id,
      total: charge.amount,
      user: { connect: { id: itemId } },
      products: { create: orderProducts },
    },
  });

  //7. Clear products from the cart once the order is placed successfully
  const cartProductIds = user.cart.map((cartProduct) => cartProduct.id);
  await context.lists.Cart.deleteMany({
    ids: cartProductIds,
  });
  return order;
}

export default checkout;
