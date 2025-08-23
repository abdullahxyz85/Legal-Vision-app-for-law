import { useState, useCallback, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

const AUTH_STORAGE_KEY = 'legal-vision-auth-user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize user from localStorage on app start
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        // Clear corrupted data
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in a real app, this would come from your auth API
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email: email,
      };
      
      // Save user to localStorage for persistence
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Clear user from state and localStorage
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  return {
    user,
    isLoading,
    isInitialized,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
