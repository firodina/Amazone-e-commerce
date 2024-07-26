import React, { useState, useContext } from "react";
import { auth } from "../../Utility/firebase";
import classes from "./auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/Dataproducer/DataProducer";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigation = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);
  console.log(user);
  const [loading, setloading] = useState({
    signIn: false,
    signUp: false,
  });
  const uselocation = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name == "signIn") {
      setloading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setloading({ ...loading, signIn: false });
          navigation(uselocation?.state?.redirect || "/");
        })
        .catch((error) => {
          seterror(error.message);
          setloading({ ...loading, signIn: false });
        });
    } else {
      setloading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setloading({ ...loading, signUp: false });
          navigation("/");
        })
        .catch((error) => {
          seterror(error.message);
          setloading({ ...loading, signUp: false });
        });
    }
  };
  return (
    <section className={classes.login}>
      <div className={classes.logo_contaniner}>
        {/* {logo} */}
        <Link to="/">
          <img src="https://pngimg.com/uploads/amazon/amazon_PNG8.png" alt="" />
        </Link>
      </div>
      <div className={classes.sign_container}>
        <h1>sign in</h1>
        {uselocation?.state?.message && (
          <small
            style={{
              fontWeight: "bold",
              color: "red",
              padding: "5px",
              textAlign: "center",
            }}
          >
            {uselocation.state.message}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setemail(e.target.value)}
              type="email"
              id="email"
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            className={classes.sign_button}
            onClick={authHandler}
            name="signIn"
          >
            {loading.signIn ? <ClipLoader size={15} /> : "Sign In"}
          </button>
        </form>
        <p>
          by signing in your agree to the AMAZON FAKE CLONE condition of use &
          sale. Please see our Privacy Notice, our cookies Notice and our
          Interest-Based Ads Notices
        </p>

        <button
          type="submit"
          className={classes.sign_account}
          name="signUp"
          onClick={authHandler}
        >
          {loading.signUp ? (
            <ClipLoader size={15} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
