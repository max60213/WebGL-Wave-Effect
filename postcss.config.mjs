const config = {
  plugins: {
    "postcss-import": {},        // 1. Import other CSS files first
    "postcss-mixins": {},        // 2. Process mixins early  
    "postcss-nested": {},        // 3. Unnest nested CSS (move up)
    "@tailwindcss/postcss": {},  // 4. Process Tailwind CSS
    "autoprefixer": {},          // 5. Add vendor prefixes last
  },
};

export default config;
