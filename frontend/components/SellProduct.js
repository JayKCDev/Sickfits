import Form from "./styles/Form";
import Router from "next/router";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { useMutation, gql } from "@apollo/client";
import { ALL_PRODUCTS_QUERY } from "../pages/products";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $productName: String!
    $productPhoto: Upload!
    $productPrice: Int!
    $productDescription: String! # $productStatus:"AVAILABLE"
  ) {
    createProduct(
      data: {
        productName: $productName
        productPhoto: {
          create: { productImage: $productPhoto, altText: $productName }
        }
        productPrice: $productPrice
        productDescription: $productDescription
        productStatus: "AVAILABLE"
      }
    ) {
      id
      productName
      productDescription
      productPrice
    }
  }
`;

const SellProduct = () => {
  const { inputs, handleChange } = useForm({
    productName: "",
    productPhoto: "",
    productPrice: "",
    productDescription: "",
  });

  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const handleSubmit = async function (e) {
    try {
      e.preventDefault();
      await createProduct()
        .then(function (response) {
          return response;
        })
        .then(function ({ data }) {
          Router.push(`/product/${data.createProduct.id}`);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="productName">
          Product Name
          <input
            type="text"
            id="productName"
            name="productName"
            value={inputs.productName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="productPhoto">
          Product Images
          <input
            type="file"
            id="productPhoto"
            name="productPhoto"
            required
            // value={inputs.productPhoto}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="productPrice">
          Product Price
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={inputs.productPrice}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="productDescription">
          Product Description
          <textarea
            id="productDescription"
            name="productDescription"
            value={inputs.productDescription}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Product</button>
      </fieldset>
    </Form>
  );
};

export default SellProduct;
