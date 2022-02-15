import Form from "./styles/Form";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";

const UpdateProduct = (props) => {
  const { inputs, handleChange } = useForm(props.currentData.Product);

  const handleSubmit = async function (e) {
    try {
      e.preventDefault();
      await props.updateProduct({
        variables: {
          id: props.productId,
          productName: inputs.productName,
          productPrice: inputs.productPrice,
          productDescription: inputs.productDescription,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={props.updatedError} />
      <fieldset
        disabled={props.updatedLoading}
        aria-busy={props.updatedLoading}
      >
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
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
};

export default UpdateProduct;
