import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import authService from '../services/authService';
import { STORAGE_KEYS } from '../constants/storage';

const AuthContext = createContext(null);

/**
 * Custom hook to consume AuthContext.
 * Provides: user, token, loading, login(), register(), logout(), updateBookmarks()
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * AuthProvider — manages authentication state and exposes auth actions.
 * Single Responsibility: only auth state management lives here.
 * API calls are delegated to authService (DRY).
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: rehydrate auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        // Corrupted data — clear it
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    setLoading(false);
  }, []);

  /**
   * Persist auth state to localStorage and React state.
   */
  const persistAuth = useCallback((tokenValue, userValue) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, tokenValue);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userValue));
    setToken(tokenValue);
    setUser(userValue);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    persistAuth(data.token, data.user);
    return data;
  }, [persistAuth]);

  const register = useCallback(async (name, email, password) => {
    const data = await authService.register(name, email, password);
    persistAuth(data.token, data.user);
    return data;
  }, [persistAuth]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  }, []);

  /**
   * Update bookmarks array in user state (optimistic UI support).
   * Called after a bookmark toggle to keep context in sync without refetching.
   */
  const updateBookmarks = useCallback((bookmarks) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, bookmarks };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ user, token, loading, login, register, logout, updateBookmarks }),
    [user, token, loading, login, register, logout, updateBookmarks]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
