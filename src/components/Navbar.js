import React from 'react'
import { Link } from 'react-router-dom';
import FilledBookmarkIcon from './FilledBookmarkIcon';

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/">
            <h1>
                <span role="img" aria-label="cokctail glass">🍸</span> Find A Cocktail
            </h1>
        </Link>
        <Link to="/saved">
            <FilledBookmarkIcon />
        </Link>
    </nav>
  )
}

export default Navbar;