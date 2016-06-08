[![npm version](https://img.shields.io/npm/v/ng2-page-scroll.svg?style=flat)](https://www.npmjs.com/package/ng2-page-scroll)
[![Code Climate](https://codeclimate.com/github/Nolanus/ng2-page-scroll/badges/gpa.svg)](https://codeclimate.com/github/Nolanus/ng2-page-scroll)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/Nolanus/ng2-page-scroll.svg)](https://david-dm.org/Nolanus/ng2-page-scroll)
[![devDependency Status](https://david-dm.org/Nolanus/ng2-page-scroll/dev-status.svg)](https://david-dm.org/Nolanus/ng2-page-scroll#info=devDependencies)

# ng2-page-scroll

Animated "Scroll to element" functionality rewritten in a pure angular2 
directive with no additional dependencies

## Features

- scroll to the top edge of an element referenced in the href-attribute 
(`href="#mytarget`)
- customizable: stops scrolling if the user interrupts 
([read more](https://github.com/Nolanus/ng2-page-scroll/wiki/Scroll-Interruption-Interference))
- works across routes (scrolls to target element as soon as the 
routing has finished)
- custom easing functions to calculate the scroll position over time

## Setup

First you need to install the npm module:
```sh
npm install ng2-page-scroll --save
```

Then import the directive and add it to the `directives` array of you
 component. In your template you may now add the `pageScroll` attribute 
 to elements with an `href` attribute pointing towards an anchor on the 
 same page (e.g. `#anchor`).

```js
import {PageScroll} from 'ng2-page-scroll';


@Component({
   ...
   template: `...
        <a pageScroll href="#myanchor">Go there</a>
   ...`,
    directives: [PageScroll]
})
export class MyComponent  {
}
```

## Configuration

The class `PageScrollConfig` offers static properties to be manipulated to 
configure the default behavior. Override the respective properties to change 
all page scroll-animation defaults.

### Configuration properties

- `defaultScrollOffset` (`?:number=0`) - Pixels to offset from the top of 
the element when scrolling to (positive value = scrolling will stop given 
pixels atop the target element).
- `defaultDuration` (`?:number=0`) - Duration in milliseconds the whole 
scroll-animation should last.
- `defaultInterruptible` (`?:boolean=true`) - Whether the scroll animation 
should stop if the user interferes with it (true) or not (false).
- `defaultEasingFunction` (`?:IEasingFunction=_linearEasing`) - Easing method 
to be used while calculating the scroll position over time 
(default is linear easing).

### Example

```js
import {PageScrollConfig} from 'ng2-page-scroll';

export class AppComponent {
    constructor() {
        PageScrollConfig.defaultScrollOffset = 50;
        PageScrollConfig.defaultEasingFunction = (t:number, b:number, c:number, d:number):number => {
            // easeInOutExpo easing
            if (t === 0) return b;
            if (t === d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
    }
}
```

## API

All properties may be set on individual elements as well. They take precedence 
over the default settings specified in `PageScrollConfig` class. Thereby it is 
possible to have all page scroll-animations last e.g. 2 seconds, but a 
specific one should be performed with a custom easing function and a duration 
of only 1 second.

### PageScroll properties

- `pageScroll` - Attribute to add scroll-animation behavior when the 
`click`-event happens to an existing element.
- `pageScrollOffset` (`?:number=0`) - Pixels to offset from the top of the 
element when scrolling to (positive value = scrolling will stop given pixels 
atop the target element).
- `pageScrollDuration` (`?:number=1250`) - Duration in milliseconds the whole 
scroll-animation should last.
- `pageScrollInterruptible` (`?:boolean=true`) - Whether the scroll animation 
should stop if the user interferes with it (true) or not (false).
- `pageScrollEasing` (`?:IEasingFunction=linearEasing`) - Easing method to be 
used while calculating the scroll position over time (default is linear easing).

### PageScroll events

- `pageScrollFinish` - fired when the scroll-animation stops. Emits a boolean 
value which indicates whether the scroll animation finished successfully and 
reached its target (true) or whether it got interrupted due to another scroll 
animation starting or user interaction (false).

### Example

Most basic example:

```html
 <a pageScroll href="#myanchor">Go there</a>
```

The following example will check whether the route _Home_ is currently loaded. 
If this is true, the scroll-animation will be performed with the default 
properties. If a different route is loaded, a subscription for route changes 
will be made and the scroll-animation will be performed as soon as the new 
route is loaded.

```html
 <a pageScroll [routerLink]="['Home']" href="#myanchor">Go there</a>
```

Overriding all possible properties. `doSmth()` and `linearEasing` are 
defined in the component

```html
 <a pageScroll [pageScrollOffset]="0" [pageScrollDuration]="2000" [pageScrollEasing]="linearEasing" [pageScrollInterruptible]="false" (pageScrollFinish)="doSmth($event)" href="#theanchor">Visit</a>
```

```js
    linearEasing:IEasingFunction = (t:number, b:number, c:number, d:number):number => {
        // Linear easing
        return c * t / d + b;
    };

    doSmth(reachedTarget:boolean) {
        if (reachedTarget){
            console.log('Yeah, we reached our destination');
        } else {
            console.log('Ohoh, something interrupted us');
        }
    }
```

## Example App

The [_example_](example) subfolder contains a clone of the 
[angular2 quickstart](https://github.com/angular/quickstart) repository 
adapted to showcase the functionality of ng2-page-scroll. Run the 
example app by checking out that repository and execute the 
following command in the project root directory:

 ```
 npm run example
 ```
  
 This will perform the following steps:

 ```
 // Install the ng2-page-scroll project
 npm install
 // Change into the example website folder
 cd example/
 // Uninstall the current ng2-page-scroll version
 npm uninstall ng2-page-scroll
 // Install the example website's dependencies
 npm install
 // Run the server
 npm start
 ```

## TODO:

* Unit tests
* Test across browsers

## License

[MIT](LICENSE)
