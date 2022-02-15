import DisplayError from "./ErrorMessage";
import { gql, useMutation } from "@apollo/client";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const updateUI = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { data, error, loading }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    { variables: { id: id }, update: updateUI }
  );

  const handleSubmit = async () => {
    try {
      if (confirm("Are you sure you want to delete it?")) {
        try {
          return await deleteProduct();
        } catch (error) {
          return <DisplayError error={error} />;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button disabled={loading} type="button" onClick={handleSubmit}>
      {children}
    </button>
  );
};

export default DeleteProduct;
