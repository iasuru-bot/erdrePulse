export const theme = {
  typography: {
    fontFamily: '"Asul", sans-serif',
  },
  colors: {
    primary: {
      main: '#002868',
      light: '#003A8C',
      dark: '#001B4A',
    },
    error: {
      main: '#DC3545',
      light: '#E57373',
      dark: '#B71C1C',
    },
    success: {
      main: '#28A745',
      light: '#81C784',
      dark: '#1B5E20',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
    },
    text: {
      primary: '#000000',
      secondary: '#6C757D',
      light: '#FFFFFF',
    },
    border: {
      primary: '#DEE2E6',
      secondary: '#CED4DA',
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    shake: {
      keyframes: {
        '0%, 100%': { transform: 'translateX(0)' },
        '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
        '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
      },
      duration: '0.5s',
    },
    slideUp: {
      keyframes: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      duration: '0.5s',
    },
    slideDown: {
      keyframes: {
        '0%': { transform: 'translateY(-20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      duration: '0.5s',
    },
    fadeIn: {
      keyframes: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      duration: '0.3s',
    },
  },
};

// Types pour TypeScript
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors; 