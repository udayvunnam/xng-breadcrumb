import { danger, fail, warn, message, markdown } from 'danger';

keepPackageAndLockInSync();
celebrateCleanCode();

/**
 * Rule: Celebrate PRs that remove more code than they add.
 * Reason: Less is more!
 */
function celebrateCleanCode() {
  if (danger.github.pr.deletions > danger.github.pr.additions) {
    message(
      `đ Great job! I see more lines deleted than added. Thanks for keeping us lean!`
    );
  }
}

/**
 * Rule: lockfiles
 * Reason: With package.json changes you probably want a change the package-lock.json too.
 * Yes, not every change to the package.json represents a dependency update.
 */
function keepPackageAndLockInSync() {
  const changedFiles = [
    ...danger.git.modified_files,
    ...danger.git.created_files,
    ...danger.git.deleted_files,
  ];

  if (danger.git.deleted_files.includes('package-lock.json')) {
    fail('Do not delete the lockfile', 'package-lock.json', 1);
  }

  const packageChanged = changedFiles.includes('package.json');
  const lockfileChanged = changedFiles.includes('package-lock.json');

  if (packageChanged && !lockfileChanged) {
    const message = 'There are package.json changes without package-lock.json';
    const idea =
      'Perhaps you need to run `npm install`? Ignore if it is not a dependency update.';
    warn(`${message} - _${idea}_`, 'package.json');
  }
}

function commonChecks() {
  const modifiedMD = danger.git.modified_files.join('\n- ');
  message(`Changed Files in this PR: \n - ${modifiedMD}`);

  if (danger.github.pr.body.length < 10) {
    fail('This pull request needs an description.');
  }

  const bigPRThreshold = 600;
  if (
    danger.github.pr.additions + danger.github.pr.deletions >
    bigPRThreshold
  ) {
    warn(`:exclamation: Big PR`);
    markdown(
      `Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.`
    );
  }

  if (danger.github.pr.assignee === null) {
    fail(
      'Please assign someone to merge this PR, and optionally include people who should review.'
    );
  }

  // // People can add themselves to CODEOWNERS in order to be automatically added as reviewers when a file matching a glob pattern is modified. The following will have the bot add a mention in that case.
  // const codeowners = fs.readFileSync('../.github/CODEOWNERS', 'utf8').split('\n');
  // let mentions = [];
  // codeowners.forEach(codeowner => {
  //   const pattern = codeowner.split(' ')[0];
  //   const owners = codeowner
  //     .substring(pattern.length)
  //     .trim()
  //     .split(' ');

  //   const modifiedFileHasOwner = path => minimatch(path, pattern);
  //   const modifiesOwnedCode = danger.git.modified_files.filter(modifiedFileHasOwner).length > 0;

  //   if (modifiesOwnedCode) {
  //     mentions = mentions.concat(owners);
  //   }
  // });
  // const isOwnedCodeModified = mentions.length > 0;
  // if (isOwnedCodeModified) {
  //   const uniqueMentions = new Set(mentions);
  //   markdown('Attention: ' + [...uniqueMentions].join(', '));
  // }
}
