# Quickstart

## Install

```bash
npm install xng-breadcrumb
pnpm add xng-breadcrumb
yarn add xng-breadcrumb
```

## Standalone apps (Angular 17+)

**app.component.ts**

```ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';

@Component({
  standalone: true,
  imports: [RouterModule, BreadcrumbComponent, BreadcrumbItemDirective],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

**app.component.html**

```html
<xng-breadcrumb></xng-breadcrumb>
```

## NgModule apps (Angular < 17)

```ts
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  imports: [BreadcrumbModule],
})
export class AppModule {}
```

Then render breadcrumbs in your shell layout (usually `app.component.html`):

```html
<xng-breadcrumb></xng-breadcrumb>
```

You should now see breadcrumbs generated from your Angular route config.
