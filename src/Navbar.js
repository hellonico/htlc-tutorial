import { Link } from "react-router-dom";

const Navbar = () => {
  return(
    <nav className="navbar">
    <div className="links">
      <Link to="/">Home</Link>&nbsp;&nbsp;
      <Link to="/Create">Create</Link>&nbsp;&nbsp;
      <Link to="/Withdraw">Withdraw</Link>
    </div>
    </nav>
  );
}

export default Navbar;