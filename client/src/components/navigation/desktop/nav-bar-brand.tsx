import React from "react";
import { NavLink } from "react-router-dom";

export const NavBarBrand: React.FC = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <h2 className="nav-logo">Campus Connect</h2>
      </NavLink>
    </div>
  );
};
