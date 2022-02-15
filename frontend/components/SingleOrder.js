import Head from "next/head";
import Link from "next/link";
import OrderStyles from "./styles/OrderStyles";
import formatCurrency from "../lib/formatCurrency";

const SingleOrder = ({ orderData }) => {
  const { Order } = orderData;

  return (
    <OrderStyles>
      <Head>
        <title>Sudo Shoppers || Order {Order.id}</title>
      </Head>
      <p>
        <span>Order ID:-</span>
        <span>{Order.id}</span>
      </p>
      <p>
        <span>Order Amount:-</span>
        <span>{formatCurrency(Order.total)}</span>
      </p>
      <p>
        <span>Products Count:-</span>
        <span>{Order.products.length}</span>
      </p>
      <div className="items">
        {Order.products.map((product) => (
          <div className="order-item" key={product.id}>
            <img
              src={product.productPhoto.productImage.publicUrlTransformed}
              alt={product.productName}
            />
            <div className="item-details">
              <Link href={`/product/${product.id}`}>
                <h2>{product.productName}</h2>
              </Link>
              <p>Quantity:- {product.quantity}</p>
              <p>Each:- {formatCurrency(product.productPrice)}</p>
              <p>
                Sub Total:-
                {formatCurrency(product.productPrice * product.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};

export default SingleOrder;
