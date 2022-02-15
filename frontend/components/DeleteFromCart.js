import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";

const DeleteCartProduct = styled.button`
  font-size: 2.5rem;
  background: none;
  border: none;
  &:hover {
    color: red;
    cursor: pointer;
  }
`;

//Mutation function to delete a specific product from the cart using product Id as a parameter
const DELETE_CART_PRODUCT_MUTATION = gql`
  mutation DELETE_CART_PRODUCT_MUTATION($id: ID!) {
    deleteCart(id: $id) {
      id
    }
  }
`;

//Using Apollo's function to remove the product immediately from the cache rather than refetching the updated cart from GraphQL
const updateCache = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCart));
};

const DeleteFromCart = ({ productId }) => {
  const [deleteCart, { loading }] = useMutation(DELETE_CART_PRODUCT_MUTATION, {
    variables: { id: productId },
    update: updateCache,
  });

  return (
    <DeleteCartProduct
      disabled={loading}
      type="button"
      title="Delete product from cart"
      onClick={deleteCart}
    >
      &times;
    </DeleteCartProduct>
  );
};

export default DeleteFromCart;
