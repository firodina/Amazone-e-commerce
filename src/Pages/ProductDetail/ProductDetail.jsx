import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../components/Api/endPonit";
import ProductList from "../../components/Product/ProductList";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const [product, setproduct] = useState({});
  const [loading, setloading] = useState(false)
  const { productId } = useParams();
  useEffect(() => {
    setloading(true)
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setproduct(res.data);
        setloading(false)
      })
      .catch((error) => {
        console.log(error);
        setloading(false)
      });
  }, []);
  return (
    <Layout>
      {loading ? (<Loader />) : (<ProductList product={product} flex={true}
        renderDesc={true}
        renderAdd={true} />)}
      
    </Layout>
  );
}

export default ProductDetail;
