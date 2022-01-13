# ngx-page-scroll [![npm version](https://img.shields.io/npm/v/ngx-page-scroll.svg?style=flat)](https://www.npmjs.com/package/ngx-page-scroll) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Animated scrolling functionality for angular written in pure typescript with no additional dependencies

[![Build Status](https://github.com/Nolanus/ngx-page-scroll/actions/workflows/main.yml/badge.svg)](https://github.com/Nolanus/ngx-page-scroll/actions/workflows/main.yml)
[![Dependencies Status](https://david-dm.org/Nolanus/ngx-page-scroll.svg?path=projects/ngx-page-scroll)](https://david-dm.org/Nolanus/ngx-page-scroll?path=projects/ngx-page-scroll)
[![devDependencies Status](https://david-dm.org/Nolanus/ngx-page-scroll/dev-status.svg?path=projects/ngx-page-scroll)](https://david-dm.org/Nolanus/ngx-page-scroll?path=projects/ngx-page-scroll&type=dev)
[![peerDependencies Status](https://david-dm.org/Nolanus/ngx-page-scroll/peer-status.svg?path=projects/ngx-page-scroll)](https://david-dm.org/Nolanus/ngx-page-scroll?path=projects/ngx-page-scroll&type=peer)
[![Known Vulnerabilities](https://snyk.io/test/github/Nolanus/ngx-page-scroll/badge.svg)](https://snyk.io/test/github/Nolanus/ngx-page-scroll)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/aa10be6ea5654211bb451c6ade2f1ff6)](https://www.codacy.com/gh/Nolanus/ngx-page-scroll/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Nolanus/ngx-page-scroll&amp;utm_campaign=Badge_Grade)

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

- [ngx-page-scroll ![npm version](https://www.npmjs.com/package/ngx-page-scroll) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)](#ngx-page-scroll--)
  - [Features](#features)
  - [Table of contents](#table-of-contents)
    - [Version compatibility](#version-compatibility)
  - [Service](#service)
    - [Setup](#setup)
    - [Usage](#usage)
    - [Configuration](#configuration)
  - [Directive](#directive)
    - [Setup](#setup-1)
    - [Usage](#usage-1)
    - [Directive API](#directive-api)
      - [PageScroll properties](#pagescroll-properties)
      - [PageScroll events](#pagescroll-events)
      - [Example](#example)
  - [FAQ and common problems](#faq-and-common-problems)
  - [License](#license)


### Version compatibility

Install later versions in case your app is not running the very latest angular version.

| ngx-page-scroll/ngx-page-scroll-core version | compatible angular version | Documentation                                                              |
| -------------------------------------------- | -------------------------- | -------------------------------------------------------------------------- |
| v8.x                                         | v13      | [README](README.md)                                                        |
| v7.x                                         | v12, v11, v10, v9, v8      | [README](README.md)                                                        |
| v6.x                                         | v8, v7                     | [README](https://github.com/Nolanus/ngx-page-scroll/blob/v6.0.2/README.md) |
| v5.x                                         | v6                         | [README](https://github.com/Nolanus/ngx-page-scroll/blob/v5.0.1/README.md) |
| v4.x                                         | v5, v4                     | [README](https://github.com/Nolanus/ngx-page-scroll/blob/v4.0.2/README.md) |

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
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
| `pageScrollInView`        | boolean     | true         | Whether the scroll animation should happen even when the scroll target is already inside the view port (`true`). Set to `false` to skip scroll animation if target is already in view.
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

## FAQ and common problems

Please have a look at the wiki section of the GitHub repo at [https://github.com/Nolanus/ngx-page-scroll/wiki/FAQ](https://github.com/Nolanus/ngx-page-scroll/wiki/FAQ) for frequent questions and problems.

## License

[MIT](LICENSE)
