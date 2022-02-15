import { useState } from "react";
import Router from "next/router";
import nProgress from "nprogress";
import styled from "styled-components";
import SickButton from "./styles/SickButton";
import { loadStripe } from "@stripe/stripe-js";
import { useCartState } from "../lib/cartState";
import { gql, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../lib/useUser";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      total
      charge
      products {
        id
        productName
        productPrice
        quantity
      }
    }
  }
`;

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { closeCart } = useCartState();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const handleSubmit = async (e) => {
    //1. Stop the default form submit behavior and turn on the custom loader
    e.preventDefault();

    //2. Start the page transition
    setLoading(true);
    nProgress.start();

    //3. Create a payment method via Stripe ()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    //4. Handle errors from Stripe (if any)
    if (error) {
      setError(error);
      setLoading(false);
      nProgress.done();
      return; //This avoids the payment from going through
    }
    //5. Send the token received from step 3 to our keystone server via custom mutation
    const createdOrder = await checkout({
      variables: { token: paymentMethod.id },
    });

    //6. Change the page to the Order page
    if (createdOrder) {
      //7. Close the cart
      closeCart();
      Router.push(`/order/${createdOrder.data.checkout.id}`);
    }

    //8. Turn the custom loader off
    setLoading(false);
    nProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: "16px" }}>{error.message}</p>}
      {graphQLError && (
        <p style={{ fontSize: "16px" }}>{graphQLError.message}</p>
      )}
      <CardElement />
      <SickButton disabled={loading}>Check Out!</SickButton>
    </CheckoutFormStyles>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
};
export default Checkout;
