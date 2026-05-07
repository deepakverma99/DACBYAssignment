import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import { FaBookOpen } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 h-16 bg-[#0f0f0f]/85 backdrop-blur-xl border-b border-border z-50 transition-all" 
      id="main-navbar"
    >
      {/* Increased max-w to 5xl for better desktop breathing room */}
      <div className="max-w-5xl mx-auto h-full flex items-center justify-between px-4 sm:px-6">
        
        {/* Left Side: Brand + Navigation Grouped together (Modern standard) */}
        <div className="flex items-center gap-6 sm:gap-10">
          <Link 
            to={ROUTES.HOME} 
            className="flex items-center gap-2.5 group" 
            id="navbar-brand"
          >
            {/* Added playful hover animation to the icon */}
            <span className="text-xl text-primary group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 origin-bottom">
              <FaBookOpen />
            </span>
            <span className="text-lg font-bold text-gray-100 tracking-tight group-hover:text-primary transition-colors duration-200">
              HN Stories
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link 
              to={ROUTES.HOME} 
              className="px-3 py-2 text-muted font-medium text-sm rounded-md hover:text-gray-100 hover:bg-white/5 transition-all duration-200" 
              id="nav-stories"
            >
              Stories
            </Link>
            {user && (
              <Link 
                to={ROUTES.BOOKMARKS} 
                className="px-3 py-2 text-muted font-medium text-sm rounded-md hover:text-gray-100 hover:bg-white/5 transition-all duration-200" 
                id="nav-bookmarks"
              >
                Bookmarks
              </Link>
            )}
          </div>
        </div>

        {/* Right Side: Auth Actions */}
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Premium-feeling User Greeting with Avatar */}
              <div className="hidden sm:flex items-center gap-2.5" id="user-greeting">
                <div className="w-8 h-8 rounded-full border border-border bg-white/5 flex items-center justify-center text-gray-200 text-xs font-bold uppercase">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <span className="text-gray-300 text-sm font-medium">
                  {user.name}
                </span>
              </div>
              
              <button
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-border text-muted hover:border-gray-500 hover:text-gray-100 hover:bg-white/5 transition-all duration-200 cursor-pointer"
                onClick={handleLogout}
                id="btn-logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-md bg-primary text-white hover:bg-primary-hover hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              id="btn-login-nav"
            >
              Login
            </Link>
          )}
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;