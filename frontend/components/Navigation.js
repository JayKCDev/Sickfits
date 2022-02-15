import Link from "next/link";
import SignOut from "./SignOut";
import CartCount from "./CartCount";
import { useUser } from "../lib/useUser";
import NavStyles from "./styles/NavStyles";
import { useCartState } from "../lib/cartState";

const Navigation = () => {
  const user = useUser();
  const { toggleCart } = useCartState();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <button type="button" onClick={toggleCart}>
            Cart
            <CartCount
              count={user.cart.reduce(
                (acc, products) =>
                  acc + (products.product ? products.quantity : 0),
                0
              )}
            />
          </button>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
        </>
      )}
      {!user && <Link href="/signIn">Sign In</Link>}
    </NavStyles>
  );
};

export default Navigation;
