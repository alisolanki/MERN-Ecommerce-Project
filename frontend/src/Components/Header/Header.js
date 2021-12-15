import "./Header.scss";
import { Link } from "react-router-dom";
import { BsHeartFill, BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";
import { useHistory } from "react-router";
import { useState } from "react";
import { listProducts, searchProducts } from "../../actions/productAction";

const Header = () => {
  const authorizeUser = useSelector((state) => state.authorizeUser);
  const { user } = authorizeUser;
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search !== "") dispatch(searchProducts(search));
    else dispatch(listProducts());
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
    dispatch(logout());
  };

  return (
    <header className="header">
      <div>
        <div className="header_logoimg">
          <Link to="/">
            <img
              alt=""
              src={require("./../../images/logonobackground.jpg").default}
            />
          </Link>
        </div>
      </div>
      <div className="header_search">
        <input
          type="text"
          name="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Link className="header_search-icon" to="/" onClick={handleSearch}>
          <BsSearch />
        </Link>
      </div>
      <ul className="header_navigation">
        <li className="header_navigation_item">
          {user ? (
            <Link className="header_navigation_item-link" to="/wishlist">
              <BsHeartFill />
            </Link>
          ) : null}
        </li>
        <li className="header_navigation_item">
          <Link className="header_navigation_item-link" to="/cart">
            <AiOutlineShoppingCart />
          </Link>
        </li>
        <li className="header_navigation_item">
          {user && user.name ? (
            <p className="header_navigation_item-link">
              {user.name.split(" ")[0]}
            </p>
          ) : (
            <Link className="header_navigation_item-link" to="/login">
              Login
            </Link>
          )}
        </li>

        {user && user != null ? (
          <li>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </header>
  );
};

export default Header;
