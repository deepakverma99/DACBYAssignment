import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/errorHandler';
import { ROUTES } from '../constants/routes';

/**
 * Custom hook for auth form logic — shared between Login and Register pages.
 * Eliminates duplicated form state, loading, error, and submit handling (DRY).
 *
 * @param {'login' | 'register'} mode
 * @returns {{ formData, error, isSubmitting, handleChange, handleSubmit }}
 */
const useAuthForm = (mode) => {
  const initialFields =
    mode === 'register'
      ? { name: '', email: '', password: '' }
      : { email: '', password: '' };

  const [formData, setFormData] = useState(initialFields);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(''); // Clear error on new input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'register') {
        await register(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      navigate(ROUTES.HOME);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, error, isSubmitting, handleChange, handleSubmit };
};

export default useAuthForm;
