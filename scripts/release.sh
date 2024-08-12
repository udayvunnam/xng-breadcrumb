#!/bin/bash

git checkout main
git pull origin main

cp README.md xng-breadcrumb/README.md
cp README.md docs/README.md

# Get npm package version
VERSION=$(npm -s run env | grep npm_package_version | sed 's/npm_package_version=//')
# Update npm version in libs/xng-breadcrumb directory
(
  cd xng-breadcrumb
  npm version "$VERSION"
)

git add .
git commit -m "$VERSION"
git push origin main

npx release-please release-pr --token=$RELEASE_PLEASE_TOKEN --repo-url=https://github.com/udayvunnam/xng-breadcrumb
