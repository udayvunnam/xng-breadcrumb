/**
 * BEFORE EDITING THIS FILE, PLEASE READ http://danger.systems/js/usage/culture.html
 *
 * This file is split into two parts:
 * 1) Rules that require or suggest changes to the code, the PR, etc.
 * 2) Rules that celebrate achievements
 */
import { danger, fail, warn, message } from 'danger';

import { keepPackageAndLockInSync } from './scripts/danger/keep-package-and-lock-in-sync';
import { celebrateCleanCode } from './scripts/danger/celebrate-clean-code';

/* ~ Required or suggested changes ~ */
keepPackageAndLockInSync(danger, fail, warn, message);

/* ~ Achievements                  ~ */
celebrateCleanCode(danger, fail, warn, message);
