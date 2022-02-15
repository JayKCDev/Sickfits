import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import formatCurrency from "../lib/formatCurrency";
import DisplayError from "../components/ErrorMessage";
import OrderItemStyles from "../components/styles/OrderItemStyles";

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    allOrders {
      id
      total
      products {
        id
        productName
        productDescription
        productPrice
        quantity
        productPhoto {
          id
          productImage {
            id
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const OrderPage = () => {
  const { data, loading, error } = useQuery(ALL_ORDERS_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Sudo Shoppers || Orders</title>
      </Head>
      <h2>There are {allOrders.length} orders in total.</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="images">
                  {order.products.map((product) => (
                    <img
                      key={`image-${product.id}`}
                      src={
                        product?.productPhoto?.productImage
                          ?.publicUrlTransformed
                      }
                      alt={product.name}
                    />
                  ))}
                </div>
                <div className="order-meta">
                  <p>
                    {order.products.length} Product
                    {order.products.length === 1 ? "" : "s"}
                  </p>
                  <p>{formatCurrency(order.total)}</p>
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
};

export default OrderPage;
