# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.1.10](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.1.9...v3.1.10) (2019-09-21)


### Bug Fixes

* deployment ([4e01dab](https://github.com/udayvunnam/xng-breadcrumb/commit/4e01dab))
* deployment ([5ea2bc6](https://github.com/udayvunnam/xng-breadcrumb/commit/5ea2bc6))

### [3.1.9](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.1.8...v3.1.9) (2019-09-21)

### [3.1.8](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.1.7...v3.1.8) (2019-09-21)

### Bug Fixes

- deployment ([179f623](https://github.com/udayvunnam/xng-breadcrumb/commit/179f623))
- deployment ([4bacc6a](https://github.com/udayvunnam/xng-breadcrumb/commit/4bacc6a))
- deployment ([d8c1e8f](https://github.com/udayvunnam/xng-breadcrumb/commit/d8c1e8f))
- deployment ([3056b11](https://github.com/udayvunnam/xng-breadcrumb/commit/3056b11))

### [3.1.7](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.1.6...v3.1.7) (2019-09-21)

### Bug Fixes

- scripts ([b19efad](https://github.com/udayvunnam/xng-breadcrumb/commit/b19efad))

### [3.1.6](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.1.5...v3.1.6) (2019-09-21)

### Bug Fixes

- scripts ([a9799dc](https://github.com/udayvunnam/xng-breadcrumb/commit/a9799dc))

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
