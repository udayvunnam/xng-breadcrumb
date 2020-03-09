/**
import { danger } from "danger";
import { message } from "danger";
 * Rule: Celebrate PRs that remove more code than they add.
 * Reason: Less is more!
 */

export function celebrateCleanCode(dangerModule) {
  const { danger, message } = dangerModule;
  if (danger.github.pr.deletions > danger.github.pr.additions) {
    message(`đ Great job! I see more lines deleted than added. Thanks for keeping us lean!`);
  }
}
