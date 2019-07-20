export interface Breadcrumb {
  label: string; // label for the route
  route: string; // actual route with resolved param
  alias?: string; // friendly name for a route
  skip?: boolean; // whether to skip a breadcrumb from display
  routeRegex?: string; // Route converted to Regex expression (if route has path params).
}
