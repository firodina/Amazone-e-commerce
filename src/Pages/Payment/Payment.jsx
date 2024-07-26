import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./payment.module.css";
import { DataContext } from "../../components/Dataproducer/DataProducer";
import ProductList from "../../components/Product/ProductList";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../components/Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setcardError] = useState(null);
  const [processing, setprocessing] = useState();

  const stripe = useStripe();
  const element = useElements();
  const navigate = useNavigate();

  const handlechange = (e) => {
    e?.error?.message ? setcardError(e?.error?.message) : setcardError("");
  };
  const handepaymet = async (e) => {
    e.preventDefault();

    try {
      setprocessing(true);
      //backend \\ function --->contant to the client side
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const clientSecret = response.data?.clientSecret;

      //client side (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: element.getElement(CardElement),
        },
      });
      // console.log(paymentIntent);
      //client side (react side confirmation)
      //after the confirmation

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      //empty the basket 
      dispatch({type:Type.EMPTY_BASKET})
      setprocessing(false);
      navigate("/order", { state: { msg: "you have pleced new orders" } });
    } catch (error) {
      console.log(error);
      setprocessing(false);
    }
  };
  return (
    <Layout>
      {/* {header} */}
      <div className={classes.payment_header}>
        Checkout ({totalItem} ) items
      </div>
      {/* {payment mwethod} */}
      <section className={classes.Payment}>
        {/* {address} */}
        <div className={classes.Payment_flex}>
          <h3>Delivery Address</h3>
          <div>
            
            <div>{user?.email}</div>
          </div>
        </div>
        <hr />
        {/* {proudect} */}
        <div className={classes.Payment_flex}>
          <h3>Review item and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductList product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* {card form} */}
        <div className={classes.Payment_flex}>
          <h3>payment methods</h3>
          <div className={classes.CardElement}>
            <div className={classes.payment_detail}>
              <form onSubmit={handepaymet}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handlechange} />

                <div className={classes.Payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader size={12} />
                        <p>please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
