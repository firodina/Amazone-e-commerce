import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import classes from "./header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../Dataproducer/DataProducer";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalamount = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_contaniner}>
            {/* {logo} */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt=""
              />
            </Link>
          </div>
          {/* {delivery} */}
          <div className={classes.delivery_contanier}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
          {/* {search} */}
          <div className={classes.search_contanier}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="Search Product" />
            <BsSearch />
          </div>

          {/* {rigth side link} */}
          <div className={classes.order_contanier}>
            <Link to="" className={classes.language}>
              <img src="https://img.freepik.com/free-vector/illustration-usa-flag_53876-18165.jpg" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to={!user && "/auth"}>
              <div style={{width:"100px"}}>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <p onClick={() => auth.signOut()}>Sign Out</p>
                  </>
                ) : (
                  <>
                    <p> Hello Sign In</p>
                    <span>Account&List</span>
                  </>
                )}
              </div>
            </Link>
            {/* {orders} */}
            <Link to="/order">
              <p>returns</p>
              <span>&Orders</span>
            </Link>
            {/* {cart} */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalamount}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;





