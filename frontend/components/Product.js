import Link from "next/link";
import DeleteProduct from "./DeleteProduct";
import PriceTagStyles from "./styles/PriceTag";
import ProductStyles from "./styles/ItemStyles";
import ProductTitleStyles from "./styles/Title";
import formatCurrency from "../lib/formatCurrency";
import AddToCart from "./AddToCart";

const Product = (props) => {
  const { product } = props;
  // const sessionData = useUser();
  return (
    <ProductStyles>
      <img
        src={product?.productPhoto?.productImage?.publicUrlTransformed}
        alt={product.productName}
      />

      <ProductTitleStyles>
        <Link href={`/product/${product.id}`}>{product.productName}</Link>
      </ProductTitleStyles>

      <PriceTagStyles>{formatCurrency(product.productPrice)}</PriceTagStyles>
      <div className="buttonList">
        <Link href={{ pathname: "/update", query: { id: product.id } }}>
          Edit Product
        </Link>

        <AddToCart id={product.id} />

        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ProductStyles>
  );
};

export default Product;
