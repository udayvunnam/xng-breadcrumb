# Dynamic breadcrumbs

You can update breadcrumbs dynamically from components and services, which is particularly useful for resolving route id to a name. For example, displaying the `ProductName` in the breadcrumb instead of the `ProductId` in the URL

- Breadcrumb label can be updated based on _route path_ or _alias_
- For simple routes, using the _route path_ is sufficient. Ex: `breadcrumbService.set(<route path> , <breadcrumb label>)`
- For longer, deeper routes, using an _alias_ is more convenient.
- To create an alias for a route in the route config, prefix the alias with '@' when using the set() method. For example: `breadcrumbService.set(@<alias>, <breadcrumb label>)`

## Using route path to update labels dynamically

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
```

```javascript
  import { BreadcrumbService } from 'xng-breadcrumb';
  constructor(private breadcrumbService: BreadcrumbService) {};
  // routepath can contain path params similar to how you define in routes
  breadcrumbService.set('mentors', 'Mentor View'); // path for MentorListComponent
  breadcrumbService.set('mentor/:id', 'Uday Vunnam'); // path for MentorDetailsComponent contains param (:id)
```

## Using alias to update labels dynamically

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
```

```javascript
  import { BreadcrumbService } from 'xng-breadcrumb';
  constructor(private breadcrumbService: BreadcrumbService) {};
  breadcrumbService.set('@mentorName', 'Uday Vunnam');

```
