# ngx-page-scroll [![npm version](https://img.shields.io/npm/v/ngx-page-scroll.svg?style=flat)](https://www.npmjs.com/package/ngx-page-scroll) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Animated scrolling functionality for angular written in pure typescript with no additional dependencies

[![Build Status](https://travis-ci.org/Nolanus/ngx-page-scroll.svg?branch=master)](https://travis-ci.org/Nolanus/ngx-page-scroll)
[![Dependencies Status](https://david-dm.org/Nolanus/ngx-page-scroll.svg?path=projects/ngx-page-scroll)](https://david-dm.org/Nolanus/ngx-page-scroll?path=projects/ngx-page-scroll)
[![devDependencies Status](https://david-dm.org/Nolanus/ngx-page-scroll/dev-status.svg?path=projects/ngx-page-scroll)](https://david-dm.org/Nolanus/ngx-page-scroll?path=projects/ngx-page-scroll&type=dev)
[![peerDependencies Status](https://david-dm.org/Nolanus/ngx-page-scroll/peer-status.svg?path=projects/ngx-page-scroll)](https://david-dm.org/Nolanus/ngx-page-scroll?path=projects/ngx-page-scroll&type=peer)
[![Greenkeeper badge](https://badges.greenkeeper.io/Nolanus/ngx-page-scroll.svg)](https://greenkeeper.io/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2b93ea8939824803b0807b72a8c2f5a0)](https://www.codacy.com/app/sebastian-fuss/ngx-page-scroll?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Nolanus/ngx-page-scroll&amp;utm_campaign=Badge_Grade)

**Breaking Change**: Starting with v6 this library consists of two modules: `ngx-page-scroll-core` (the service) and `ngx-page-scroll` (the directive). [➡ How to upgrade](https://github.com/Nolanus/ngx-page-scroll/issues/88#issuecomment-456824209)

## Features

- flexible: trigger scroll animations after component load, server response, etc.
- easy-to-use directive: scroll to an element referenced in the href-attribute 
(`href="#mytarget`) just by adding `pageScroll` directive
- customizable: adjust duration, offset or whether scrolling stops if the user interrupts 
([read more](https://github.com/Nolanus/ngx-page-scroll/wiki/Scroll-Interruption-Interference))
- use custom easing functions to calculate the scroll position over time
- works across routes (scrolls to target element as soon as the 
routing has finished) and in both directions (horizontal/vertical)

## Table of contents

- [Service](#service)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Configuration](#configuration)
- [Directive](#directive)    
  - [Setup](#setup-1)
  - [Usage](#usage-1)
  - [Directive API](#directive-api)
  
## Service

### Setup

First you need to install the core npm module:
```sh
npm install ngx-page-scroll-core --save
```

Then add the `NgxPageScrollModule` to the imports array of your application module:

```typescript
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

@NgModule({
    imports: [
        /* Other imports here */
        NgxPageScrollCoreModule
        ]
})
export class AppModule {
}
```

### Usage

Using the `PageScrollService#scroll` method you may trigger scroll animations. Provide an options object that provides a reference to the document and the scroll target. Additional properties are optional.

```typescript
import { DOCUMENT, Inject } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll-core';

export class MyComponent {
 constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
 }
   
 ngOnInit(): void {
  this.pageScrollService.scroll({
    document: this.document,
    scrollTarget: '.theEnd',
  });
 }
}
``` 

Note: The `scroll()` method is a shorthand from creating a `PageScrollInstance` (an object encapsulating all information 
relevant for performing a scroll animation) using `PageScrollService#create` and starting it using 
the `PageScrollService#start` method.


### Configuration

When importing the `PageScrollCoreModule` one can provide option overrides:

```typescript
imports: [
  ...
  NgxPageScrollCoreModule.forRoot({duration: 2500, easingLogic: ...}),
]
```

Check the [`PageScrollConfig` interface](https://github.com/Nolanus/ngx-page-scroll/blob/master/projects/ngx-page-scroll-core/src/lib/types/page-scroll.config.ts#L3)
for possible options and their impact. The default values may be found in the [`defaultPageScrollConfig`](https://github.com/Nolanus/ngx-page-scroll/blob/master/projects/ngx-page-scroll-core/src/lib/provides/config.provider.ts#L6)
object.

## Directive

For ease of use a directive `pageScroll` exists, which allows you to quickly add scroll animations to your angular app by 
adding a property to your existing HTML a-tags. It can also work cross-routes, meaning it will start the scroll animation 
after the target route has been loaded.
It utilizes the ngx-page-scroll-core module for that, thus requires it as a peer dependency.

### Setup

First you need to install the directive npm module:
```sh
npm install ngx-page-scroll --save
```

Then add the `NgxPageScrollModule` to the imports array of your application module:

```typescript
import { NgxPageScrollModule } from 'ngx-page-scroll';

@NgModule({
    imports: [
        /* Other imports here */
        NgxPageScrollModule
        ]
})
export class AppModule {
}
```

### Usage 

In your template you may add the `pageScroll` attribute to elements with an `href` attribute pointing towards an id on 
the same page (e.g. `#theId`). The `onClick` event will be interrupted and the scroll animation starts.
Alternatively you may set the optional `pageScrollTarget` property to a valid css selector to specify the 
target element to scroll to.

```typescript

@Component({
   ...
   template: `...
        <a pageScroll href="#awesomePart">Take me to the awesomeness</a>
        <!-- Further content here -->
        <h2 id="awesomePart">This is where the awesome happens</h2>
   ...`,
})
export class MyComponent {
}
```

### Directive API

Additional attributes may be set on an DOM element using the `pageScroll` directive for customization.
They take precedence over the default settings specified in `PageScrollConfig` class. Thereby it is 
possible to have all page scroll-animations last e.g. 2 seconds, but a specific one should be performed with a custom easing function and a duration 
of only 1 second.

#### PageScroll properties

| Attribute                 | Type        | Default      | Description   |
| ------------------------- | ----------- | ------------ |-------------- |
| `pageScroll`              |             |              | Attribute adding scroll-animation behavior when the `click`-event happens on the element.
| `pageScrollTarget`        | string      |              | Optional attribute to set the element that should be scrolled to. Takes precedence over the ´href´-value
| `pageScrollHorizontal`    | boolean     | false        | Whether the scroll should happen in vertical direction (`false`, default) or horizontal (`true`).
| `pageScrollOffset`        | number      | 0            | Pixels to offset from the top of the element when scrolling to (positive value = scrolling will stop given pixels atop the target element).
| `pageScrollDuration`      | number      | 1250         | Duration in milliseconds the whole scroll-animation should last.
| `pageScrollSpeed`         | number      | -            | Speed in Pixel/Second the animation should take. Only applied if no duration is set. 
| `pageScrollInterruptible` | boolean     | true         | Whether the scroll animation should stop if the user interferes with it (`true`) or not (`false`).
| `pageScrollAdjustHash`    | boolean     | false        | Whether the [routes hash/fragment](https://angular.io/docs/ts/latest/guide/router.html#!#query-parameters) should be updated to reflect to section that has been scrolled to
| `pageScrollEasing`        | EasingLogic | linearEasing | Easing method to be used while calculating the scroll position over time (default is linear easing).

#### PageScroll events

| Event                 | Type    | Description   |
| --------------------- | ------- | ------------- |
| `pageScrollFinish`    | boolean | Fired when the scroll-animation stops. Emits a boolean value which indicates whether the scroll animation finished successfully and reached its target (`true`) or not (`false`). Possible reasons for false: target not found or interrupted due to another scroll animation starting or user interaction.

#### Example

The following example will check whether the route _Home_ is currently loaded. 
If this is true, the scroll-animation will be performed with the default 
properties. If a different route is loaded, a subscription for route changes 
will be made and the scroll-animation will be performed as soon as the new 
route is loaded.

```html
 <a pageScroll [routerLink]="['Home']" href="#myanchor">Go there</a>
```

Overriding all possible properties. `doSmth()` and `myEasing` are 
defined in the component

```html
 <a pageScroll [pageScrollOffset]="0" [pageScrollDuration]="2000" [pageScrollEasing]="myEasing" [pageScrollInterruptible]="false" (pageScrollFinish)="doSmth($event)" href="#theanchor">Visit</a>
```

```typescript
    public myEasing: EasingLogic = (t: number, b: number, c: number, d: number): number => {
      // easeInOutExpo easing
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      }
  
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }

    doSmth(reachedTarget: boolean): void {
        if (reachedTarget) {
            console.log('Yeah, we reached our destination');
        } else {
            console.log('Ohoh, something interrupted us');
        }
    }
```

## License

[MIT](LICENSE)
