export default {
    input: 'ngx-page-scroll.js',
    output: {
        file: 'bundles/ngx-page-scroll.umd.js',
        format: 'umd',
        name: 'ngx.page.scroll',
        globals: {
            '@angular/core': 'ng.core',
            '@angular/router': 'ng.router',
            '@angular/platform-browser': 'ng.platform-browser',
            '@angular/common': 'ng.common'
        }
    },
    external: [
        '@angular/core',
        '@angular/router',
        '@angular/platform-browser',
        '@angular/common'
    ]
}
