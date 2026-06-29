import { Link, NavLink } from "react-router-dom";
import ktt_logo from "../assets/ktt_logo.jpg"
import {
  FaTachometerAlt,
  FaLaptop,
  FaUsers,
  FaTags,
  FaHistory,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg">
                <img src={ktt_logo} alt="the logo" />
            </div>

            <div>
              <h1 className="font-bold text-lg text-slate-800">
                Asset Manager
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>
              <FaTachometerAlt />
              Dashboard
            </NavLink>

            <NavLink to="/assets" className={navLinkClass}>
              <FaLaptop />
              Assets
            </NavLink>

            <NavLink to="/employees" className={navLinkClass}>
              <FaUsers />
              Employees
            </NavLink>

            <NavLink to="/categories" className={navLinkClass}>
              <FaTags />
              Categories
            </NavLink>

            <NavLink to="/history" className={navLinkClass}>
              <FaHistory />
              History
            </NavLink>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-2 pb-4">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <FaTachometerAlt />
              Dashboard
            </NavLink>

            <NavLink
              to="/assets"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <FaLaptop />
              Assets
            </NavLink>

            <NavLink
              to="/employees"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <FaUsers />
              Employees
            </NavLink>

            <NavLink
              to="/categories"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <FaTags />
              Categories
            </NavLink>

            <NavLink
              to="/history"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <FaHistory />
              History
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;