# API

## Route config (`data.breadcrumb`)

| Property              | Description                                                                        | Type                                   | Default     |
| --------------------- | ---------------------------------------------------------------------------------- | -------------------------------------- | ----------- |
| `breadcrumb`          | Breadcrumb definition for the route                                                | `string` or `BreadcrumbObject` or `BreadcrumbFunction` | `undefined` |
| `breadcrumb.alias`    | Alias for the route used with `BreadcrumbService.set('@alias', ...)`              | `string`                               | `undefined` |
| `breadcrumb.skip`     | Skip this route from the breadcrumb UI                                             | `boolean`                              | `false`     |
| `breadcrumb.disable`  | Disable navigation for this breadcrumb item                                        | `boolean`                              | `false`     |
| `breadcrumb.info`     | Arbitrary info passed into template context (`let info = info`)                   | `unknown`                              | `undefined` |
| `breadcrumb.label`    | Label text, used when object form is provided                                      | `string` or `BreadcrumbFunction`       | `undefined` |
| `breadcrumb.routeInterceptor` | Intercept breadcrumb link generation per item                              | `(routeLink: string, breadcrumb: Breadcrumb) => string` | `undefined` |

## `<xng-breadcrumb>` inputs

| Input                 | Description                                                         | Type                      | Default |
| --------------------- | ------------------------------------------------------------------- | ------------------------- | ------- |
| `separator`           | Separator between breadcrumb items                                  | `string` or `TemplateRef<void>` | `'/'` |
| `autoGenerate`        | Keep auto-generated labels for routes without explicit breadcrumb labels | `boolean`              | `true`  |
| `preserveQueryParams` | Preserve query params while navigating with breadcrumb links        | `boolean`                 | `true`  |
| `preserveFragment`    | Preserve URL fragment while navigating with breadcrumb links        | `boolean`                 | `true`  |
| `anchorTarget`        | Open breadcrumb links in a specific target                          | `'_blank' \| undefined`  | `undefined` |
| `class`               | Additional CSS class on breadcrumb root                             | `string`                  | `''`    |

## `*xngBreadcrumbItem` template directive

Use this directive to customize item rendering.

Template context variables:

- `$implicit`: breadcrumb label
- `info`: custom route `breadcrumb.info`
- `first`: whether item is first
- `last`: whether item is last
- `index`: current index
- `count`: total visible breadcrumb items

## `BreadcrumbService.set(pathOrAlias, breadcrumb)`

| Argument      | Description                                                   | Type                     |
| ------------- | ------------------------------------------------------------- | ------------------------ |
| `pathOrAlias` | Route path (`mentor/:id`) or alias prefixed with `@`         | `string`                 |
| `breadcrumb`  | Updated breadcrumb definition for the route                   | `string` or `BreadcrumbObject` |
