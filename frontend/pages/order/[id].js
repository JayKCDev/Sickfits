import { useQuery, gql } from "@apollo/client";
import DisplayError from "../../components/ErrorMessage";
import SingleOrder from "../../components/SingleOrder";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
      id
      total
      products {
        id
        productName
        productDescription
        productPrice
        quantity
        productPhoto {
          productImage {
            publicUrlTransformed
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const SingleOrderPage = ({ query }) => {
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  return <SingleOrder orderData={data} />;
};

export default SingleOrderPage;
