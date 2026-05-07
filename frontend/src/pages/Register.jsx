import { Link } from 'react-router-dom';
import useAuthForm from '../hooks/useAuthForm';
import { ROUTES } from '../constants/routes';

const Register = () => {
  const { formData, error, isSubmitting, handleChange, handleSubmit } = useAuthForm('register');

  return (
    <div className="auth-page" id="register-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join HN Stories to bookmark your favorite reads</p>
        {error && <div className="alert alert-error" id="register-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form" id="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name}
              onChange={handleChange} placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password}
              onChange={handleChange} placeholder="••••••••" required minLength={6} />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting} id="btn-register">
            {isSubmitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
