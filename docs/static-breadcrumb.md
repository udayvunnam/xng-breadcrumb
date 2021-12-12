# Static breadcrumb

We can define breadcrumbs as part of routing module configuration for any path. Just add `breadcrumb` property in `data` object during route declaration

```javascript
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'add',
    component: MentorAddComponent,
    data: { breadcrumb: 'New' }
  }
```

- a `breadcrumb` can be defined as a **string** OR **object** OR **function**.
- Use **breadcrumb as a string** if you are just providing breadcrumb text
- Use **breadcrumb as an object** if you are providing additional properties like `alias`, `skip`, `info`, `disable`. If you define breadcrumb as an object, **label** property denotes breadcrumb text.
- Use **breadcrumb as a function** if you want to alter the auto-generated label as needed.

## breadcrumb as an object

```javascript
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
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

## breadcrumb as a function

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
