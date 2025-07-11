# Local development guide

This project was generated using [Nx](https://nx.dev).

If you wish to contribute to this repository, below are the steps for local development.

- Clone the repository `git clone https://github.com/udayvunnam/xng-breadcrumb.git`
- Run `pnpm` to install the dependencies
- Run `pnpm start` to build and watch both the library and the demo app. This opens the demo app at `http://localhost:4200/` automatically.

## Build

Run `pnpm build` to build the library and demo app together. The build artifacts will be stored in the `dist/` directory.

This step is used by CI to build both the library and the demo app.
After a successful build, the demo apps are deployed to Vercel.

## Publish to npm

Run `pnpm release` on main branch if you wish to publish a new version of library to npm

This internally uses google's [release-please](https://github.com/googleapis/release-please) to

- bump the library version based on the commits
- generates changelog
- commit bump files and changelog
- create a new tag with the new version number

GitHub Actions CI gets notified on every new tag push and publishes the library if build and tests are success

## Tests

- Unit tests: `pnpm test` to execute the unit tests via [Jest](https://www.xfive.co/blog/testing-angular-faster-jest/)
- e2e: `pnpm e2e` to execute the e2e tests via [Cypress.io](https://docs.cypress.io/guides/overview/why-cypress.html)
