import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/app">
      <img src="/logo.png" alt="logo" className="h-20" />{" "}
    </Link>
  );
}

export default Logo;
