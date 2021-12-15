import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../actions/userAction.js";
import "./Register.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.signupUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    dispatch(signupUser(name, email, password, address));

    history.push("/");
  };

  return (
    <div className="register">
      <form className="register_box">
        <div className="register_box-title">Create your account</div>
        {user && user.message ? (
          <p className="message">{user.message}</p>
        ) : null}
        {message ? <p className="message">Passwords don't match.</p> : null}
        <div className="register_box-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="register_box-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register_box-input">
          <label htmlFor="Address">Address</label>
          <textarea
            row="7"
            cols="30"
            type="textarea"
            placeholder="Your address"
            id="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="register_box-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="********"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="register_box-input">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="********"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button className="btn" type="submit" onClick={handleSubmit}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
