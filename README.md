[![npm version](https://img.shields.io/npm/v/ng2-page-scroll.svg?style=flat)](https://www.npmjs.com/package/ng2-page-scroll)
[![Code Climate](https://codeclimate.com/github/Nolanus/ng2-page-scroll/badges/gpa.svg)](https://codeclimate.com/github/Nolanus/ng2-page-scroll)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/Nolanus/ng2-page-scroll.svg)](https://david-dm.org/Nolanus/ng2-page-scroll)
[![devDependency Status](https://david-dm.org/Nolanus/ng2-page-scroll/dev-status.svg)](https://david-dm.org/Nolanus/ng2-page-scroll#info=devDependencies)

# ng2-page-scroll

Animated "scroll to element" functionality written in pure angular2 
with no additional dependencies

## Features

- easy-to-use directive: scroll to the top edge of an element referenced in the href-attribute 
(`href="#mytarget`) just by adding `pageScroll` directive
- service usage: trigger scroll animations from your component or when server responds
- customizable: adjust duration, offset or whether stops scrolling if the user interrupts 
([read more](https://github.com/Nolanus/ng2-page-scroll/wiki/Scroll-Interruption-Interference))
- custom easing functions to calculate the scroll position over time
- works across routes (scrolls to target element as soon as the 
routing has finished)

## Table of contents

- [Setup](#setup)
- [Usage](#usage)
    - [Directive](#directive)
    - [Service](#service)
- [Configuration](#configuration)
- [Directive API](#directive-api)
- [Example app](#example-app)

## Setup

First you need to install the npm module:
```sh
npm install ng2-page-scroll --save
```

Then add the `PageScrollService` to the providers array of your applications bootstrap function:

```js
bootstrap(AppComponent, [
    // Other providers go here
    PageScrollService
]);

```

To ensure there's only one instance of a PageScrollService (Singleton) it is recommended to add the 
PageScrollService to only one Injector, preferably the root injector of the application. You may read 
more about [angular 2 dependency injection hierarchy at their documentation](https://angular.io/docs/ts/latest/guide/hierarchical-dependency-injection.html). 

## Usage 

### Directive

Import the directive and add it to the `directives` array of you
 component. In your template you may now add the `pageScroll` attribute 
 to elements with an `href` attribute pointing towards an id on the 
 same page (e.g. `#theId`).

```js
import {PageScroll} from 'ng2-page-scroll';

@Component({
   ...
   template: `...
        <a pageScroll href="#awesomePart">Take me to the awesomeness</a>
        <!-- Further content here -->
        <h2 id="awesomePart">This is where the awesome happens</h2>
   ...`,
    directives: [PageScroll]
})
export class MyComponent {
}
```

### Service

You may use the service for more advanced scroll animations. Using the service you may trigger scroll 
animations on any custom event or more complex configuration. Possible usa cases are server responses or 
after content initialization.
 
Start by obtaining a reference to the `PageScrollService` instance by adding it to your component's 
constructor. The `PageScrollService` offers a `start()` method to trigger `PageScrollInstance`s. 
A `PageScrollInstance` is an object encapsulating all information relevant for performing a scroll animation.
You may create a new `PageScrollInstance` by using the provided factory methods 
`PageScrollInstance#simpleInstance`, `PageScrollInstance#simpleInlineInstance`, and 
`PageScrollInstance#advancedInstance`.

```js
@Component({
    template: `
        <p>Main content</p>
        <!-- Further content here -->
        <h2 id="head2">Part in a container</h2>
        <div #container>
            <p>Container content</p>
            <h3 id="head3">Heading</h3>
        </div>`
})
export class MyComponent {

     @ViewChild('container')
     private container: ElementRef;

     constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: Document) {
     }

     public goToHead2(): void {
         let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#head2');
         this.pageScrollService.start(pageScrollInstance);
     }; 

     public goToHeadingInContainer(): void {
         let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInlineInstance(this.document, '#head3', this.container.nativeElement);
         this.pageScrollService.start(pageScrollInstance);
     };
 }
 ```

## Configuration

The class `PageScrollConfig` offers static properties to be manipulated to 
configure the default behavior. Override the respective properties to change 
all page scroll-animation defaults.

| Configuration Option    | Type            | Default      | Description   |
| ----------------------- | --------------- | ------------ |-------------- |
| `defaultScrollOffset`   | number          | 0            | Pixels to offset from the top of the element when scrolling to (positive value = scrolling will stop given pixels atop the target element).
| `defaultDuration`       | number          | 1250         | Duration in milliseconds the whole scroll-animation should last.
| `defaultInterruptible`  | boolean         | true         | Whether the scroll animation should stop if the user interferes with it (true) or not (false).
| `defaultEasingFunction` | IEasingFunction | linearEasing | Easing method to be used while calculating the scroll position over time (default is linear easing).

### Example

```js
import {PageScrollConfig} from 'ng2-page-scroll';

export class AppComponent {
    constructor() {
        PageScrollConfig.defaultScrollOffset = 50;
        PageScrollConfig.defaultEasingFunction = (t: number, b: number, c: number, d: number): number => {
            // easeInOutExpo easing
            if (t === 0) return b;
            if (t === d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
    }
}
```

## Directive API

Additional attributes may be set on an DOM element using the `pageScroll` directive for customization.
They take precedence over the default settings specified in `PageScrollConfig` class. Thereby it is 
possible to have all page scroll-animations last e.g. 2 seconds, but a specific one should be performed with a custom easing function and a duration 
of only 1 second.

### PageScroll properties

| Attribute                 | Type            | Default      | Description   |
| ------------------------- | --------------- | ------------ |-------------- |
| `pageScroll`              |                 |              | Attribute adding scroll-animation behavior when the `click`-event happens on the element.
| `pageScrollOffset`        | number          | 0            | Pixels to offset from the top of the element when scrolling to (positive value = scrolling will stop given pixels atop the target element).
| `pageScrollDuration`      | number          | 1250         | Duration in milliseconds the whole scroll-animation should last.
| `pageScrollInterruptible` | boolean         | true         | Whether the scroll animation should stop if the user interferes with it (true) or not (false).
| `pageScrollEasing`        | IEasingFunction | linearEasing | Easing method to be used while calculating the scroll position over time (default is linear easing).

### PageScroll events

| Event                 | Type    | Description   |
| --------------------- | ------- | ------------- |
| `pageScrollFinish`    | boolean | Fired when the scroll-animation stops. Emits a boolean value which indicates whether the scroll animation finished successfully and reached its target (true) or whether it got interrupted due to another scroll animation starting or user interaction (false).

### Example

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
    linearEasing:IEasingFunction = (t: number, b: number, c: number, d: number): number => {
        // Linear easing
        return c * t / d + b;
    };

    doSmth(reachedTarget: boolean): void {
        if (reachedTarget) {
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
