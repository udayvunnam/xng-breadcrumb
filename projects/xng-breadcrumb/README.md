# XngBreadcrumb

[![CircleCI](https://circleci.com/gh/udayvunnam/xng-breadcrumb.svg?style=svg)](https://circleci.com/gh/udayvunnam/xng-breadcrumb) [![npm](https://img.shields.io/npm/v/xng-breadcrumb.svg)](https://www.npmjs.com/package/xng-breadcrumb) [![npm License](https://img.shields.io/npm/l/xng-breadcrumb.svg)](https://github.com/udayvunnam/xng-breadcrumb/blob/master/LICENSE)

A lightweight, configurable and reactive breadcrumb for Angular 6 and beyond https://www.npmjs.com/package/xng-breadcrumb

## About

A breadcrumb consists of a list of links to the parent pages of the current page in hierarchical order. It helps users find their place within a website or web application.

Useful when the app has more than two levels of hierarchy. User can easily navigate back to any level.

## Demo

[Live Demo](https://xng-breadcrumb.netlify.com) - TechUnroll, A knowledge sharing mentor - mentee app.

## Features

- Route mapping to breadcrumb by default, if no configuration is specified.
- Declarative mapping: specify breacrumb name for a route while configuring App routing.
- Dynamic mapping: Resolve route param to a name from server response or by other means.
- Skip specific routes from displaying in breadcrumb
- Quickly setup library in your app with `ng add xng-breadcrumb`
- Auto update library version with `ng update xng-breadcrumb`

## Local Development

If you wish to contribute or fork, below are the steps for local development.

- Clone the repository `git clone https://github.com/udayvunnam/xng-breadcrumb.git`
- Run `npm install` to install the dependencies
- Run `npm start`. This command builds and watches both library and its demo app. Automatically opens app at `http://localhost:4200/`.
- The app will automatically reload if you change any of the source files.

## Accessibility

- `<nav>` with `aria-label="breadcrumb"` identifies type of navigation as breadcrumb by screen readers.
- `<li>` element representing current page is given `aria-current=page` and class `active`.

## Build

Run `npm run build` to build the library and demo app together. The build artifacts will be stored in the `dist/` directory.

This step is used by CircleCI to build both library and demo app. After succesful build, library is pushed to npm and demo app is deployed to Netlify.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
