## 4.0.0-beta.0 (2016-11-13)

Breaking Change:

- Use static `forRoot()` method when importing `Ng2PageScrollModule`

## 3.2.3 (2016-11-12)

New:

- Add static `forRoot()` method for lazy loaded modules to Ng2PageScrollModule

Other:

- Adjust peer dependency to satisfy angular 2.1.2 deps 

## 3.2.2 (2016-11-11)

Fix:

- Scrolling stops in case the scrollTop value were floating point numbers, resulting in `===` comparisons to be false. Fix by comparing rounded and delta values (fixes #55)

Other:

- Update dependency versions

## 3.2.1 (2016-11-03)

Fix:

- Remove `*.ts` files from npm published package (fixes #54)
- Package.json scripts calling executables in node_modules folder

Other:

- Update to protractor 4.0.10
- Elongate demo app dummy texts

## 3.2.0 (2016-10-22)

Other: 

- scrollFinish event now fires when scroll target can not be found and it can not be scrolled any closer to the target (fixes #50)
- Typo in README
- Demo app enhancement + new e2e tests

## 3.1.6 (2016-10-15)

Fix: 

- Wrong peer dependency

## 3.1.5 (2016-10-13)

Fix: 

- Make router an optional injection for pageScroll directive (it however requires `@angular/router` to be included)

Other:

- Update dependencies (angular 2.1) 

## 3.1.4 (2016-10-10)

Fix:

- Private method handleClick() referenced in template 

## 3.1.3 (2016-10-10)

Other:

- Add some files to npmignore to make the npm-build smaller
- Update Readme to showcase usage of the new angular2 modules and commonJs

## 3.1.2 (2016-10-08)

Other:

- TypeScript parameter type change to satisfy ngc (angular compiler) 


## 3.1.1 (2016-10-01)

Other:

- Update peer dependency to angular 2.0.1 and add back tilde/range constraint 


## 3.1.0 (2016-09-16)

Other:

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

Fix:

- Non working event emitter and directive scrolls not working properly on consecutive clicks 

Other:

- Added ngModule conform export
- New demo application started with angular-cli

## 2.0.0 (2016-09-03)

Breaking Change:

- New `PageScrollService` needs to be added to the bootstrap() calls provider array.

Feature:

- Service implementation to trigger scroll animations from other places than an element click
- Set the scroll container to scroll "inline" (e.g. a div with fixed height and vertical scroll bar)

Other:

- Reorganized Readme

## 1.2.1 (2016-07-23)

Fix:

- Problem with Event gloval in angular universal  (thanks to [threesquared](https://github.com/threesquared), PR #20) 

Other:

- New angular version (rc.4)
- New angular router version (beta.2)

## 1.2.0 (2016-06-30)

Fix:

- Scrolling did not work properly when initial scrollTop value was greater 0 (fixes #15) 

Enhance:

- Use another scrollTop source to increase cross browser support

Other:

- New angular version (rc.3)
- New angular router version (alpha.8)

## 1.1.1 (2016-06-10)

Fix:

- TypeScript error TS2322 when instantiating EventEmitter

Other:

- Added TSLint and adjusted styling

## 1.1.0 (2016-05-28)

Breaking Change:

- The `pageScrollFinish` event is now called for interrupted/interfered page 
scroll animations as well. A boolean is emitted, indicating whether the 
animation got interrupted.

Feature:

- The new property `pageScrollInterruptible` allows setting whether a 
triggered scroll animation should be interrutible or not. A page wide 
default can be specified using `PageScrollConfig.defaultInterruptible`.

Fix:

- Only register event listeners for running page scroll animations to 
save resources (fixes #9)
- Overshooting target when large distance to scroll and short scroll animation 
duration (fixes #7)
- body.scrollTop not working on non-Blink based browser like Firefox and IE 
(thanks to [bensgroi](https://github.com/bensgroi), #10)
 
Other:

- Running animations are stopped when pressing a pageScroll link, even if the 
scroll target is not found or already reached (previously it did not stop).

## 1.0.0-beta.1 (2016-05-19)

Fix:

- Referencing non existing variable causes error in non webkit-based 
browser (fixes #5)

## 1.0.0-beta.0 (2016-05-05)

Breaking Change:

- Now using angular RC scoped packages and the new router

## 0.2.3 (2016-04-28)

Other:

- Bumped supported angular2 version to beta.16
- Prepared demo app the showcase HashLocationStrategy

## 0.2.2 (2016-04-07)

Other:

- Bumped supported angular2 version beta.14
- Added example app

## 0.2.0 (2016-03-28)

Breaking Change:

- event indicating the end of the scroll-animation has been renamed from 
`scrollFinish` to `pageScrollFinish` for consistency with all other 
attributes/properties.
  
Features:

- Introducing `PageScrollConfig` class to specify defaults for all 
`pageScroll` directive usages.
- Customizable easing method

Other:
- Spelling mistakes and enhanced documentation

## 0.1.1 (2016-03-26)

Initial release

## 0.1.0 (2016-03-26)

First draft
