# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.1.5](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.1.4...v3.1.5) (2019-09-21)

### [3.1.4](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.1.3...v3.1.4) (2019-09-21)

### [3.1.3](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.1.2...v3.1.3) (2019-09-21)

### [3.1.2](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.1.1...v3.1.2) (2019-09-21)

### [3.1.1](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.1.0...v3.1.1) (2019-09-21)

### Bug Fixes

- npm audit fix ([ca532df](https://github.com/udayvunnam/xng-breadcrumb/commit/ca532df))

### Features

- additional demo apps to be under demo branch ([2829b44](https://github.com/udayvunnam/xng-breadcrumb/commit/2829b44))

<a name="2.0.0"></a>

# [2.0.0](https://github.com/udayvunnam/xng-breadcrumb/releases/tag/v2.0.0)

- **Base route Breadcrumb** -
  Added the ability to add breadcrumb for a base route such as 'Home'. [close #6](https://github.com/udayvunnam/xng-breadcrumb/issues/6)

```
 { path: '', pathMatch: 'full',  data: { breadcrumb: 'Home' } },
```

- **Custom separator** -
  Breadcrumb by default uses '/' as the separator. To use custom separator pass it as input to the component like below. [closes #5](https://github.com/udayvunnam/xng-breadcrumb/issues/5)

```html
<xng-breadcrumb seperator=">"></xng-breadcrumb>
```

- **Styling breadcrumbs:** -
  The library uses the least specific selectors possible in order to make it easy to override them.
  you can override by changing the CSS for classes. `.breadcrumb, .current-path, .separator etc` with `::ng-deep`. [closes #5](https://github.com/udayvunnam/xng-breadcrumb/issues/5)

```css
::ng-deep .breadcrumb {
  background-color: bisque;
  border: 1px solid;
}
```

- **Optional - default mapping of the route to breadcrumb label**
  To avoid breadcrumb labels showing by default even for routes that don't have breadcrumb configuration, set `defaultMapping=false` as input. [closes #2](https://github.com/udayvunnam/xng-breadcrumb/issues/2)

```html
<xng-breadcrumb [defaultMapping]="false"></xng-breadcrumb>
```

<a name="1.0.0"></a>

# [1.0.0](https://github.com/udayvunnam/xng-breadcrumb/releases/tag/v1.0.0)

- **Quickstart with default mapping**: Just by adding `<breadcrumb></breadcrumb>` show breadcrumbs anywhere in the App. Breadcrumbs defaults to route segments even without any configuration.
- **Declarative mapping**: Map breadcrumb label for each route, while declaring App routes.
- **Dynamic mapping**: Resolve a breadcrumb label dynamically, by using BreadcrumbService.
- **Skip Breadcrumb**: Skip specific routes from displaying in breadcrumbs, conditionally.
