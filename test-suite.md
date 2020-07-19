# Set of test cases to be automated by Cypress.io

## should dynamically generate breadcrumbs

- for static routes and dynamic path params
- static with multi path params

```javascript
// route - /path
// route - /path/:id
// route - /path/:id/subpath/:subpathid
<xng-breadcrumb>
```

## should pick labels from route config

Component level:

- label on parent component
- label on empty child component
- label on both parent and child for a same path(child should take preference)

Module level:

- label on Module
- label on empty child component
- label on both Module and child component for a same path(child should take preference)
- Lazy loaded module

## should be able to edit labels dynamically for a path

- should override the the label specified in route config
- should overide the label that is auto generated for an id
- should override breadcrumb with alias(simple path), alias(complex path)

## should be able to skip breadcrumb

- route config level
- dynamically with route path
- dynamically with route alias

## should be able to disable breadcrumb

- route config level
- dynamically with route path
- dynamically with route alias

## should be able to customize breadcrumb

- Add icon prefix, suffix
- Add a UPPERCASE Angular filter
- change language to Telugu

## should be able to customize breadcrumb styles

- font color, background
- Add a different separator
- change language to Telugu

## should handle query params and fragment on navigating back

- should persist query params and fragment
- same query param has different state in various breadcrumb steps. this should persist
