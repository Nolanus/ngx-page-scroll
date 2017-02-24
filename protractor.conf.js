var config = {
    baseUrl: 'http://localhost:4200/',
    specs: ['test/e2e/**/*.spec.js'],
    directConnect: false,
    exclude: [],
    allScriptsTimeout: 110000,
    getPageTimeout: 100000,
    framework: 'jasmine2',
    jasmineNodeOpts: {
        isVerbose: false,
        showColors: true,
        includeStackTrace: false,
        defaultTimeoutInterval: 400000,
        helpers: ['node_modules/jasmine-expect/index.js']
    },

    /**
     * ng2 related configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     *
     */
    useAllAngular2AppRoots: true
};

if (process.env.TRAVIS) {
    // Override the baseUrl, as the port is a different one
    config.baseUrl = 'http://localhost:8000/';
    config.multiCapabilities = [{
        browserName: 'chrome',
        platform: 'Windows 10',
        version: '56.0',
        shardTestFiles: true,
        name: 'Ng2PageScroll',
        maxInstances: 5,
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
    }];
    config.sauceUser = process.env.SAUCE_USERNAME;
    config.sauceKey = process.env.SAUCE_ACCESS_KEY;
    config.sauceBuild = 'travis-build#' + process.env.TRAVIS_BUILD_NUMBER;
} else {
    config.multiCapabilities = [{browserName: 'chrome'}];
}

exports.config = config;
