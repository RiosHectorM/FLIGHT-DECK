module.exports = {
  //darkMode: 'class',---------------------> temas oscuro
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#2F3E46',
        secondary: '#36474F',
        tertiary: '#F4F4F4',
        accent: '#4CAF50',
        'flightdeck-gold': '#CBB26A',
        'flightdeck-lightgold': '#d8c690',
        'flightdeck-black': '#000000',
        'flightdeck-darkgold': '#be9e44',
        'flightdeck-dark': '#1a1a1a',
        'flightdeck-cream': '#e5d9b6',
      },
      textColor: {
        primary: '#2F3E46',
        secondary: '#36474F',
        tertiary: '#F4F4F4',
        accent: '#4CAF50',
        'flightdeck-gold': '#CBB26A',
        'flightdeck-lightgold': '#d8c690',
        'flightdeck-black': '#000000',
        'flightdeck-darkgold': '#be9e44',
        'flightdeck-dark': '#1a1a1a',
        'flightdeck-cream': '#e5d9b6',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'spin-reverse': 'spin 1s linear reverse',
      },
    },
  },
  plugins: [],
};
