# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](2019-11-05)

### Features

- latest API chnages to work with Angular 7. building with v7 compiler. ([bc44336](https://github.com/udayvunnam/xng-breadcrumb/commit/bc44336f470d8278193f7e803d05d4332e2db10d))

### [5.0.1](https://github.com/udayvunnam/xng-breadcrumb/compare/v5.0.0...v5.0.1) (2019-11-07)

### Bug Fixes

- lock typescript to only patch updates ([cd0e295](https://github.com/udayvunnam/xng-breadcrumb/commit/cd0e2953b3f42db01fc3944fdaccd5b064fbfcf7))

## [5.0.0](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.7.1...v5.0.0) (2019-11-05)

### ⚠ BREAKING CHANGES

- Modified API for component and service.

### Features

- custom separator icon, custom template and i18n ([f11980e](https://github.com/udayvunnam/xng-breadcrumb/commit/f11980ece279a215a8b2d702c90f6a1e1acd54a0))
- remove deprectaed methods and update demo app to work with latest syntax ([6e6304e](https://github.com/udayvunnam/xng-breadcrumb/commit/6e6304e2724a2bd1ea1667838fb4a74f9fe9fd22))
- **app:** update demo app to work with new API ([0548981](https://github.com/udayvunnam/xng-breadcrumb/commit/05489816caff87731521bca345f2b1ff91661276))

### [3.7.1](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.7.0...v3.7.1) (2019-11-03)

### Bug Fixes

- build fix remove cache ([cec314e](https://github.com/udayvunnam/xng-breadcrumb/commit/cec314e))
- build fix remove cache ([59dcf01](https://github.com/udayvunnam/xng-breadcrumb/commit/59dcf01))
- build fixed that was pushing wrong tags ([2b86748](https://github.com/udayvunnam/xng-breadcrumb/commit/2b86748))
- **app:** adding icon ([387e50f](https://github.com/udayvunnam/xng-breadcrumb/commit/387e50f))
- remove @ from alias ([de9b23e](https://github.com/udayvunnam/xng-breadcrumb/commit/de9b23e))

## [3.7.0](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.6.0...v3.7.0) (2019-11-03)

### Bug Fixes

- minor fixes ([8d46872](https://github.com/udayvunnam/xng-breadcrumb/commit/8d46872))
- missed module ([6db5cc6](https://github.com/udayvunnam/xng-breadcrumb/commit/6db5cc6))
- set verndorSourceMap true, to debug in local ([65db615](https://github.com/udayvunnam/xng-breadcrumb/commit/65db615))

### Features

- better comments and code seperation ([6257035](https://github.com/udayvunnam/xng-breadcrumb/commit/6257035))
- customization support for breadcrumb ([b9aff64](https://github.com/udayvunnam/xng-breadcrumb/commit/b9aff64))
- types for internal breadcrumb list and route data for breadcrumb ([58c4729](https://github.com/udayvunnam/xng-breadcrumb/commit/58c4729))

### [3.6.1](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.6.0...v3.6.1) (2019-09-28)

## [3.6.0](https://github.com/udayvunnam/xng-breadcrumb/compare/v2.1.2...v3.6.0) (2019-09-28)

### Features

- Angular8.x version upgrade. Angular 6.x and Angular 7.x are no longer supported. If you are using these versions, please, stick with version xng-beadcrumb@2.x.x ([4f73ec3](https://github.com/udayvunnam/xng-breadcrumb/commit/4f73ec3))

### [2.1.2](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.5.2...v2.1.2) (2019-09-28)

### Bug Fixes

- Compiling with v7 to support Angular 6 and 7. Closes https://github.com/udayvunnam/xng-breadcrumb/issues/12 ([89bf7d7](https://github.com/udayvunnam/xng-breadcrumb/commit/89bf7d7))

### [3.5.2](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.5.1...v3.5.2) (2019-09-26)

### Bug Fixes

- build scripts update ([8923e2e](https://github.com/udayvunnam/xng-breadcrumb/commit/8923e2e))

### [3.5.1](https://github.com/udayvunnam/xng-breadcrumb/compare/v3.4.4...v3.5.1) (2019-09-25)

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
