import "./Login.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserInfo } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Spinner from "./../../Components/spinner/spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const authorizeUser = useSelector((state) => state.authorizeUser);
  const { loading, user, error } = authorizeUser;

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [history, user, authorizeUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUserInfo(email, password));
  };

  return (
    <div className="login">
      {loading ? (
        <Spinner />
      ) : (
        <form className="login_box">
          <div className="login_box-title">Login to your account</div>
          <div className="login_box-input">
            {error ? <p className="message">{error}</p> : null}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="login_box-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="********"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button className="btn" type="submit" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="login_box-register">
            <p>
              New to the E-Cart?{" "}
              <Link className="login_box-register-link" to="/register">
                Register
              </Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
