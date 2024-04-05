import { NavLink } from 'react-router-dom';
import logo from '../assets/react.svg';
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-green lg:p-5 py-5  text-white fixed lg:static w-full z-50">
      <div className="relative container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="flex"> 
            <img className="h-8" src={logo} alt="Logo" />
            <h1 className=" ml-2 text-lg">Food Recipes</h1>
          </NavLink>
        </div>
        {/* Desktop navigation */}
        <nav className="hidden md:flex">
          <ul className="flex text-white">
            <li className="px-10"><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/details">Details</NavLink></li>
          </ul>
        </nav>
        {/* Mobile navigation */}
        <div className="md:hidden relative">
          <button className="text-black bg-white focus:outline-none" onClick={toggleMenu}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        <nav className={`mobile__navbar bg-greenTrans ${isMenuOpen ? "active" : ""}`}>
          <ul className="text-black gap-2">
          <li className="p-2"><NavLink to="/">Home</NavLink></li>
          <li className="p-2"><NavLink to="/details">Details</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
