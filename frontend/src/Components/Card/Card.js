import "./Card.scss";
// import Products from "./../../data/products";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const Card = (props) => {
  const product = props.product;

  return product ? (
    <div className="card">
      <div className="card-img">
        <img
          alt={product.name}
          src={require(`./../../../public${product.image}`).default}
        />
      </div>
      <div className="card-details">
        <h3>{product.name}</h3>
        <div className="card-details-rating">
          <div>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
          <p>{product.numReviews} Reviews</p>
        </div>
        <h1>₹{product.price}</h1>
        <Link className="btn" to={`/details/${product._id}`}>
          Details
        </Link>
      </div>
    </div>
  ) : null;
};

export default Card;
