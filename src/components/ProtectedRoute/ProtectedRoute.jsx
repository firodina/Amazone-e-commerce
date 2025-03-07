import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Dataproducer/DataProducer";

function ProtectedRoute({ children, message, redirect }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { message, redirect } });
    }
  }, [user]);
  return children;
}

export default ProtectedRoute;
