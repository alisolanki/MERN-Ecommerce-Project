import "./carousel.scss";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useState } from "react";
import { listTopThree } from "../../actions/productAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/spinner";
import { Link } from 'react-router-dom'

const Carousel = () => {
  const [visible, setVisible] = useState(1);
  const handleSlide = (dir) => {
    if (dir === "right") {
      visible === 3 ? setVisible(1) : setVisible(visible + 1);
    } else {
      visible === 1 ? setVisible(3) : setVisible(visible - 1);
    }
  };
  const dispatch = useDispatch();

  const productListTopThree = useSelector((state) => state.productListTopThree);

  const { products, loading } = productListTopThree;

  useEffect(() => {
    dispatch(listTopThree());
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : (
      <div className="carousel">
        {products.map((product, i) => (
          <div
            key={i}
            className={
              visible === i + 1
                ? `carousel_slide carousel_slide-visible`
                : `carousel_slide`
            }
          >
            <AiOutlineRight
              className="carousel_slide-right"
              onClick={() => {
                handleSlide("right");
              }}
            />
            <Link className="carousel_slide-title" to={`/details/${product._id}`}>{product.name}</Link>
            <img
              alt={product.name}
              src={require(`./../../../public${product.image}`).default}
            />
            <h1>₹ {product.price}</h1>
            <AiOutlineLeft
              className="carousel_slide-left"
              onClick={() => {
                handleSlide("left");
              }}
            />
          </div>
        ))}
      </div>
    );
};

export default Carousel;
