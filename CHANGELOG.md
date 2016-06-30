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
