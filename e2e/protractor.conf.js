// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

const config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  directConnect: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};

if (process.env.TRAVIS) {

  var capabilities = [
    // [platform, browsername, version]
    ['macOS 10.14', 'chrome', '71.0'],
    ['macOS 10.14', 'chrome', '70.0'],
    ['macOS 10.14', 'chrome', '68.0'],
    ['Windows 10', 'MicrosoftEdge', '16.16299'],
    ['Windows 10', 'MicrosoftEdge', '15.15063'],
    // TODO Check why getting window height does not work in android any more
    // ['Linux', 'android', '6.0']
    // TODO Selenium Driver problem for the following
    // ['macOS 10.12', 'safari', '10.0'],
    // ['Windows 10', 'internet explorer', '11.103'],
    // ['Windows 10', 'firefox', '50.0'],
    // TODO Problem calculating the target position in tests
    // ['OS X 10.10', 'iphone', '10.0'],
    // ['OS X 10.10', 'iphone', '9.3']
  ];

  // Override the baseUrl, as the port is a different one
  config.baseUrl = 'http://localhost:8000/';
  config.multiCapabilities = capabilities.map(function (capability) {
    return {
      browserName: capability[1],
      platform: capability[0],
      version: capability[2],
      shardTestFiles: true,
      name: 'NgxPageScroll',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
    }
  });
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.sauceBuild = 'travis-build#' + process.env.TRAVIS_BUILD_NUMBER;
} else {
  config.multiCapabilities = [{browserName: 'chrome'}];
}

exports.config = config;
