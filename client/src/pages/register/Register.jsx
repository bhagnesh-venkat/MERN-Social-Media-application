import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleLoginClick = () => {
    history("/login");  // Navigate to the login page
  };

  return (
    <div className="signup">
      <div className="signupWrapper">
        <div className="signupLeft">
          <h3 className="signupLogo">Dracosocial</h3>
          <span className="signupDesc">
            Connect with friends and the world around you on Dracosocial.
          </span>
        </div>
        <div className="signupRight">
          <form className="signupBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="signupInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="signupInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="signupInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="signupInput"
              type="password"
            />
            <button className="signupButton" type="submit">
              Sign Up
            </button>
            <button className="signupRegisterButton">Log into Account</button>
            <span className="registerForgot">Already have an account?</span>
            <button className="registerLoginButton" onClick={handleLoginClick}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}