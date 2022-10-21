import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
