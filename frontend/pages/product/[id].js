import { useQuery, gql } from "@apollo/client";
import DisplayError from "../../components/ErrorMessage";
import SingleProduct from "../../components/SingleProduct";

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      productName
      productDescription
      productPrice
      productPhoto {
        id
        productImage {
          id
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

const SingleProductPage = ({ query }) => {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: query.id },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  return <SingleProduct productData={data} />;
};

export default SingleProductPage;
