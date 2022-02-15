import Link from "next/link";
import DisplayError from "./ErrorMessage";
import { productsPerPage } from "../config";
import { gql, useQuery } from "@apollo/client";
import PaginationStyles from "./styles/PaginationStyles";

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, error, loading } = useQuery(PAGINATION_QUERY);
  if (loading) {
    return <p>Loading....</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / productsPerPage);
  return (
    <PaginationStyles>
      <Link href={`/products/${page - 1}`}>Previous</Link>
      {/* prettier-ignore */}
      <p>Page {page} of {pageCount}</p>
      <p>{count} Products Total</p>
      <Link href={`/products/${page + 1}`}>Next</Link>
    </PaginationStyles>
  );
};

export default Pagination;
