# Custom template

You can customize breadcrumb template using the directive `*xngBreadcrumbItem`. This allows you to alter breadcrumb in many ways.

- [Change seperator](change-separator.md)
- [Add icons with label](add-icons-with-label.md)
- [Use filter to change text case](use-filter.md)
- [Internationalization](internationalization.md)

```html
<xng-breadcrumb>
  <ng-container *xngBreadcrumbItem="let breadcrumb">
    <ng-container>{{ breadcrumb }}</ng-container>
  </ng-container>
</xng-breadcrumb>
```

In above example it uses `*xngBreadcrumbItem` directive to provide a custom template, `breadcrumb` is available implicitly in the template context.
