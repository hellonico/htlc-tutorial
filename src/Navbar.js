import { Link } from "react-router-dom";

const Navbar = () => {
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <ul className="nav">
      <li className="nav-item">
      <Link className="nav-link"  to="/">Home</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/Create">Create</Link>
      </li>
      <li>
      <Link className="nav-link"  to="/Withdraw">Withdraw</Link>
      </li>
    </ul>
    </nav>
  );
}

export default Navbar;