import uglify from 'rollup-plugin-uglify';

export default {
    input: 'ng2-page-scroll.js',
    output: {
        file: 'bundles/ng2-page-scroll.umd.min.js',
        format: 'umd'
    },
    external: [
        '@angular/core',
        '@angular/router',
        '@angular/platform-browser',
        '@angular/common'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/router': 'ng.router',
        '@angular/platform-browser': 'ng.platform-browser',
        '@angular/common': 'ng.common'
    },
    name: 'ng2.page.scroll',
    plugins: [
        uglify()
    ]
}
