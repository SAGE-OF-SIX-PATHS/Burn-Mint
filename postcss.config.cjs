// postcss.config.cjs
module.exports = {
  plugins: {
    // If you use postcss-import to import css partials, ensure it is listed BEFORE tailwindcss.
    // But you should avoid importing the 'tailwindcss' package via CSS imports.
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  }
};
