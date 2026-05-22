import  { createContext, useState,useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Load token and user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken) {
      setToken(savedToken);
    }
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function
  const login = (authToken, userData) => {
  
      setToken(authToken);
      localStorage.setItem('authToken', authToken);
      
      // Save user
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {

      // Clear state
      setToken(null);
      setUser(null);
      
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
  };

  const value = {
    token,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
