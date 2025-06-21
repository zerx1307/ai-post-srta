import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    textSecondary: string;
    border: string;
    card: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

const lightColors = {
  background: '#f8f9fa',
  surface: '#ffffff',
  primary: '#00695c',
  secondary: '#9c27b0',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
  card: '#ffffff',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
};

const darkColors = {
  background: '#121212',
  surface: '#1e1e1e',
  primary: '#4db6ac',
  secondary: '#ce93d8',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  border: '#333333',
  card: '#2d2d2d',
  success: '#66bb6a',
  warning: '#ffb74d',
  error: '#ef5350',
  info: '#42a5f5',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initialize theme based on system preference
    const colorScheme = Appearance.getColorScheme();
    setIsDarkMode(colorScheme === 'dark');

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription?.remove();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};