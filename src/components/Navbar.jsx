import { useState } from 'react'
import './navbar.css'
import { Link, NavLink } from 'react-router-dom'
import Icon1 from '../images/icon1.png'
import Icon2 from '../images/icon2.png'
import Icon3 from '../images/icon3.png'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <nav>
      <div className="container nav_container">
        <div className="nav_title">
          <Link to="/" className='title'>
            <h1 className="site-title">FOOD SCAN</h1>
          </Link>
        </div>
        <ul className='nav_links'>
          <li>
            <NavLink to='/'>
              <div className="btn">
                <img className="logo1" src={Icon1} alt="Home"/>
                <p>Home</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to='/scan'>
              <div className="btn">
                <img className="logo2" src={Icon2} alt="Scan"/>
                <p>Scan</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to='/history'>
              <div className="btn">
                <img className="logo3" src={Icon3} alt="History"/>
                <p>History</p>
              </div>
            </NavLink>
          </li>
          <li className="language-selector">
            <select value={language} onChange={handleLanguageChange} className="language-select">
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
            </select>
          </li>
        </ul>
        <button className="nav_toggle-btn">
          <GiHamburgerMenu/>
        </button>
      </div>
    </nav>
  )
}

export default Navbar