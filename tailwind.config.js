/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-200
        input: "var(--color-input)", // white
        ring: "var(--color-ring)", // blue-800
        background: "var(--color-background)", // gray-50
        foreground: "var(--color-foreground)", // gray-800
        primary: {
          DEFAULT: "var(--color-primary)", // blue-800
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // violet-600
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-100
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // amber-500
          foreground: "var(--color-accent-foreground)", // gray-800
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-800
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // gray-800
        },
        success: {
          DEFAULT: "var(--color-success)", // emerald-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-500
          foreground: "var(--color-warning-foreground)", // gray-800
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Inter', 'Poppins', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        'body': ['Inter', 'Poppins', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        'caption': ['Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': 'var(--shadow-sm)',
        'modal': 'var(--shadow-lg)',
      },
      transitionDuration: {
        'smooth': '200ms',
        'modal': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
        'modal': 'ease-in-out',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}