export interface Breadcrumb {
  label: string;
  route: string; // actual route along with resolved params
  breadcrumbAlias?: string;
  skip?: boolean;
  routeRegex?: string; // Regex string expression if route has dynamic params
}
