import { Link } from 'react-router-dom';
import useAuthForm from '../hooks/useAuthForm';
import { ROUTES } from '../constants/routes';

const Register = () => {
  const { formData, error, isSubmitting, handleChange, handleSubmit } = useAuthForm('register');

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]" id="register-page">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-10">
        <h1 className="text-3xl font-bold mb-1">Create Account</h1>
        <p className="text-muted mb-8">Join HN Stories to bookmark your favorite reads</p>

        {error && (
          <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-md px-4 py-2 text-sm mb-4" id="register-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" id="register-form">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-muted">Full Name</label>
            <input
              type="text" id="name" name="name" value={formData.name}
              onChange={handleChange} placeholder="John Doe" required
              className="px-4 py-2.5 bg-[#0f0f0f] border border-border rounded-md text-gray-200 text-base transition-colors duration-150 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 placeholder:text-muted/50"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-muted">Email</label>
            <input
              type="email" id="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="you@example.com" required
              className="px-4 py-2.5 bg-[#0f0f0f] border border-border rounded-md text-gray-200 text-base transition-colors duration-150 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 placeholder:text-muted/50"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-muted">Password</label>
            <input
              type="password" id="password" name="password" value={formData.password}
              onChange={handleChange} placeholder="••••••••" required minLength={6}
              className="px-4 py-2.5 bg-[#0f0f0f] border border-border rounded-md text-gray-200 text-base transition-colors duration-150 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 placeholder:text-muted/50"
            />
          </div>

          <button
            type="submit" disabled={isSubmitting} id="btn-register"
            className="w-full py-2.5 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-muted">
          Already have an account? <Link to={ROUTES.LOGIN} className="text-primary hover:text-primary-hover">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
