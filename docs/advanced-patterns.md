# Advanced patterns with xng-breadcrumb

## Skip breadcrumbs for certain routes

You can skip a route from displaying in breadcrumbs in two ways

- make **skip: true** in route config `breadcrumb: { skip: true }`
- dynamically skip using `set(<myPathOrAlias>, { skip:true })`;

### Skip breadcrumb in route config

```javascript
  {
    path: 'edit',
    component: MentorEditComponent,
    data: { breadcrumb: { skip: true } }
  }
```

### Skip breadcrumb dynamically

```javascript
breadcrumbService.set('mentor/:id/edit', { skip: true });
breadcrumbService.set('@mentorName', { skip: true }); // using alias '@mentorName'

//To make a hidden breadcrumb visible.
breadcrumbService.set('mentor/:id/edit', { skip: false });
breadcrumbService.set('@mentorName', { skip: false }); // using alias '@mentorName'
```

## Disable Breadcrumb navigation for certain routes

You can show an intermediate breadcrumb, but disable navigation if the route has no meaning.

- make **disable: true** in route config `breadcrumb: { disable: true }`
- dynamically skip using `set(<myPathOrAlias>, { disable:true })`;

## Disable Auto Generation of breadcrumb labels

- Breadcrumbs are integrated with Angular Router and labels are auto-generated (if a label is not provided for a route).
- Auto-generated label is the same as route the path segment.
- If you want to disable this behavior, set `[autoGenerate]=false`.

```html
<xng-breadcrumb [autoGenerate]="false"></xng-breadcrumb>
```

## Intercept the routing via breadcrumb navigation - routeInterceptor

When we have conditional routing in App components (Ex: for a certain role navigate to pathA vs pathB from a component), it might be useful to have conditional routing from breadcrumb too

- **With App's RouteConfig:** Provide routeInterceptor callback in RouteConfig if you know the redirection logic upfront

```javascript
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      breadcrumb: {
        label: 'my home',
        info: 'home',
        routeInterceptor: (routeLink, breadcrumb)=> {
          console.log(routeLink);
          return routeLink;
        }
      },
    },
  }
```

- **With Breadcrumb service:** If you want to access Application context within the interceptor, use breadcrumbService that can be called from anywhere in the App

```javascript
const isDesigner = true;
breadcrumbService.set('home', {
  routeInterceptor: (routeLink, breadcrumb) =>
    isDesigner ? '/designer' : routeLink,
});
```

## Custom Breadcrumb template (change seperator, add icons, filters, styles, i18n etc)

You can display whatever you want in the place of breadcrumb text by providing a custom template.

- Use _\*xngBreadcrumbItem_ directive to provide a custom template
- breadcrumb label is available implicitly in the template context

### Change text case with filter

```javascript
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      breadcrumb: 'app home'
    }
  }
```

```html
<xng-breadcrumb>
  <ng-container *xngBreadcrumbItem="let breadcrumb">
    <ng-container>{{ breadcrumb | titlecase }}</ng-container>
  </ng-container>
</xng-breadcrumb>
```

### Add icons in front of label

- define 'info' associated with breadcrumb in route config. 'info' has type <any>. you can pass string or object as you need.
- 'info' is available in the context of _\*xngBreadcrumbItem_.
- Additionally 'first', 'last', 'index' and count are passed to identify the respective items.

```javascript
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      breadcrumb: {
        label: 'app home',
        info: 'home'
      }
    }
  }
```

```html
<xng-breadcrumb>
  <ng-container
    *xngBreadcrumbItem="let breadcrumb; let info = info; let first = first"
  >
    <mat-icon *ngIf="info">{{ info }}</mat-icon>
    <ng-container *ngIf="!first">{{ breadcrumb }}</ng-container>
  </ng-container>
</xng-breadcrumb>
```

### Internationalization - i18n

- Usually, internationalization is achieved in Angular using libraries like ngx-translate or transloco.
- These libraries provide a pipe to change text while language is changed.
- For example, if you are using ngx-translate you can change the language for breadcrumb text as shown below.

```html
<xng-breadcrumb>
  <ng-container *xngBreadcrumbItem="let breadcrumb">
    <ng-container>{{ breadcrumb | translate }}</ng-container>
  </ng-container>
</xng-breadcrumb>
```

## Custom separator

- Breadcrumb uses '/' as the separator by default.
- To use custom separator pass **separator** as an input to `<xng-breadcrumb>`.
- You can either use a simple string(>>, -, -->) or a component (mat-icon, fa-icon) as a separator.

### string as separator

```html
<xng-breadcrumb separator=">"></xng-breadcrumb>
```

### icon or component as separator

```html
<xng-breadcrumb [separator]="iconTemplate"></xng-breadcrumb>

<ng-template #iconTemplate>
  <mat-icon>arrow_right</mat-icon>
</ng-template>
```

## Custom Breadcrumb Styles

- `<xng-breadcrumb>` defines the least possible specificity for selectors, to make it easy to override them.
- override styles by changing the CSS for corresponding classes. (Keep this styles in app root styles file if you don't want to use ::ng-deep)
- Below is a visualization of various classes involved in xng-breadcrumb to help you for easy identification.
- (Optional) xng-breadcrumb takes 'class' as input. This class will be applied to the root of the breadcrumb. This can be used to increase specificity when there are conflicting styles.

  ![image](https://user-images.githubusercontent.com/20707504/68110000-f61af700-ff11-11e9-8834-bc754a46b39d.png)

```css
.xng-breadcrumb-root {
  padding: 8px 16px;
  display: inline-block;
  border-radius: 4px;
  background-color: #e7f1f1;
}

.xng-breadcrumb-separator {
  padding: 0 4px;
}
```
