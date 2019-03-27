import React from 'react'
import { Link } from 'react-router-dom';
import FilledBookmarkIcon from './FilledBookmarkIcon';

const Navbar = (props) => {
    console.log(History)
  return (
    <nav className="navbar">
        <Link to="/">
            <h1>
                🍸 Find A Cocktail
            </h1>
        </Link>
        <Link to="/saved">
            <FilledBookmarkIcon />
        </Link>
    </nav>
  )
}

export default Navbar;