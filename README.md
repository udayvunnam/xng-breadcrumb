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

### Angular Version Compatibility

| xng-breadcrumb | Angular        |
| -------------- | -------------- |
| 4.x.x          | 6.x, 7.x       |
| 6.x.x          | 8.x, 9.x, 10.x |

## Setup Guide

### Custom breadcrumb labels via Angular Route Config

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

### Update labels dynamically

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

### Skip Breadcrumbs for certain route path

You can skip a route from displaying in breadcrumbs in two ways

- make **skip: true** in route config `breadcrumb: { skip: true }`
- dynamically skip using `set(<myPathOrAlias>, { skip:true })`;

#### skip breadcrumb in route config

```javascript
  {
    path: 'edit',
    component: MentorEditComponent,
    data: { breadcrumb: { skip: true } }
  }
```

#### skip breadcrumb dynamically

```javascript
breadcrumbService.set('mentor/:id/edit', { skip: true });
breadcrumbService.set('@mentorName', { skip: true }); // using alias '@mentorName'

//To make a hidden breadcrumb visible.
breadcrumbService.set('mentor/:id/edit', { skip: false });
breadcrumbService.set('@mentorName', { skip: false }); // using alias '@mentorName'
```

### Dibsable Breadcrumb navigation for certain routes

You can show an intermediate breadcrumb, but disable navigation if the route has no meaning.

- make **disable: true** in route config `breadcrumb: { disable: true }`
- dynamically skip using `set(<myPathOrAlias>, { disable:true })`;

## Customization

### Custom Breadcrumb template (add icons, change text, add i18n ability, etc)

You can display whatever you want in the place of breadcrumb text by providing a custom template.

- Use _\*xngBreadcrumbItem_ directive to provide a custom template
- breadcrumb label is available implicitly in the template context

#### Change text case

```javascript
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      breadcrumb: 'app home'
    }
  }
```

```html
<xng-breadcrumb>
  <ng-container *xngBreadcrumbItem="let breadcrumb">
    <ng-container>{{ breadcrumb | titlecase }}</ng-container>
  </ng-container>
</xng-breadcrumb>
```

#### Add icons in front of label

- define 'info' associated with breadcrumb in route config. 'info' has type <any>. you can pass string or object as you need.
- 'info' is available in the context of _\*xngBreadcrumbItem_.
- Additionally 'first', 'last', 'index' and count are passed to identify the respective items.

```javascript
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      breadcrumb: {
        label: 'app home',
        info: 'home'
      }
    }
  }
```

```html
<xng-breadcrumb>
  <ng-container
    *xngBreadcrumbItem="let breadcrumb; let info = info; let first = first"
  >
    <mat-icon *ngIf="info">{{ info }}</mat-icon>
    <ng-container *ngIf="!first">{{ breadcrumb }}</ng-container>
  </ng-container>
</xng-breadcrumb>
```

#### Internationalization - i18n

- Usually, internationalization is achieved in Angular using libraries like ngx-translate or transloco.
- These libraries provide a pipe to change text while language is changed.
- For example, if you are using ngx-translate you can change the language for breadcrumb text as shown below.

```html
<xng-breadcrumb>
  <ng-container *xngBreadcrumbItem="let breadcrumb">
    <ng-container>{{ breadcrumb | translate }}</ng-container>
  </ng-container>
</xng-breadcrumb>
```

### Custom separator

- Breadcrumb uses '/' as the separator by default.
- To use custom separator pass **separator** as an input to `<xng-breadcrumb>`.
- You can either use a simple string(>>, -, -->) or a component (mat-icon, fa-icon) as a separator.

#### string as separator

```html
<xng-breadcrumb separator=">"></xng-breadcrumb>
```

#### icon or component as separator

```html
<xng-breadcrumb [separator]="iconTemplate"></xng-breadcrumb>

<ng-template #iconTemplate>
  <mat-icon>arrow_right</mat-icon>
</ng-template>
```

### Custom Breadcrumb Styles

