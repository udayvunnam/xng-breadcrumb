# XngBreadcrumb

[![CircleCI](https://circleci.com/gh/udayvunnam/xng-breadcrumb.svg?style=svg)](https://circleci.com/gh/udayvunnam/xng-breadcrumb) [![npm](https://img.shields.io/npm/v/xng-breadcrumb.svg)](https://www.npmjs.com/package/xng-breadcrumb) [![npm License](https://img.shields.io/npm/l/xng-breadcrumb.svg)](https://github.com/udayvunnam/xng-breadcrumb/blob/master/LICENSE)

A lightweight, configurable and reactive breadcrumb for Angular 6 and beyond https://www.npmjs.com/package/xng-breadcrumb

## About

A breadcrumb consists of a list of links to the parent pages of the current page in hierarchical order. It helps users find their place within a website or web application.

Useful when the app has more than two levels of hierarchy. User can easily navigate back to any level.

## Demo

[Live Demo](https://xng-breadcrumb.netlify.com) - TechUnroll, A knowledge sharing mentor - mentee app.

## Features

- Quick setup with `ng add`, auto update with `ng update`
- Route mapping by default, without any configuration.
- Declarative as well as Reactive mapping.
- Skip specific routes displaying in breadcrumb
- Late mapping of route from server response or by any other means

## Local Development

- Clone the repository
- Run `npm i` to install the dependencies
- Run `npm start`. This builds and watches both lirary and a demo app, automatically opens app at `http://localhost:4200/`.
- The app will automatically reload if you change any of the source files.

## Accessibility

`<nav>` with `aria-label="breadcrumb"` identifies type of navigation as breadcrumb.
`<li>` representing current page is given `aria-current=page` and class `active`.

## Build

Run `npm run build` to build the library and demo app together. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
