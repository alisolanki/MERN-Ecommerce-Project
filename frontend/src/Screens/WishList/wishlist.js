import "./wishlist.scss";
import Card from "../../Components/Card/Card";
import { useSelector } from "react-redux";
import Spinner from "./../../Components/spinner/spinner";

const Wishlist = () => {
  const authorizeUser = useSelector((state) => state.authorizeUser);
  const { loading, user } = authorizeUser;

  return user ? (
    loading ? (
      <Spinner />
    ) : (
      <div className="wishlist">
        <h1 className="wishlist_title">Wsihlist</h1>
        <div className="wishlist_products">
          {user.wishList.map((product, i) => (
            <Card key={i} product={product} />
          ))}
          <Card />
        </div>
      </div>
    )
  ) : (
    <div className="noproduct">
      <p className="message">Login to add products in wishlist</p>
    </div>
  );
};

export default Wishlist;
