import { FaInstagram } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Guayathrift</h1>

      <a
        href="https://instagram.com/guayathrift"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-link"
      >
        <FaInstagram />
      </a>
    </nav>
  );
}

export default Navbar;
