/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,tsx,ts}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/forms')],
};
