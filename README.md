# XngBreadcrumb

[![CircleCI](https://circleci.com/gh/udayvunnam/xng-breadcrumb.svg?shield&circle-token=:circle-token)](https://circleci.com/gh/udayvunnam/xng-breadcrumb) [![npm](https://img.shields.io/npm/v/xng-breadcrumb.svg)](https://www.npmjs.com/package/xng-breadcrumb) [![npm License](https://img.shields.io/npm/l/xng-breadcrumb.svg)](https://github.com/udayvunnam/xng-breadcrumb/blob/master/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9349b719-39ff-4c7a-bc5a-e8bec8e0f2e1/deploy-status)](https://app.netlify.com/sites/xng-breadcrumb/deploys)

> A lightweight, configurable and reactive breadcrumb for Angular 6 and beyond https://www.npmjs.com/package/xng-breadcrumb

## About

In applications with deep navigation hierarchy, it is essential to have breadcrumb navigation. Breadcrumbs provides links back to each previous page that the user navigated through and shows the current location in an application.

Breadcrumbs are useful when the app has more than two levels of hierarchy. User can easily navigate back to any level.

## Demo

[Live Demo](https://xng-breadcrumb.netlify.com) - _TechUnroll_ An imaginary mentor - mentee app, that demonstrates `xng-breadcrumb` usage.

![](https://user-images.githubusercontent.com/20707504/60205896-0211f080-9870-11e9-9b14-9a3382945c64.gif)

## Features

- **Quick start**: Show breadcrumbs just by adding `<breadcrumb></breadcrumb>` anywhere in the App.
- **Default mapping**: Breadcrumb to route mapping by default, if no configuration is defined.
- **Declarative mapping**: Specify breadcrumbs for each route while declaring App routes.
- **Dynamic mapping**: Resolve a route label from server response using BreadcrumbService.
- **Skip Breadcrumb**: Skip specific routes from displaying in breadcrumbs.
- **Schematics**: Use schematics to add and update the library with `ng add xng-breadcrumb` and `ng update xng-breadcrumb`

## Getting Started

1. Install xng-breadcrumb via npm or yarn

```javascript
npm install --save xng-breadcrumb
//------------- OR --------------
yarn add xng-breadcrumb
```

2. Import BreadcrumbModule in your Application

```javascript
import {BreadcrumbModule} from 'xng-breadcrumb';
@NgModule({
  ...
  imports: [BreadcrumbModule],
  ...
})
export class AppModule { }
```

3. Add Breadcrumb selector, whereever you plan to show breadcrumbs

```html
<xng-breadcrumb></xng-breadcrumb>
```

### Alternative: Angular Devkit 6+

If you are using Angular CLI 6+, just use `ng add` command to update your Angular project with all above steps.

```
ng add xng-breadcrumb
```

## Usage

**Adding breadcrumb label while declaring routes**

```javascript
{
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    data: { breadcrumb: 'Home'}
}
{
    path: 'add',
    component: MentorAddComponent,
    data: { breadcrumb: 'New'}
}
```

**Setting breadcrumb label dynamically by route path**

```javascript
// Add a label dynamically using 'set()' from BreadcrumbService
// It takes static path as well as path with params
{
    path: 'mentor',
    component: MentorDetailsComponent,
    children: [
        {
            path: ':id',
            component: MentorEditComponent
        }
    ]

}
breadcrumbService.set('mentor', 'Enabler'); // static path
breadcrumbService.set('mentor/:id', 'Uday Vunnam'); // path with params
```

**Setting breadcrumb label dynamically by breadcrumbAlias**

```javascript
// Add a label dynamically using 'setForAlias()' from BreadcrumbService
{
    path: 'mentor',
    component: MentorDetailsComponent,
    children: [
        {
            path: ':id',
            component: MentorEditComponent
            data: {
                breadcrumbAlias: 'mentorName'
            }
        }
    ]

}
breadcrumbService.setForAlias('mentorName', 'Uday Vunnam');
```

**Hiding a specific route from displaying in breadcrumbs**

```javascript
// Hide a route from displaying in Breadcrumbs using skipBreadcrumb or hide() or hideForAlias()
{
    path: 'edit',
    component: MentorEditComponent,
    data: { skipBreadcrumb: true }
}
breadcrumbService.skip('mentor/:id/edit');
breadcrumbService.skipForAlias('breadcrumbAlias');

// An optional second parameter can be passed as false to make a hidden breadcrumb visible
breadcrumbService.skip('mentor/:id/edit', false);
breadcrumbService.skipForAlias('breadcrumbAlias', false);
```

## Available configurations

| configuration                            | Usage                                                                |
| ---------------------------------------- | -------------------------------------------------------------------- |
| Declarative label - `breadcrumb`         | `data: {breadcrumb: 'breadcrumbLabel'}`                              |
| Declarative alias - `breadcrumbAlias`    | `data: {breadcrumbAlias: 'aliasName'}`                               |
| Declarative skip - `skipBreadcrumb`      | `data: {skipBreadcrumb: true | false }`                              |
| Dynamic label by route path - `set()`    | `breadcrumbService.set('routePath', 'breadcrumbLabel')`              |
| Dynamic skip by route path - `skip()`    | `breadcrumbService.skip('routePath', true| false(optional))`         |
| Dynamic label by alias - `setForAlias()` | `breadcrumbService.setForAlias('aliasName', 'breadcrumbLabel')`      |
| Dynamic skip by alias - `skipForAlias()` | `breadcrumbService.skipForAlias('aliasName', true| false(optional))` |

## Local Development

If you wish to contribute to this repository, below are the steps for local development.

- Clone the repository `git clone https://github.com/udayvunnam/xng-breadcrumb.git`
- Run `npm install` to install the dependencies
- Run `npm start` to build and watch both library and demo app. This opens app at `http://localhost:4200/` automatically.

## Build

Run `npm run build` to build the library and demo app together. The build artifacts will be stored in the `dist/` directory.

This step is used by CircleCI to build both library and demo app. After a succesful build, a new semantic version of library is published to npm and demo app is deployed to Netlify.

## Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Accessibility

- A `<nav>` with `aria-label="breadcrumb"` identifies type of navigation as breadcrumb by screen readers.
- The breadcrumb links are structured using an ordered list `<ol>`.
- The last `<li>` element represents current page, so it doesn't have to be clickable.
- Use `aria-current=page` and `class=active` for last `<li>` element.
- Separators between links have `aria-hidden=true`. This prevents the screen reader announcement of visual separators.

## Motivation

_**If you plan to create Angular library see this [guide on planning, setup and release of Angular library](https://medium.com/@udayvunnam/https-medium-com-udayvunnam-be-the-thanos-of-your-angular-library-320f93ddc9ec)**_
