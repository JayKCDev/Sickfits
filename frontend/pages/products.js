import Head from "next/head";
import styled from "styled-components";
import Product from "../components/Product";
import { productsPerPage } from "../config";
import { useQuery, gql } from "@apollo/client";
import Pagination from "../components/Pagination";
import { useRouter } from "next/dist/client/router";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(skip: $skip, first: $first) {
      id
      productName
      productPrice
      productDescription
      productPhoto {
        id
        productImage {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const ProductsPage = () => {
  const { query } = useRouter();

  const page = parseInt(query.page);

  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * productsPerPage - productsPerPage,
      first: productsPerPage,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Sudo Shoppers || Products</title>
      </Head>
      <Pagination page={page || 1} />
      <ProductListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductListStyles>
      <Pagination page={page || 1} />
    </div>
  );
};

export default ProductsPage;
