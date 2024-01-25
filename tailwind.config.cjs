/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
  important: '#root',
  theme: {
    extend: {
      // backgroundImage: {
      //   'super-admin-auth-background':
      //     "url('assets/images/super-admin-background-image.png')",
      // },
      width: {
        67: '67.666667%;',
      },
      fontFamily: {
        'open-sans': ['Open Sans'],
        'dm-sans': ['DM Sans'],
      },
      fontSize: {
        'text-10xl': '0.70rem',
      },
      colors: {
        'heading-color': '#1A1A1A',
        'text-color': ' #6A6A6A',
        'dark-blue': '#4283F4',
        'light-gray': '#F8F8F8',
        'primary' : 'var(--theme-primary)',
        'secondary' : 'var(--theme-secondary)',
        'secondary2' : 'var(--theme-secondary2)',
        'foreground' : 'var(--theme-foreground)',
        'faded' : 'var(--theme-faded)',
        'background' : 'var(--theme-background)',
        'misc' : 'var(--theme-color)',
      },
    },
  },
  plugins: [],
};
