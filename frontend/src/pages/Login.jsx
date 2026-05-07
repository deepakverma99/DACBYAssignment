import { Link } from 'react-router-dom';
import useAuthForm from '../hooks/useAuthForm';
import { ROUTES } from '../constants/routes';

const Login = () => {
  const { formData, error, isSubmitting, handleChange, handleSubmit } = useAuthForm('login');

  return (
    <div className="auth-page" id="login-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your HN Stories account</p>
        {error && <div className="alert alert-error" id="login-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form" id="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password}
              onChange={handleChange} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting} id="btn-login">
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to={ROUTES.REGISTER}>Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
