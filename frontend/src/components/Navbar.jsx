import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

/**
 * Navbar — top navigation bar with conditional links based on auth state.
 * Shows: logo, Stories link, Bookmarks link (if logged in), Login/Logout button.
 * Single Responsibility: only handles navigation rendering + logout action.
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container">
        <Link to={ROUTES.HOME} className="navbar-brand" id="navbar-brand">
          <span className="brand-icon">🔥</span>
          <span className="brand-text">HN Stories</span>
        </Link>

        <div className="navbar-links">
          <Link to={ROUTES.HOME} className="nav-link" id="nav-stories">
            Stories
          </Link>

          {user && (
            <Link to={ROUTES.BOOKMARKS} className="nav-link" id="nav-bookmarks">
              Bookmarks
            </Link>
          )}
        </div>

        <div className="navbar-auth">
          {user ? (
            <div className="auth-group">
              <span className="user-greeting" id="user-greeting">
                Hi, {user.name}
              </span>
              <button className="btn btn-outline" onClick={handleLogout} id="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <Link to={ROUTES.LOGIN} className="btn btn-primary" id="btn-login-nav">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
