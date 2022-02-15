import Head from "next/head";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

const SingleProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  justify-content: center;
  align-items: top;
  gap: 2rem;
  max-width: var (--maxWidth);
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SingleProduct = ({ productData }) => {
  return (
    <>
      <Head>
        <title> Sick Fits || {productData.Product.productName}</title>
      </Head>
      <SingleProductStyles>
        <img
          src={
            productData.Product.productPhoto.productImage.publicUrlTransformed
          }
          alt={productData.Product.productPhoto.altText}
        />
        <div className="details">
          <h2>{productData.Product.productName}</h2>
          <p>{productData.Product.productDescription}</p>
        </div>
      </SingleProductStyles>
    </>
  );
};

export default SingleProduct;

// const SINGLE_ITEM_QUERY = gql`
//   query SINGLE_ITEM_QUERY($id: ID!) {
//     Product(where: { id: $id }) {
//       id
//       productName
//       productDescription
//       productPrice
//       productPhoto {
//         id
//         productImage {
//           id
//           publicUrlTransformed
//         }
//         altText
//       }
//     }
//   }
// `;

// const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
//   variables: { id: productId },
// });

//{data?.Product?.productName}
