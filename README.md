[![npm version](https://img.shields.io/npm/v/ng2-page-scroll.svg?style=flat)](https://www.npmjs.com/package/ng2-page-scroll)
[![Code Climate](https://codeclimate.com/github/Nolanus/ng2-page-scroll/badges/gpa.svg)](https://codeclimate.com/github/Nolanus/ng2-page-scroll)
[![Dependency Status](https://david-dm.org/Nolanus/ng2-page-scroll.svg)](https://david-dm.org/Nolanus/ng2-page-scroll)
[![devDependency Status](https://david-dm.org/Nolanus/ng2-page-scroll/dev-status.svg)](https://david-dm.org/Nolanus/ng2-page-scroll#info=devDependencies)

# ng2-page-scroll
"Scroll to element" functionality rewritten in a pure angular2 directive with no additional dependencies

## Features
- scroll to the top edge of an element referenced in the href-attribute (`href="#mytarget`)
- stops scrolling if the user interferes (e.g. scrolling on its own, pressing up/down-keys)
- works across routes (scrolls to target element as soon as the routing has finished)

## Installation
First you need to install the npm module:
```sh
npm install ng2-page-scroll --save
```

Then import the directive and add it to the `directives` array of your component. In your template you may not add the `pageScroll` attribute to elements with an `href` attribute pointing towards an anchor on the same page.
```js
import {PageScroll} from 'ng2-page-scroll';


@Component({
   ...
   template: `...
        <a pageScroll pageScrollOffset="50" [routerLink]="['Home']" href="#myanchor">Go there</a>
   ...`,
    directives: [PageScroll]
})
export class MyComponent  {
}
```

## Using

### ScrollPage properties
- `pageScrollOffset` (`?:number=0`) - Pixels to offset from the top of the element when scrolling to (positive value = scrolling will stop given pixels atop the target element)
- `pageScrollDuration` (`?:number=1250`) - Duration in milliseconds the whole scroll-animation should last 

### ScrollPage events
- `scrollFinish` - fired when the scroll-animation reached its target. Note that it will never get called if the user interferes the scrolling.

## TODO:

* Custom easing functions
* Documentation/example site
* Unit tests
* Test accross browsers

## License

[MIT](LICENSE)
