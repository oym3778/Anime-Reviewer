import { NavLink } from "react-router-dom";

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
          <NavLink
            to="/Search"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-yellow-300 ${
                isActive ? "text-yellow-300" : ""
              }`
            }
          >
            Search
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Friends"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-yellow-300 ${
                isActive ? "text-yellow-300" : ""
              }`
            }
          >
            Friends
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/MyReviews"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-yellow-300 ${
                isActive ? "text-yellow-300" : ""
              }`
            }
          >
            Reviews
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Profile"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-yellow-300 ${
                isActive ? "text-yellow-300" : ""
              }`
            }
          >
            Profile
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}
