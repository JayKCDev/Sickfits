import debounce from "lodash.debounce";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useCombobox, resetIdCounter } from "downshift";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_PRODUCT_QUERY = gql`
  query SEARCH_PRODUCT_QUERY($searchTerm: String!) {
    searchTerms: allProducts(where: { productName_contains_i: $searchTerm }) {
      id
      productName
      productPhoto {
        productImage {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  //"downshift" package that is being used for drop-down functionality for search results, assigns different 'ids' to each drop-down but sometimes the id that client renders is a different from than that of server. "resetIdCounter()" functions is used to reslove just that.
  resetIdCounter();
  const router = useRouter();

  const [searchedProducts, { data, loading, error }] = useLazyQuery(
    SEARCH_PRODUCT_QUERY,
    {
      fetchPolicy: "no-cache",
    }
  );

  const findProductsButChill = debounce(searchedProducts, 200);
  const products = data?.searchTerms || [];

  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: products || [],
    itemToString: (product) => product?.productName || "",
    onInputValueChange() {
      findProductsButChill({
        variables: { searchTerm: inputValue },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({ pathname: `/product/${selectedItem.id}` });
    },
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            id: "search",
            className: loading ? "loading" : "",
            placeholder: "Search for products",
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          products?.map((product, index) => {
            return (
              <DropDownItem
                key={product.id}
                {...getItemProps({ item: product })}
                highlighted={index === highlightedIndex}
              >
                <img
                  src={product.productPhoto.productImage.publicUrlTransformed}
                  alt={product.productName}
                  width="50"
                />
                {product.productName}
              </DropDownItem>
            );
          })}
        {isOpen && products.length === 0 && !loading && (
          <DropDownItem>Sorry, no products found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
