import Cart from "./Cart";
import Link from "next/link";
import Search from "./Search";
import Navigation from "./Navigation";
import styled from "styled-components";

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  z-index: 2;
  position: relative;
  background: red;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem, 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    display: grid;
    align-items: stretch;
    justify-content: space-between;
    grid-template-columns: auto 1fr;
    border-bottom: 10px solid var(--black, black);
  }

  .sub-bar {
    display: grid;
    grid-template-columns: auto 1fr;
    border-bottom: 1px solid var(--black, black);
  }
`;

const Header = () => {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Sudo Shoppers</Link>
        </Logo>
        <Navigation />
      </div>
      <div className="sub-bar">
        <Search />
      </div>
      <Cart />
    </HeaderStyles>
  );
};

export default Header;
