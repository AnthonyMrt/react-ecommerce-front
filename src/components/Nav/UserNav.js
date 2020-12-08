import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/user/history" className="nav-link">
            Historique des commandes
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/password-update" className="nav-link">
            Mot de passe
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/wishlist" className="nav-link">
            wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
