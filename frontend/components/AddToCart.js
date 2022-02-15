import { gql, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../lib/useUser";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id: id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button disabled={loading} type="button" onClick={addToCart}>
      Add to cart
    </button>
  );
};

export default AddToCart;
