#!/bin/bash

# Checkout main branch
git checkout main

# Pull latest changes from origin main
git pull origin main

# Copy README.md to libs/xng-breadcrumb/README.md
cp README.md libs/xng-breadcrumb/README.md

# Get npm package version
VERSION=$(npm -s run env | grep npm_package_version | sed 's/npm_package_version=//')

# Change directory to libs/xng-breadcrumb and update npm version
cd libs/xng-breadcrumb
npm version "$VERSION"
cd ..

# Add changes, commit, and push to origin main
git add .
git commit -m "$VERSION"
git push origin main
