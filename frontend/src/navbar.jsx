import './navbar.css'
import Button from './button.jsx'
import { useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from './services/authContext';
// import { askAI } from './services/api';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToPricing = (e) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      navigate('/#pricing');
    } else {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeMenu();
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
    closeMenu();
  };

  const toggleProfileMenu = (e) => {
    if (profileButtonRef.current && !showProfileMenu) {
      const rect = profileButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setShowProfileMenu(!showProfileMenu);
  };

  // Close profile menu when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showProfileMenu &&
        profileMenuRef.current && 
        !profileMenuRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <header>
      <nav>
        <div className="m-0 px-8 flex justify-between items-center h-full ">
          {/* Logo */}
          <NavLink to="/" className="logo text-[#2C3E50]">Interview Buddy</NavLink>

          {/* Hamburger / X Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#2C3E50]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? 'flex' : 'hidden'
            } flex-col md:flex md:flex-row items-center md:gap-6 absolute md:static top-[100px] left-0 w-full md:w-auto bg-[#ECF0F1] md:bg-transparent z-10 p-4 md:p-0 nav-links`}
          >
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-[#2C3E50] hover:text-[#2C3E50] underline"
                  : "text-[#34495E] hover:text-[#2C3E50]"
              }
            >
              Home
            </NavLink>
            <NavLink to="/ask-ai" onClick={closeMenu} className="...">
                Ask AI
            </NavLink>
            <a
              href="/#pricing"
              onClick={scrollToPricing}
              className="text-[#34495E] hover:text-[#2C3E50]"
            >
              Pricing
            </a>
            
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-[#2C3E50] hover:text-[#2C3E50] underline"
                  : "text-[#34495E] hover:text-[#2C3E50]"
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-[#2C3E50] hover:text-[#2C3E50] underline"
                  : "text-[#34495E] hover:text-[#2C3E50]"
              }
            >
              Contact Us
            </NavLink>

            {/* Mobile-only profile options when logged in */}
            {isLoggedIn && isMenuOpen && (
              <div className='flex gap-6'>
                <NavLink 
                  to="/profile" 
                  onClick={closeMenu}
                  className="md:hidden flex items-center text-[#34495E] hover:text-[#2C3E50] mt-2"
                >
                  <User size={16} className="mr-2" />
                  Your Profile
                </NavLink>
                
                <button
                  onClick={handleLogout}
                  className=" md:hidden text-[1.15rem] font-bold flex items-center text-[#34495E] hover:text-[#2C3E50] mt-2"
                >
                  <LogOut size={16} className="mr-2" />
                  Log Out
                </button>
              </div>
            )}

            {/* Desktop login/profile button */}
            {isLoggedIn ? (
              <div className="relative ml-2 hidden md:block">
                <button 
                  ref={profileButtonRef}
                  onClick={toggleProfileMenu}
                  className="flex font-bold text-lg items-center gap-2 text-[#2C3E50] hover:text-[#1ABC9C] pr-2 rounded-full "
                >
                  <User size={20} />
                  <span className="hidden md:inline">{user?.username || 'User'}</span>
                </button>
                
                {showProfileMenu && (
                  <div 
                    ref={profileMenuRef}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    style={{
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <NavLink 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Your Profile
                    </NavLink>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                children="Log In"
                className="text-sm rounded-full"
                onClick={() => {
                  navigate('/login');
                  closeMenu();
                }}
              />
            )}

            {/* Mobile user display when logged in */}
            {isLoggedIn && !isMenuOpen && (
              <div className="md:hidden flex items-center text-[#2C3E50] ml-2">
                <User size={20} />
                <span className="ml-1">{user?.username || 'User'}</span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
