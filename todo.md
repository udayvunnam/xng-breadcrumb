# TODO list

Collapse breadcrumbs by default if they have 4+ items

Why 4+ items? this limit just “feels” right. 🙃

1. If the user wants to see the entire trail of breadcrumbs, they should have the option to do so. As you can see from the design below, adding clickable ellipses is a great way of implementing this.
2. Put the ellipses as close to the first item as possible — Items that are closer to the final item (current page) hold more weight to the user so you want to make those items visible.
3. Do not make the ellipses the actual first item — It is beneficial for users to know the origin of the current page they are on, especially if they are taken directly to the page they are on via a link.
4. Upon refreshing / re-navigating to the page, breadcrumbs should be collapsed again — There is no clean way to manually collapse breadcrumbs (nor do I think it is worth the effort) so make sure it is collapsed by default, even if they were expanded before.

## provide documentation via gitbook

[gitbook](https://app.gitbook.com/@udayvunnam/s/angular/)

yarn add cypress@latest --save-dev
yarn upgrade-interactive --latest
