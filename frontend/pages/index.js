import Head from "next/head";
import ProductsPage from "./products";

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Sudo Shoppers || Home</title>
      </Head>
      <ProductsPage />
    </>
  );
};

export default IndexPage;
// export { default } from "./products";
