import DisplayError from "../components/ErrorMessage";
import UpdateProduct from "../components/UpdateProduct";
import { gql, useQuery, useMutation } from "@apollo/client";

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      productName
      productPrice
      productDescription
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $productName: String
    $productPrice: Int
    $productDescription: String
  ) {
    updateProduct(
      id: $id
      data: {
        productName: $productName
        productPrice: $productPrice
        productDescription: $productDescription
      }
    ) {
      id
      productName
      productPrice
      productDescription
    }
  }
`;

const updatePage = ({ query }) => {
  const { id } = query;

  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: id },
  });

  const [
    updateProduct,
    { data: updatedData, error: updatedError, loading: updatedLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || updatedError) {
    return <DisplayError error={error || updatedError} />;
  }

  return (
    <div>
      <UpdateProduct
        productId={id}
        currentData={data}
        updatedData={updatedData}
        updatedError={updatedError}
        updateProduct={updateProduct}
        updatedLoading={updatedLoading}
      />
    </div>
  );
};

export default updatePage;
