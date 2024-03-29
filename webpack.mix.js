const mix = require('laravel-mix');

mix.webpackConfig({
    resolve: {
        alias: {
            '~': path.resolve(__dirname,'resources/js')
        }
    }
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/main.js', 'public/js/bundle.js')
    .sass('resources/sass/app.scss', 'public/css');

mix.sass('resources/sass/landing.scss', 'public/css')
    .copy('resources/images', 'public/images');
