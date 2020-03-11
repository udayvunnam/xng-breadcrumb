/**
 * Rule: lockfiles
 * Reason: With package.json changes you probably want a change the package-lock.json too.
 * Yes, not every change to the package.json represents a dependency update.
 */

export function keepPackageAndLockInSync(...dangerModule) {
  const { danger, fail, warn } = dangerModule;

  const changedFiles = [...danger.git.modified_files, ...danger.git.created_files, ...danger.git.deleted_files];

  if (danger.git.deleted_files.includes('package-lock.json')) {
    fail('Do not delete the lockfile', 'package-lock.json', 1);
  }

  const packageChanged = changedFiles.includes('package.json');
  const lockfileChanged = changedFiles.includes('package-lock.json');

  if (packageChanged && !lockfileChanged) {
    const message = 'There are package.json changes without package-lock.json';
    const idea = 'Perhaps you need to run `npm install`? Ignore if it is not a dependency update.';
    warn(`${message} - _${idea}_`, 'package.json');
  }
}
