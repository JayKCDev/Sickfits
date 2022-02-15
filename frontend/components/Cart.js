import Checkout from "./Checkout";
import styled from "styled-components";
import Supreme from "./styles/Supreme";
import { useUser } from "../lib/useUser";
import CartStyles from "./styles/CartStyles";
import DeleteFromCart from "./DeleteFromCart";
import CloseButton from "./styles/CloseButton";
import { useCartState } from "../lib/cartState";
import calcCartTotal from "../lib/calcCartTotal";
import formatCurrency from "../lib/formatCurrency";

const CartProductStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartProduct = ({ cartProduct }) => {
  if (!cartProduct) return null;
  return (
    <CartProductStyles>
      <img
        width="100"
        src={cartProduct.product.productPhoto.productImage.publicUrlTransformed}
        alt={cartProduct.product.productName}
      />
      <div>
        <h3>{cartProduct.product.productName}</h3>
        <p>
          {formatCurrency(
            cartProduct.product.productPrice * cartProduct.quantity
          )}
          -
          <em>
            {cartProduct.quantity} &times;
            {formatCurrency(cartProduct.product.productPrice)} each
          </em>
        </p>
      </div>
      <DeleteFromCart productId={cartProduct.id} />
    </CartProductStyles>
  );
};

const Cart = () => {
  const currentUser = useUser();
  if (!currentUser) return null;
  const { cartOpen, closeCart } = useCartState();

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{currentUser.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {currentUser.cart.map((cartProduct) => (
          <CartProduct key={cartProduct.id} cartProduct={cartProduct} />
        ))}
      </ul>
      <footer>
        Cart Total {formatCurrency(calcCartTotal(currentUser.cart))}
        <Checkout />
      </footer>
    </CartStyles>
  );
};

export default Cart;
