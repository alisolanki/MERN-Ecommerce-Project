import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Footer from "./Components/Footer/Footer";
import Login from "./Screens/Login/Login";
import Details from "./Screens/Details/Details";
import Cart from "./Screens/Cart/Cart";
import Wishlist from "./Screens/WishList/wishlist";
import Register from "./Screens/Register/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/details/:id" exact>
            <Details />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/wishlist" exact>
            <Wishlist />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
