import "./Home.scss";
import Card from "../../Components/Card/Card";
import Carousel from "../../Components/carousel/carousel";
import { listProducts } from "../../actions/productAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Components/spinner/spinner";

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { products, loading } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : products ? (
    <div className="home">
      <div className="home_carousel">
        <Carousel products={products} />
      </div>
      <div className="home_products">
        {products.map((product, i) => (
          <Card key={i} product={product} />
        ))}
        <Card />
      </div>
    </div>
  ) : null;
};

export default Home;
