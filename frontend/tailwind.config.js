/** @type {import('tailwindcss').Config} */
import { theme } from './src/styles/theme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Asul', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: theme.colors.primary.main,
          light: theme.colors.primary.light,
          dark: theme.colors.primary.dark,
        },
        error: {
          DEFAULT: theme.colors.error.main,
          light: theme.colors.error.light,
          dark: theme.colors.error.dark,
        },
        success: {
          DEFAULT: theme.colors.success.main,
          light: theme.colors.success.light,
          dark: theme.colors.success.dark,
        },
        background: {
          primary: theme.colors.background.primary,
          secondary: theme.colors.background.secondary,
        },
        text: {
          primary: theme.colors.text.primary,
          secondary: theme.colors.text.secondary,
          light: theme.colors.text.light,
        },
        border: {
          primary: theme.colors.border.primary,
          secondary: theme.colors.border.secondary,
        },
      },
      borderRadius: {
        sm: theme.borderRadius.sm,
        md: theme.borderRadius.md,
        lg: theme.borderRadius.lg,
      },
      spacing: {
        xs: theme.spacing.xs,
        sm: theme.spacing.sm,
        md: theme.spacing.md,
        lg: theme.spacing.lg,
        xl: theme.spacing.xl,
      },
      keyframes: {
        shake: theme.animations.shake.keyframes,
        slideUp: theme.animations.slideUp.keyframes,
        slideDown: theme.animations.slideDown.keyframes,
        fadeIn: theme.animations.fadeIn.keyframes,
      },
      animation: {
        shake: `shake ${theme.animations.shake.duration}`,
        slideUp: `slideUp ${theme.animations.slideUp.duration}`,
        slideDown: `slideDown ${theme.animations.slideDown.duration}`,
        fadeIn: `fadeIn ${theme.animations.fadeIn.duration}`,
      },
    },
  },
  plugins: [],
} 