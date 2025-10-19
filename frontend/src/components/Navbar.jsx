import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className="container">
        <Link to="/" className="logo-container">
          <img src="/images/logo.png" alt="HAVHATEK Logo" className="logo-svg" />
          <div className="logo">HAVHATEK</div>
        </Link>
        <button className="mobile-menu-btn" onClick={toggleMenu}>☰</button>
        <ul id="menu" className={menuOpen ? 'active' : ''}>
          <li><a href="#ana-sayfa">Ana Sayfa</a></li>
          <li><a href="#hakkimizda">Hakkımızda</a></li>
          <li><a href="#etkinlikler">Etkinlikler</a></li>
          <li><a href="#kayit">Kayıt</a></li>
          <li><a href="#iletisim">İletişim</a></li>
        </ul>
      </div>
    </nav>
  );
}