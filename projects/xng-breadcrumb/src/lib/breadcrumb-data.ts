/**
 * route data for breadcrumb, that can be specified during route declaration
 */
export interface BreadcrumbData {
  /**
   * breacrumb label for a route
   */
  breadcrumb?: string;
  /**
   * unique alias name for a route path
   */
  breadcrumbAlias?: string;
  /**
   * hide or show the breadcrumb item
   */
  skipBreadcrumb?: boolean;
}
