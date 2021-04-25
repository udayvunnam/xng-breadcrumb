<h1 align="center" style="color: teal">xng-breadcrumb</h1>

<div align="center">

> A lightweight, declarative and configurable breadcrumbs solution for Angular 6 and beyond. <https://www.npmjs.com/package/xng-breadcrumb>

[![npm version](https://img.shields.io/npm/v/xng-breadcrumb.svg)](https://www.npmjs.com/package/xng-breadcrumb)
![bundle size](https://img.shields.io/bundlephobia/minzip/xng-breadcrumb)
[![license](https://img.shields.io/npm/l/xng-breadcrumb.svg)](https://github.com/udayvunnam/xng-breadcrumb/blob/main/LICENSE)
![npm downloads](https://img.shields.io/npm/dt/xng-breadcrumb?style=social)

[![CircleCI](https://circleci.com/gh/udayvunnam/xng-breadcrumb.svg?shield&circle-token=:circle-token)](https://circleci.com/gh/udayvunnam/xng-breadcrumb)
![Twitter follow](https://img.shields.io/twitter/follow/udayvunnam_?style=social)

</div>

## About

- In applications with deep navigation hierarchy, it is essential to have breadcrumbs.
- Breadcrumbs easily allow going back to states higher up in the hierarchy.

## Demo

[Live Demo](https://xng-breadcrumb.netlify.com) - A demo app showcasing `xng-breadcrumb` usage in an Angular app. Navigate through different links to see breadcrumbs behavior.

<p align="center">
  <a href="https://xng-breadcrumb.netlify.com/dashboard" rel="noopener" target="_blank" ><img width="500" src="https://user-images.githubusercontent.com/20707504/68575589-61287880-0492-11ea-9084-80587321c5c4.png" alt="xng-breadcrumb usage"></a></p>
</p>

## Features

- ✅ **Zero configuration**: Just add `<xng-breadcrumb></xng-breadcrumb>` anywhere in the app. Breadcrumb labels will be **auto-generated** by analyzing Angular Route configuration in your App.

- ✅ **Custom labels**: each route can have a custom label defined via Angular Route Config. The labels will be picked automatically while forming breadcrumbs

- ✅ **Update labels dynamically**: Change breadcrumbs dynamically using `BreadcrumbService.set()`. You can either use _route path_ or _breadcrumb alias_ to change breadcrumb for a route.

- ✅ **Skip breadcrumb**: Skip specific routes from displaying in breadcrumbs, conditionally.

- ✅ **Disable breadcrumb**: Disable specific routes so that navigation is disbaled to intermediate routes.

- ✅ **Customization**: Customize breadcrumb template to show **icons as label prefix**, **use pipes on text**, **add i18n**, etc.

- ✅ **Styling**: **Separator** and **Styles** can be customized with ease.

- ✅ **QueryParams and Fragment**: Preserves QueryParams and Fragemnet while navigating via breadcrumbs

## Quickstart

1. Install via npm or yarn

```javascript
npm install --save xng-breadcrumb
//------------- OR --------------
yarn add xng-breadcrumb
```

2. Import 'BreadcrumbModule' in your Application

```javascript
import {BreadcrumbModule} from 'xng-breadcrumb';
@NgModule({
  ...
  imports: [BreadcrumbModule],
  ...
})
export class AppModule { }
```

3. Add 'xng-breadcrumb' selector, wherever you plan to show breadcrumbs

```html
<xng-breadcrumb></xng-breadcrumb>
```

4. (Optional) Use BreadcrumbService, if you want to change breadcrumbs behavior(visibility, label, etc) dynamically.

```javascript
import { BreadcrumbService } from 'xng-breadcrumb';

constructor(private breadcrumbService: BreadcrumbService) {}
// Code examples with BreadcrumbService are given below, under Usage section
```

🎉🎉 That's it. You should see auto-generated breadcrumbs appearing for each route.

Note: XngBreadcrumb has a peer dependency on `@angular/router`. Include `RouterModule` in App imports, if you haven't already.

## Setup Guide

### Provide breadcrumb labels via In App Route Config

- define 'breadcrumb' within the data property of route.
- a 'breadcrumb' can be defined as a **string** OR **object** OR **function**.
- Use **breadcrumb as a string** if you are just providing breadcrumb text
- Use **breadcrumb as an object** if you are providing additional properties like 'alias', 'skip', 'info', 'disable'. In you define breadcrumb as an object, **label** property denotes breadcrumb text.
- Use **breadcrumb as a function** if you want to alter the auto-generated label as needed.

#### breadcrumb as a string

```javascript
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'add',
    component: MentorAddComponent,
    data: { breadcrumb: 'New' }
  }
```

#### breadcrumb as an object

```javascript
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    data: {
      breadcrumb: {
        label: 'Home',
        info: { myData: { icon: 'home', iconType: 'material' } }
      }
    }
  },
  {
    path: 'add',
    component: MentorAddComponent,
    data: { breadcrumb: { skip: true, alias: 'mentorAdd' } }
  }
```

#### breadcrumb as a function

```javascript
{
  path: '/orders',
  children: [{
    ':id',
    data: {
      breadcrumb: (resolvedId: string) => `Viewing ${resolvedId} now`
    }
  }]
}
```

### Update breadcrumb label dynamically

- Breadcrumb label can be updated dynamically using _route path_ or _alias_
- For simple routes, _route path_ is enough. Ex: `breadcrumbService.set(<route path> , <breadcrumb label>)`
- For long deep routes, you can use _alias_ instead.
- Create an _alias_ for a route in route config. Prefix alias with '@' while using the set() method. Ex: `breadcrumbService.set(@<alias> , <breadcrumb label>)`

#### using route path to update labels dynamically

```javascript
  {
    path: 'mentors',
    component: MentorListComponent,
    children: [
      {
        path: ':id',
        component: MentorDetailsComponent
      }
    ]
  }

  // routepath can contain path params similar to how you define in routes
  breadcrumbService.set('mentors', 'Mentor View'); // path for MentorListComponent
  breadcrumbService.set('mentor/:id', 'Uday Vunnam'); // path for MentorDetailsComponent contains param (:id)
```

#### using alias to update labels dynamically

```javascript
  {
    path: 'mentors',
    component: MentorListComponent,
    children: [
      {
        path: ':id',
          component: MentorDetailsComponent
          data: {
            breadcrumb: {
              alias: 'mentorName'
            }
          }
        }
    ]
  }

  breadcrumbService.set('@mentorName', 'Uday Vunnam');
```

### [Advanced Patterns](./docs/advanced-patterns.md)

If you looking for customizing breadcrumb in different ways, [refer to this guide](./docs/advanced-patterns.md)

### [API](./docs/api.md)

Detailed [API](./docs/api.md) for Breadcrumb Component and Breadcrumb Service

### [Accessibility](./docs/accessibility.md)

Accessibility is the firstclass concern for this library and is [implemented with best practices](./docs/accessibility.md)

### [Angular version compatibility](./docs/version-compatibility.md)

xng-breadcrumb works will all versions of Angular. [See the compatibility guide](./docs/version-compatibility.md)

### [Local Development Guide](./docs/local-development-guide.md)

If you wish to contribute to this library, refer to the [local development guide](./docs/local-development-guide.md)

## ❤️ [Become a Sponsor!](http://paypal.me/udayvunnam)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/udayvunnam/"><img src="https://avatars.githubusercontent.com/u/20707504?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Uday Vunnam</b></sub></a><br /><a href="https://github.com/udayvunnam/xng-breadcrumb/commits?author=udayvunnam" title="Code">💻</a> <a href="https://github.com/udayvunnam/xng-breadcrumb/commits?author=udayvunnam" title="Documentation">📖</a> <a href="#maintenance-udayvunnam" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/anthonythiry"><img src="https://avatars.githubusercontent.com/u/28025542?v=4?s=100" width="100px;" alt=""/><br /><sub><b>anthonythiry</b></sub></a><br /><a href="https://github.com/udayvunnam/xng-breadcrumb/commits?author=anthonythiry" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dedrazer"><img src="https://avatars.githubusercontent.com/u/23525418?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dedrazer</b></sub></a><br /><a href="https://github.com/udayvunnam/xng-breadcrumb/commits?author=dedrazer" title="Code">💻</a></td>
    <td align="center"><a href="https://dannyfeliz.com/"><img src="https://avatars.githubusercontent.com/u/5460365?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Danny Feliz</b></sub></a><br /><a href="https://github.com/udayvunnam/xng-breadcrumb/commits?author=DannyFeliz" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
