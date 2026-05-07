import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import { FaBookOpen, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 h-16 bg-[#0a0f1a]/85 backdrop-blur-xl border-b border-border z-50 transition-all" 
      id="main-navbar"
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 relative">
        
        {/* Left Side: Brand */}
        <div className="flex items-center gap-3 sm:gap-10">
          <Link 
            to={ROUTES.HOME} 
            className="flex items-center gap-2 group shrink-0" 
            id="navbar-brand"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-xl text-primary group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 origin-bottom">
              <FaBookOpen />
            </span>
            <span className="text-base sm:text-lg font-bold text-gray-100 tracking-tight group-hover:text-primary transition-colors duration-200">
              HN Stories
            </span>
          </Link>
        </div>

        {/* Right Side: Desktop Auth Actions */}
        <div className="hidden sm:flex items-center shrink-0">
          {user ? (
            <div className="relative group">
              {/* Profile Trigger */}
              <div className="flex items-center gap-3 cursor-pointer py-2">
                <div className="w-10 h-10 rounded-full border border-border bg-white/5 flex items-center justify-center text-gray-200 text-sm font-bold uppercase transition-all duration-200 group-hover:border-primary/50 group-hover:bg-white/10">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                  {user.name}
                </span>
                <span className="text-muted text-xs transition-transform duration-200 group-hover:rotate-180">▼</span>
              </div>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-0 w-48 bg-[#0a0f1a] border border-border rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:translate-y-0 translate-y-2 z-50 overflow-hidden">
                <div className="py-1">
                  <Link 
                    to={ROUTES.BOOKMARKS} 
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    Bookmarks
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-border/50 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-md bg-primary text-white hover:bg-primary-hover hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="sm:hidden text-gray-300 text-2xl p-2 cursor-pointer hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Sidebar/Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-[#0a0f1a] border-b border-border p-4 flex flex-col gap-4 shadow-xl z-40">
          {user && (
            <div className="flex items-center gap-3 pb-4 border-b border-border/50">
              <div className="w-10 h-10 rounded-full border border-border bg-white/5 flex items-center justify-center text-gray-200 text-sm font-bold uppercase">
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
              <span className="text-gray-300 font-medium text-lg">
                {user.name}
              </span>
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            {user && (
              <Link 
                to={ROUTES.BOOKMARKS} 
                className="px-4 py-3 text-gray-300 font-medium rounded-md hover:bg-white/5 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bookmarks
              </Link>
            )}
            
            {user ? (
              <button
                className="text-left px-4 py-3 text-muted font-medium rounded-md hover:text-gray-100 hover:bg-white/5 transition-all duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="text-center px-4 py-3 font-semibold rounded-md bg-primary text-white hover:bg-primary-hover transition-all duration-200 mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;