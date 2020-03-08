/**
 * Rule: Celebrate PRs that remove more code than they add.
 * Reason: Less is more!
 */
import { danger, message } from 'danger';
export function celebrateCleanCode() {
  if (danger.github.pr.deletions > danger.github.pr.additions) {
    message(`đ Great job! I see more lines deleted than added. Thanks for keeping us lean!`);
  }
}
