import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav
      className="z-1 w-full top-0 left-0 fixed px-8 py-4 bg-black/40 text-white backdrop-blur-md 
                    flex items-center justify-between shadow-lg"
    >
      {/* Logo */}
      <h2 className="text-2xl font-bold tracking-wide">Revo</h2>

      {/* Navigation Links */}
      <ol className="flex items-center gap-8 text-lg">
        <li>
          <Link
            to="/Search"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Search
          </Link>
        </li>

        <li>
          <Link
            to="/Friends"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Friends
          </Link>
        </li>

        <li>
          <Link
            to="/MyReviews"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Reviews
          </Link>
        </li>

        <li>
          <Link
            to="/Profile"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Profile
          </Link>
        </li>
      </ol>
    </nav>
  );
}
