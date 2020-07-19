### 7.0.2 (2020-07-19)

### Other

_ Add angular v10 to supported versions
- Update demo app to angular 10

### 7.0.1 (2020-03-07)

### Feature

- Use `fragment` attribute as scroll target source ([#403](https://github.com/Nolanus/ngx-page-scroll/issues/403))

### Fix

- Remove usage of deprecated `preserveQueryParams` ([#392](https://github.com/Nolanus/ngx-page-scroll/issues/392))

### Other

- Document the `scrollInView` feature, which has been around since last version
- Update demo application to angular 9

## 7.0.0 (2019-08-31)

### Breaking Change

- This release requires angular v8 or later

### Other

- Update dependencies and build script problems

## 6.0.2 (2019-06-05)

Note: This release mainly reverts the changes made in v6.0.1

### Fix

- Revert to angular@7 build tools to produce compatible bundle files ([#363](https://github.com/Nolanus/ngx-page-scroll/issues/363))

## 6.0.1 (2019-06-01)

### Other

- Update dependencies (add angular 8 support)

## 6.0.0 (2019-05-22)

### Other

- Adjust wrong peer dependency between core and directive module [#354](https://github.com/Nolanus/ngx-page-scroll/issues/354)
- Update dependencies

## 6.0.0-beta.1 (2019-02-15)

### Fix

- Using non-`forRoot()` import did not work ([#341](https://github.com/Nolanus/ngx-page-scroll/issues/341))

### Other

- Update third party dependencies
- Add back some library project package.json properties

## 6.0.0-beta.0 (2019-01-23)

### Breaking Change

- Modularization ([#88](https://github.com/Nolanus/ngx-page-scroll/issues/88)): The library has been split up into two npm modules: `ngx-page-scroll-core` and `ngx-page-scroll`. The core module contains the `PageScrollService` and does not depend on `@angular/router` any more. The latter mentioned module has a peer dependency on the NgxPageScrollCore Module and provides the `pageScroll` directive. [Read this comment on how to upgrade](https://github.com/Nolanus/ngx-page-scroll/issues/88#issuecomment-456824209)
- The build system has been changed and now uses angular-cli
- Set minimum supported angular version to 7

### Other

- Unit tests are executed and will be added in the future

## 5.0.1 (2018-11-30)

### Other

- Add angular 7 to supported version range ([#329](https://github.com/Nolanus/ngx-page-scroll/issues/329))

## 5.0.0 (2018-05-12)

### Breaking change

- Now requires angular@6.0.0 or higher

### Other

- Update dependencies
- Add in-dialog scrolling example

## 4.0.2 (2017-11-09)

### Other

- Revert to use angular 4 compiler to produce backward compatible metadata.json files ([#257](https://github.com/Nolanus/ngx-page-scroll/issues/257))

## 4.0.1 (2017-11-07)

### Other

- Enhance supported angular version to include angular 5 ([#254](https://github.com/Nolanus/ngx-page-scroll/issues/254))

## 4.0.0 (2017-10-30)

### Breaking change

- Change package name prefix from ng2 to ngx ([#164](https://github.com/Nolanus/ngx-page-scroll/issues/164))

### Other

- Remove some `@private` jsdoc comments to avoid syntax highlighter/lint warnings
- Remove the `.forRoot()` method from NgxPageScrollModule which was marked as deprecated since 4.0.0-beta.10

## 4.0.0-beta.12 (2017-10-25)

### Fix

- Restore support for id selectors starting with a numeric value ([#205](https://github.com/Nolanus/ngx-page-scroll/issues/205))
- Cross-route scrolling ([#185](https://github.com/Nolanus/ngx-page-scroll/issues/185))
- Inconsistent logging levels ([#207](https://github.com/Nolanus/ngx-page-scroll/issues/207))

### Other

- Remove typings type definitions ([#237](https://github.com/Nolanus/ngx-page-scroll/issues/237))
- Update to later rollup version (751642b)
- Updated demo app dependencies (d2788c9)

## 4.0.0-beta.11 (2017-08-04)

### Fix

- Adjust the minimum angular version to 4.2.6

## 4.0.0-beta.10 (2017-08-03)

### Breaking change

- The `pageScrollInstance` factory methods marked as deprecated since v4.0.0-beta.5 have been removed. 

### Feature

- The `scrollTarget` parameter for `pageScrollInstance` creation may now take any valid css selector ([#193](https://github.com/Nolanus/ngx-page-scroll/issues/193)) 

### Other

- Remove the flawed `forRoot()` approach for module and introduced singleton patter ([#96](https://github.com/Nolanus/ngx-page-scroll/issues/96), [#190](https://github.com/Nolanus/ngx-page-scroll/issues/190), thanks to @achimha) 
- Updated dependencies
- Raised minimum supported angular version to 4.2.0

## 4.0.0-beta.9 (2017-06-13)

### Fix

- Scrolling upwards with pageScrollSpeed option resulted in immediate jump ([#170](https://github.com/Nolanus/ngx-page-scroll/issues/170))

### Other

- Updated dependencies

## 4.0.0-beta.8 (2017-05-21)

### Other

- Updated dependencies and fix tests

## 4.0.0-beta.7 (2017-04-24)

### Fix

- Scrolling did not start at top of screen but from previus scroll start position (05ea7c4) ([#125](https://github.com/Nolanus/ngx-page-scroll/issues/125))

### Other

- Updated development dependencies to use angular 4

## 4.0.0-beta.6 (2017-03-26)

### Breaking Change

- Interrupt listener for mouse clicks now only interrupts the scroll animation if click happens inside the scroll container (e8e3100)

### Feature

- Adjust route hash on scrolling using `pageScroll` directive (559ef67)

### Fix

- Bug where `stopAll` did not stop all running pageScroll instances (d5de63d)

### Other

- Document namespace feature in demo app (b53881e)
- Loosen peer deps for work with angular 4 ([#106](https://github.com/Nolanus/ngx-page-scroll/issues/106), [#107](https://github.com/Nolanus/ngx-page-scroll/issues/107), [#108](https://github.com/Nolanus/ngx-page-scroll/issues/108), [#109](https://github.com/Nolanus/ngx-page-scroll/issues/109), [#110](https://github.com/Nolanus/ngx-page-scroll/issues/110), [#113](https://github.com/Nolanus/ngx-page-scroll/issues/113))
- Do not publish travis deployment specific files to npm ([#112](https://github.com/Nolanus/ngx-page-scroll/issues/112))
- Remove inadvertent fdescribe in e2e specs
- Fixed README typos

## 4.0.0-beta.5 (2017-03-11)

### Feature 

- New factory method `newInstance` at PageScrollInstance that consumes an options object. The other factory methods are deprecated and will be removed in final release.
- Advanced offset position calculation for inline scrolling ([#92](https://github.com/Nolanus/ngx-page-scroll/issues/92))

### Fixes

- Changes to the input values for the directive where not respected ([#84](https://github.com/Nolanus/ngx-page-scroll/issues/84))
- Default LogLevel in PageScrollConfig was too low

### Other

- First release that automatically gets tested in multiple browser using SauceLabs ;) 

## 4.0.0-beta.4 (2017-02-11)

### Fixes

- No scroll animation took place if routerLink directive was present on directive element and target route already active (#68)

### Other

- Upgrade angular dependencies, now requires version 2.4.0 or later

## 4.0.0-beta.3 (2017-01-30)

### Other

- Remove source map reference from published files ([#72](https://github.com/Nolanus/ngx-page-scroll/issues/72))

## 4.0.0-beta.2 (2016-12-22)

### Feature

- Horizontal scrolling feature ([#61](https://github.com/Nolanus/ngx-page-scroll/issues/61))

### Fixes

- Problem with not revmoved timer reference (fix [#64](https://github.com/Nolanus/ngx-page-scroll/issues/64))

### Other

- Update dependencies, especially angular to support version 2.4.0 and later

## 4.0.0-beta.1 (2016-11-17)

### Other

- Update dependencies, especially angular to support version 2.2.0

## 4.0.0-beta.0 (2016-11-13)

### Breaking Change

- Use static `forRoot()` method when importing `Ng2PageScrollModule`

## 3.2.3 (2016-11-12)

### Feature

- Add static `forRoot()` method for lazy loaded modules to Ng2PageScrollModule

### Other

- Adjust peer dependency to satisfy angular 2.1.2 deps 

## 3.2.2 (2016-11-11)

### Fixes

- Scrolling stops in case the scrollTop value were floating point numbers, resulting in `===` comparisons to be false. Fix by comparing rounded and delta values (fixes [#55](https://github.com/Nolanus/ngx-page-scroll/issues/55))

### Other

- Update dependency versions

## 3.2.1 (2016-11-03)

### Fixes

- Remove `*.ts` files from npm published package (fixes [#54](https://github.com/Nolanus/ngx-page-scroll/issues/54))
- Package.json scripts calling executables in node_modules folder

### Other

- Update to protractor 4.0.10
- Elongate demo app dummy texts

## 3.2.0 (2016-10-22)

### Other 

- scrollFinish event now fires when scroll target can not be found and it can not be scrolled any closer to the target (fixes [#50](https://github.com/Nolanus/ngx-page-scroll/issues/50))
- Typo in README
- Demo app enhancement + new e2e tests

## 3.1.6 (2016-10-15)

### Fixes 

- Wrong peer dependency

## 3.1.5 (2016-10-13)

### Fixes 

- Make router an optional injection for pageScroll directive (it however requires `@angular/router` to be included)

### Other

- Update dependencies (angular 2.1) 

## 3.1.4 (2016-10-10)

### Fixes

- Private method handleClick() referenced in template 

## 3.1.3 (2016-10-10)

### Other

- Add some files to npmignore to make the npm-build smaller
- Update Readme to showcase usage of the new angular2 modules and commonJs

## 3.1.2 (2016-10-08)

### Other

- TypeScript parameter type change to satisfy ngc (angular compiler) 


## 3.1.1 (2016-10-01)

### Other

- Update peer dependency to angular 2.0.1 and add back tilde/range constraint 


## 3.1.0 (2016-09-16)

### Other

- Update dependencies to support final angular 2.0.0 release
- Enhance demo app to be a little more descriptive
- Add e2e tests
- Fix documentation mistakes

## 3.0.0 (2016-09-05)

Breaking Change:
- Only angular version 2 rc.5 or later supported
- defaultEasingFunction interface has been removed in favour of defaultEasingLogic abstract class to be extended/overridden for defining custom easing methods

Feature:

- automatically stop the scroll timer task when an end of the scroll-region has been reached 

### Fixes

- Non working event emitter and directive scrolls not working properly on consecutive clicks 

### Other

- Added ngModule conform export
- New demo application started with angular-cli

## 2.0.0 (2016-09-03)

Breaking Change:

- New `PageScrollService` needs to be added to the bootstrap() calls provider array.

Feature:

- Service implementation to trigger scroll animations from other places than an element click
- Set the scroll container to scroll "inline" (e.g. a div with fixed height and vertical scroll bar)

### Other

- Reorganized Readme

## 1.2.1 (2016-07-23)

### Fixes

- Problem with Event gloval in angular universal  (thanks to [threesquared](https://github.com/threesquared), PR #20) 

### Other

- New angular version (rc.4)
- New angular router version (beta.2)

## 1.2.0 (2016-06-30)

### Fixes

- Scrolling did not work properly when initial scrollTop value was greater 0 (fixes [#15](https://github.com/Nolanus/ngx-page-scroll/issues/15)) 

Enhance:

- Use another scrollTop source to increase cross browser support

### Other

- New angular version (rc.3)
- New angular router version (alpha.8)

## 1.1.1 (2016-06-10)

### Fixes

- TypeScript error TS2322 when instantiating EventEmitter

### Other

- Added TSLint and adjusted styling

## 1.1.0 (2016-05-28)

### Breaking Change

- The `pageScrollFinish` event is now called for interrupted/interfered page 
scroll animations as well. A boolean is emitted, indicating whether the 
animation got interrupted.

### Feature

- The new property `pageScrollInterruptible` allows setting whether a 
triggered scroll animation should be interrutible or not. A page wide 
default can be specified using `PageScrollConfig.defaultInterruptible`.

### Fixes

- Only register event listeners for running page scroll animations to 
save resources (fixes #9)
- Overshooting target when large distance to scroll and short scroll animation 
duration (fixes #7)
- body.scrollTop not working on non-Blink based browser like Firefox and IE 
(thanks to [bensgroi](https://github.com/bensgroi), [#10](https://github.com/Nolanus/ngx-page-scroll/issues/10))
 
### Other

- Running animations are stopped when pressing a pageScroll link, even if the 
scroll target is not found or already reached (previously it did not stop).

## 1.0.0-beta.1 (2016-05-19)

### Fixes

- Referencing non existing variable causes error in non webkit-based 
browser (fixes [#5](https://github.com/Nolanus/ngx-page-scroll/issues/5))

## 1.0.0-beta.0 (2016-05-05)

### Breaking Change

- Now using angular RC scoped packages and the new router

## 0.2.3 (2016-04-28)

### Other

- Bumped supported angular2 version to beta.16
- Prepared demo app the showcase HashLocationStrategy

## 0.2.2 (2016-04-07)

### Other

- Bumped supported angular2 version beta.14
- Added example app

## 0.2.0 (2016-03-28)

### Breaking Change

- event indicating the end of the scroll-animation has been renamed from 
`scrollFinish` to `pageScrollFinish` for consistency with all other 
attributes/properties.
  
### Feature

- Introducing `PageScrollConfig` class to specify defaults for all 
`pageScroll` directive usages.
- Customizable easing method

### Other

- Spelling mistakes and enhanced documentation

## 0.1.1 (2016-03-26)

Initial release

## 0.1.0 (2016-03-26)

First draft
