# xng-breadcrumb

[![npm](https://img.shields.io/npm/v/xng-breadcrumb.svg)](https://www.npmjs.com/package/xng-breadcrumb)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/xng-breadcrumb)
![npm](https://img.shields.io/npm/dt/xng-breadcrumb)
[![npm License](https://img.shields.io/npm/l/xng-breadcrumb.svg)](https://github.com/udayvunnam/xng-breadcrumb/blob/master/LICENSE)

[![CircleCI](https://circleci.com/gh/udayvunnam/xng-breadcrumb.svg?shield&circle-token=:circle-token)](https://circleci.com/gh/udayvunnam/xng-breadcrumb)
![Twitter Follow](https://img.shields.io/twitter/follow/udayvunnam_?style=social)

> A lightweight, declarative and configurable breadcrumbs solution for Angular 6 and beyond. https://www.npmjs.com/package/xng-breadcrumb

## About

In applications with deep navigation hierarchy, it is essential to have breadcrumb navigation. Breadcrumbs provides links back to each of the previous pages that the user navigated through and shows the current location in an application.

Breadcrumbs are useful when the App has more than two levels of hierarchy. User can easily navigate back to any level.

## Demo

[Live Demo](https://xng-breadcrumb.netlify.com) - A demo app showcasing `xng-breadcrumb` library usage in Angular applications. Navigate through App to see the breadcrumb behaviour. Every route has a mapping code block that shows how breadcrumb is configured.

![](https://user-images.githubusercontent.com/20707504/65815404-9e031d80-e20c-11e9-9052-0a195da6c244.gif)

## Features

- ✅ **Quickstart with default mapping**: Just add `<xng-breadcrumb></xng-breadcrumb>` anywhere in the App. Breadcrumbs defaults to route segments even without any configuration.
- ✅ **Declarative mapping**: Each route can have an associated breadcrumb. You can define this while declaring App routes. Supports every variety of Angular route declaration.
- ✅ **Dynamic mapping**: Change breadcrumbs dynamically using `BreadcrumbService`. You can either use _route path_ or _breadcrumbAlias_ to access a path.
- ✅ **Skip Breadcrumb**: Skip specific routes from displaying in breadcrumbs, conditionally.
- ✅ **Schematics**: Use schematics to add and update the library with `ng add xng-breadcrumb` and `ng update xng-breadcrumb`

### Angular Version Compatiblity

| xng-breadcrumb | Angular  |
| -------------- | -------- |
| 2.x.x          | 6.x, 7.x |
| 3.x.x          | 8.x, 9.x |

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

4. (Optional) Use BreadcrumbService, if you want to alter breadcrumbs behaviour(visibility, label) dynamically.

```javascript
import { BreadcrumbService } from 'xng-breadcrumb';

constructor(private breadcrumbService: BreadcrumbService) {}
// Code examples with BreadcrumbService are given below, under Usage section
```

Note: XngBreadcrumb has a peer dependency on `@angular/router`. Include `RouterModule` in App imports, if you haven't already.

<!-- ### Alternative: Angular Devkit 6+

If you are using Angular CLI 6+, just use `ng add` command to update your Angular project with all the above steps.

```
ng add xng-breadcrumb
``` -->

## Usage

**Define breadcrumb while declaring routes**

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

**Define breadcrumb dynamically, by routepath**

```javascript
// Set a breadcrumb dynamically using `BreadcrumbService.set(routepath)`
// routepath can contain path and params similary how you defined in routes
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
breadcrumbService.set('mentor', 'Enabler'); // path for MentorDetailsComponent
breadcrumbService.set('mentor/:id', 'Uday Vunnam'); // path for MentorEditComponent contains param (:id)
```

**Define breadcrumb dynamically, by breadcrumbAlias**

```javascript
// declare `breadcrumbAlias` while defining routes, in order to access it later.
// Set a breadcrumb dynamically using `BreadcrumbService.setForAlias(breadcrumbAlias)`
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

**Hide a specific route from displaying in breadcrumbs**

```javascript
// Hide a route from displaying in Breadcrumbs using `skipBreadcrumb` - declarative
{
    path: 'edit',
    component: MentorEditComponent,
    data: { skipBreadcrumb: true }
}
// Hide a route from displaying in Breadcrumbs using breadcrumbService.hide() or breadcrumbService.hideForAlias() - dynamic
breadcrumbService.skip('mentor/:id/edit');
breadcrumbService.skipForAlias('breadcrumbAlias');

// Pass the second parameter as `false` to make a hidden breadcrumb visible.
breadcrumbService.skip('mentor/:id/edit', false);
breadcrumbService.skipForAlias('breadcrumbAlias', false);
```

**Define either on Children or Parent**

You can define breadcrumbs either on _parent_ or _child with empty path_. If both are defined, the latter takes the precedence.

- With Component - Children

```javascript
// defining breadcrumb on Component Route
  {
    path: ':userId',
    data: { breadcrumb: 'My User declared on parent' },
    children: [
      { path: '', component: ShowUserComponent }
    ]
  }
// defining breadcrumb on children with empty path
  {
    path: ':userId',
    children: [
      { path: '', component: ShowUserComponent, data: { breadcrumb: 'My User declared on empty child' }
    ]
  }
```

- With Module - Children

```javascript
// defining breadcrumb on Module route
  { path: 'home', loadChildren: './home/home.module#HomeModule', data: { breadcrumb: 'Dashboard' } }

// defining breadcrumb on Module children with empty path
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
// Within HomeModule Routes -
  { path: '', pathMatch: 'full', component: HomeComponent, data: { breadcrumb: 'Dashboard' } }

```

## Customization

**Custom separator**
Breadcrumb by default uses '/' as the separator. To use custom seperator pass it as input to the component like below.

```html
<xng-breadcrumb separator=">"></xng-breadcrumb>
```

**Disabling default mapping of route to breadcrumb label**
To avoid breadcrumb labels showing by default even for routes that don't specify breadcrumbs, set `[defaultMapping]=false`.

```html
<xng-breadcrumb [defaultMapping]="false"></xng-breadcrumb>
```

**Styling breadcrumbs**
`<xng-breadcrumb>` defines the least possible specificity for selectors, in order to make it easy to override them.
you can override styles by changing the CSS for classes such as `.breadcrumb`, `.current-path`, `.separator` etc with `::ng-deep`

```css
::ng-deep .breadcrumb {
  background-color: bisque;
  border: 1px solid;
}

::ng-deep .seperator {
  font-size: 2em;
}
```

## API

| configuration                            | Usage                                                               |
| ---------------------------------------- | ------------------------------------------------------------------- |
| Declarative label - `breadcrumb`         | `data: {breadcrumb: 'breadcrumbLabel'}`                             |
| Declarative alias - `breadcrumbAlias`    | `data: {breadcrumbAlias: 'aliasName'}`                              |
| Declarative skip - `skipBreadcrumb`      | `data: {[skipBreadcrumb]: true/false }`                             |
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
