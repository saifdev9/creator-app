import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProctedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) navigate("/");
  }, [navigate]);

  return children;
}

export default ProctedRoute;