- `<xng-breadcrumb>` defines the least possible specificity for selectors, to make it easy to override them.
- override styles by changing the CSS for corresponding classes. (Keep this styles in app root styles file if you don't want to use ::ng-deep)
- Below is a visualization of various classes involved in xng-breadcrumb to help you for easy identification.
- (Optional) xng-breadcrumb takes 'class' as input. This class will be applied to the root of the breadcrumb. This can be used to increase specificity when there are conflicting styles.

  ![image](https://user-images.githubusercontent.com/20707504/68110000-f61af700-ff11-11e9-8834-bc754a46b39d.png)

```css
.xng-breadcrumb-root {
  padding: 8px 16px;
  display: inline-block;
  border-radius: 4px;
  background-color: #e7f1f1;
}

.xng-breadcrumb-separator {
  padding: 0 4px;
}
```

### Disable Auto Generation of breadcrumb labels

- Breadcrumbs are integrated with Angular Router and labels are auto-generated (if a label is not provided for a route).
- Auto-generated label is the same as route the path segment.
- If you want to disable this behavior, set `[autoGenerate]=false`.

```html
<xng-breadcrumb [autoGenerate]="false"></xng-breadcrumb>
```

### Intercept the routing via breadcrumb navigation - routeInterceptor

When we have conditional routing in App components (Ex: for a certain role navigate to pathA vs pathB from a component), it might be useful to have conditional routing from breadcrumb too

- **With App's RouteConfig:** Provide routeInterceptor callback in RouteConfig if you know the redirection logic upfront

```javascript
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      breadcrumb: {
        label: 'my home',
        info: 'home',
        routeInterceptor: (routeLink, breadcrumb)=> {
          console.log(routeLink);
          return routeLink;
        }
      },
    },
  }
```

- **With Breadcrumb service:** If you want to access Application context within the interceptor, use breadcrumbService that can be called from anywhere in the App

```javascript
const isDesigner = true;
breadcrumbService.set('home', {
  routeInterceptor: (routeLink, breadcrumb) =>
    isDesigner ? '/designer' : routeLink,
});
```

## API

### App Route Config -> data -> breadcrumb

| property              | Description                                                      | Type      | Default     |
| --------------------- | ---------------------------------------------------------------- | --------- | ----------- |
| breadcrumb            | Breadcrumb data provided in App route config                     | `string   | Breadcrumb  | Function` | `undefined` |
| breadcrumb: {alias}   | alias name for a route                                           | `string`  | `undefined` |
| breadcrumb: {skip}    | skip a route from showing in breadcrumbs                         | `boolean` | `false`     |
| breadcrumb: {disable} | disable navigation for a breadcrumb item                         | `boolean` | `false`     |
| breadcrumb: {info}    | arbitrary info for a breadcrumb.                                 | `string   | object`     | `undefined` |
| breadcrumb: {label}   | same as breadcrumb. Use label if breadcrumb is defined as object | `string`  | `undefined` |

### xng-breadcrumb component

| Input               | Description                                               | Type      | Default            |
| ------------------- | --------------------------------------------------------- | --------- | ------------------ |
| separator           | input: separator between breadcrumbs                      | `string   | TemplateRef<void>` | `/` |
| autoGenerate        | input:whether to auto generate breadcrumb labels          | `boolean` | `true`             |
| \*xngBreadcrumbItem | directive: to read context in custom breadcrumb templates | NA        | NA                 |
| preserveQueryParams | preserve query params while navigating via breadcrumbs    | `boolean` | `true`             |
| preserveFragment    | preserve fragment while navigating via breadcrumbs        | `boolean` | `true`             |

### BreadcrumbService.set(pathOrAlias, breadcrumb)

| argument    | Description                                | Type     |
| ----------- | ------------------------------------------ | -------- |
| pathOrAlias | full route path or alias prefixed with '@' | `string` |
| breadcrumb  | breadcrumb data to update for a route      | `string  | Breadcrumb` |

## Where to define breadcrumbs, if Routes path have same Route specificity

- For the same route path, you can define breadcrumbs either on _parent_ or _any descendant with empty path_.
- If both are defined, the children take the precedence.

### With Component and its Children

```javascript
  // defining breadcrumb on Component Route
  {
    path: ':userId',
    data: { breadcrumb: 'Declared on Parent Component' },
    children: [
      { path: '', component: ShowUserComponent }
    ]
  }
  // defining breadcrumb on children with empty path
  {
    path: ':userId',
    children: [
      { path: '', component: ShowUserComponent, data: { breadcrumb: 'Declaraed on child with empty path' }
    ]
  }
```

#### With Module and its Children

```javascript
  // defining breadcrumb on Module route
  { path: 'home', loadChildren: './home/home.module#HomeModule', data: { breadcrumb: 'Declaraed on Parent Module' } }

  // Within HomeModule Routes -
  { path: '', pathMatch: 'full', component: HomeComponent, data: { breadcrumb: 'Declaraed on child with empty path' }}

```

## Accessibility

- A `<nav>` with `aria-label="breadcrumb"` identifies type of navigation as breadcrumb by screen readers.
- The breadcrumb links are structured using an ordered list `<ol>`.
- The last `<li>` element represents the current page, so it doesn't have to be clickable.
- Separators between links have `aria-hidden=true`. This prevents the screen reader announcement of visual separators.

## Local Development

This project was generated using [Nx](https://nx.dev).

If you wish to contribute to this repository, below are the steps for local development.

- Clone the repository `git clone https://github.com/udayvunnam/xng-breadcrumb.git`
- Run `yarn` to install the dependencies
- Run `yarn start` to build and watch both the library and the demo app. This opens the demo app at `http://localhost:4200/` automatically.

## Build

Run `yarn build` to build the library and demo app together. The build artifacts will be stored in the `dist/` directory.

This step is used by CircleCI to build both the library and the demo app.
After a successful build, the two demo apps are deployed to Netlify.

## Publish to npm

Run `yarn release` on main branch if you wish to publish a new version of library to npm

This ingternally uses standard-version to

- bump the library version based on the commits
- generates changelog
- commit bump files and changelog
- create a new tag with the new version number

CircleCI gets notified on every new tag push and publishes the library if build and tests are success

## Tests

- Unit tests: `yarn test` to execute the unit tests via [Jest](https://www.xfive.co/blog/testing-angular-faster-jest/)
- e2e: `yarn e2e` to execute the e2e tests via [Cypress.io](https://docs.cypress.io/guides/overview/why-cypress.html)

## Motivation 🎉🎉🎉

_**You can create your library with complete automated setup for build, tests, and release. Check this blog post for best practices and implementation details of this library [blog post](https://dev.to/udayvunnam/be-the-thanos-of-your-angular-library-11oe)**_

<!-- - ✅ **Schematics**: Use schematics to add and update the library with `ng add xng-breadcrumb` and `ng update xng-breadcrumb` -->

<!-- ### Alternative: Angular Devkit 6+

If you are using Angular CLI 6+, just use `ng add` command to update your Angular project with all the above steps.
![](https://user-images.githubusercontent.com/20707504/65815404-9e031d80-e20c-11e9-9052-0a195da6c244.gif)

```
ng add xng-breadcrumb
``` -->
