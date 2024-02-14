# Add static query parameters

You can add fixed value query parameters to route navigated from breadcrumb click using property `staticQueryParams`.
Typical use case is when navigating via breadcrumb has some sort of side effect.

```javascript
  {
    path: 'edit',
    component: MentorEditComponent,
    data: {
      breadcrumb: {
        staticQueryParams: {
          'show-side-nav': false
        }
      }
    }
  }
```
