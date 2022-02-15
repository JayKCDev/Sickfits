import { PAGINATION_QUERY } from "../components/Pagination";

const paginationField = () => {
  return {
    keyArgs: false,
    read(products = [], { args, cache }) {
      const { first, skip } = args;
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      const existingProducts = products
        .slice(skip, skip + first)
        .filter((product) => product);

      if (
        existingProducts.length &&
        existingProducts.length !== first &&
        page === pages
      ) {
        return existingProducts;
      }

      if (existingProducts.length !== first) {
        return false;
      }

      if (existingProducts) {
        return existingProducts;
      }

      return false;
    },

    merge(cache, products, { args }) {
      const { first, skip } = args;
      const fetchedProducts = cache ? cache.slice(0) : [];
      for (let i = skip; i < skip + fetchedProducts.length; i++) {
        fetchedProducts[i] = products[i - skip];
      }
      return fetchedProducts;
    },
  };
};

export default paginationField;
