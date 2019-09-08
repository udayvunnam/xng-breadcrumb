# XngBreadcrumb

[![CircleCI](https://circleci.com/gh/udayvunnam/xng-breadcrumb.svg?shield&circle-token=:circle-token)](https://circleci.com/gh/udayvunnam/xng-breadcrumb) [![npm](https://img.shields.io/npm/v/xng-breadcrumb.svg)](https://www.npmjs.com/package/xng-breadcrumb) [![npm License](https://img.shields.io/npm/l/xng-breadcrumb.svg)](https://github.com/udayvunnam/xng-breadcrumb/blob/master/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9349b719-39ff-4c7a-bc5a-e8bec8e0f2e1/deploy-status)](https://app.netlify.com/sites/xng-breadcrumb/deploys)

> A lightweight, declarative and configurable breadcrumbs for Angular 6 and beyond https://www.npmjs.com/package/xng-breadcrumb

## About

In applications with deep navigation hierarchy, it is essential to have breadcrumb navigation. Breadcrumbs provides links back to each previous page that the user navigated through and shows the current location in an application.

Breadcrumbs are useful when the app has more than two levels of hierarchy. User can easily navigate back to any level.

## Demo

[Live Demo](https://xng-breadcrumb.netlify.com) - An Angular App showing `xng-breadcrumb` usage. It covers all available options.

![](https://user-images.githubusercontent.com/20707504/60205896-0211f080-9870-11e9-9b14-9a3382945c64.gif)

## Features

- ✅ **Quickstart with default mapping**: Just by adding `<breadcrumb></breadcrumb>` show breadcrumbs anywhere in the App. Breadcrumbs defaults to route segments even without any configuration.
- ✅ **Declarative mapping**: Map breadcrumb label for each route, while declaring App routes. Supports every variety of Angular route declaration.
- ✅ **Dynamic mapping**: Resolve a breadcrumb label dynamically, by using BreadcrumbService.
- ✅ **Skip Breadcrumb**: Skip specific routes from displaying in breadcrumbs, conditionally.
- ✅ **Schematics**: Use schematics to add and update the library with `ng add xng-breadcrumb` and `ng update xng-breadcrumb`

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

3. Add Breadcrumb selector, wherever you plan to show breadcrumbs

```html
<xng-breadcrumb></xng-breadcrumb>
```

### Alternative: Angular Devkit 6+

If you are using Angular CLI 6+, just use `ng add` command to update your Angular project with all the above steps.

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
// It takes the static path as well as the path with params
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

**Declaration with children and parent relationship**
breadcrumb data can be decalred either on parent or on child with empty path. The latter takes precedence.

- With component children

```javascript
// declaring breadcrumb data on component parent
  {
    path: ':userId',
    data: { breadcrumb: 'My User declared on parent' },
    children: [
      { path: '', component: ShowUserComponent }
    ]
  }
// declaring breadcrumb data on component child with empty
  {
    path: ':userId',
    children: [
      { path: '', component: ShowUserComponent, data: { breadcrumb: 'My User declared on empty child' }
    ]
  }
```

- With Module children

```javascript
// declaring breadcrumb data on module
  { path: 'home', loadChildren: './home/home.module#HomeModule', data: { breadcrumb: 'Dashboard' } }

// declaring breadcrumb data on module child with empty
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: '', pathMatch: 'full', component: HomeComponent, data: { breadcrumb: 'Dashboard' } }

```

## Customization

**Custom separator**
Breadcrumb by default uses '/' as the separator. To use custom seperator pass it as input to the component like below.

```html
<xng-breadcrumb separator=">"></xng-breadcrumb>
```

**Disabling default mapping of route to breadcrumb label**
To avoid breadcrumb labels showing by default even for routes that don't have breadcrumb configuration set `defaultMapping=false`.

```html
<xng-breadcrumb separator=">"></xng-breadcrumb>
```

**Styling breadcrumbs**
The library uses the least specific selectors possible in order to make it easy to override them.
you can override by changing the CSS for classes `.breadcrumb, .current-path, .separator etc` with ::ng-deep

```css
::ng-deep .breadcrumb {
  background-color: bisque;
  border: 1px solid;
}
```

## API

| configuration                            | Usage                                                               |
| ---------------------------------------- | ------------------------------------------------------------------- |
| Declarative label - `breadcrumb`         | `data: {breadcrumb: 'breadcrumbLabel'}`                             |
| Declarative alias - `breadcrumbAlias`    | `data: {breadcrumbAlias: 'aliasName'}`                              |
| Declarative skip - `skipBreadcrumb`      | `data: {skipBreadcrumb: true/false }`                               |
| Dynamic label by route path - `set()`    | `breadcrumbService.set('routePath', 'breadcrumbLabel')`             |
| Dynamic skip by route path - `skip()`    | `breadcrumbService.skip('routePath', true/false(optional))`         |
| Dynamic label by alias - `setForAlias()` | `breadcrumbService.setForAlias('aliasName', 'breadcrumbLabel')`     |
| Dynamic skip by alias - `skipForAlias()` | `breadcrumbService.skipForAlias('aliasName', true/false(optional))` |

That's it! You are now ready to use breadcrumbs in your App! 🎉

## Local Development

If you wish to contribute to this repository, below are the steps for local development.

- Clone the repository `git clone https://github.com/udayvunnam/xng-breadcrumb.git`
- Run `npm install` to install the dependencies
- Run `npm start` to build and watch both the library and demo app. This opens the app at `http://localhost:4200/` automatically.

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

## Motivation 🎉🎉🎉

_**You can create your own library with complete automated setup for build, tests and release. You can check this guide of best practices and implementation details in this [blog post](https://dev.to/udayvunnam/be-the-thanos-of-your-angular-library-11oe)**_
