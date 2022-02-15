import Head from "next/head";
import { useMutation, gql } from "@apollo/client";
import SellProduct from "../components/SellProduct";
import PleaseSignIn from "../components/PleaseSignIn";

const SellPage = () => {
  return (
    <div>
      <Head>
        <title>Sudo Shoppers || Sell</title>
      </Head>
      <PleaseSignIn>
        <SellProduct />
      </PleaseSignIn>
    </div>
  );
};
export default SellPage;
