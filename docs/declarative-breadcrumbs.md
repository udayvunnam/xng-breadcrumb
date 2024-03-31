# Declarative breadcrumbs

Define breadcrumbs as part of your routing module configuration for any path. Simply add a `breadcrumb` property in the `data` object during route declaration.

`breadcrumb` can be defined as a **string** OR **object** OR **function**.

## defining Breadcrumb as a String

If you have a static breadcrumb text for a route, define it as a **string**.

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

## Defining Breadcrumb as an Object

- When providing additional properties like alias, skip, or disable, define breadcrumb as an **object**.
- For object mode, the `label` property denotes the breadcrumb text.
- You can also use the `info` property to pass arbitrary data associated with a route, which can be utilized in the breadcrumb selector. [See usage](add-icon-with-label.md)

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

## Defining Breadcrumb as a Function

Breadcrumb as a Function gives you more power :)
Use **breadcrumb as a function** if you want more flexibility to alter the auto-generated label

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
