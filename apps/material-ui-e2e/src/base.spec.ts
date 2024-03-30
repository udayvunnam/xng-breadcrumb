import { test as base, expect } from '@playwright/test';
import { BasePage } from './page';

const test = base.extend<{ basePage: BasePage }>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await page.goto('/');
    await use(basePage);
  },
});

test('display default breadcrumbs', async ({ page, basePage }) => {
  await expect(page.getByRole('link', { name: 'TechUnroll' })).toBeVisible();
  await expect(basePage.defaultBreadcrumbs).toHaveText('app');
});

test('persist queryparams and fragment | skip breadcrumbs for specific route', async ({ page, basePage }) => {
  await basePage.navigateToMentors();
  await expect(page).toHaveURL('/mentor?viaNav=true&type=list#testFragment');

  await expect(basePage.defaultBreadcrumbs).toHaveText('app/Enabler');

  await basePage.navigateToMentorDetails();
  expect(page.url()).toMatch('?type=details');

  const title = (await page.locator('app-mentor-details mat-card-title').textContent()) as string;
  await expect(basePage.defaultBreadcrumbs).toHaveText(`app/Enabler/${title}`);
  // breadcrumb navigation should include queryparams and fragment
  await expect(basePage.defaultBreadcrumbs.getByRole('link', { name: 'Enabler' })).toHaveAttribute(
    'href',
    '/mentor?viaNav=true&type=list#testFragment'
  );

  await basePage.editMember();
  expect(page.url()).toMatch('?type=edit');

  // edit shouldn't be shown on breadcrumbs since its skipped
  await expect(basePage.defaultBreadcrumbs).toHaveText(`app/Enabler/${title}`);
});

test('child breadcrumb data precedence, customized breadcrumb with *xngBreadcrumbItem directive', async ({ basePage }) => {
  await basePage.navigateToMentees();

  await expect(basePage.defaultBreadcrumbs).toHaveText('app/student'); // defined on child module
  await expect(basePage.customBreadcrumbs).toHaveText('App ~ Student'); // custom breadcrumb with *xngBreadcrumbItem directive
  await basePage.navigateToMenteeDetails();
  await expect(basePage.defaultBreadcrumbs.getByRole('link', { name: 'student' })).toBeDisabled(); // defined on grand child component
});

test('invoke breadcrumb as a function with resolved param', async ({ page, basePage }) => {
  await basePage.navigateToMentees();
  await basePage.navigateToMenteeDetails();

  const path = page.url();
  const resolvedId = path.split('/').pop();
  await expect(basePage.defaultBreadcrumbs).toHaveText(`app/student/Viewing ${resolvedId} now`);
});

test('used alias to skip a breadcrumb', async ({ page, basePage }) => {
  await basePage.navigateToMentees();
  await basePage.navigateToMenteeDetails();
  await basePage.editMember();

  const parts = page.url().split('/');
  const resolvedId = parts[parts.length - 2];

  // mentee Edit route uses set(@menteeEdit, {skip: true}),
  await expect(basePage.defaultBreadcrumbs).toHaveText(`app/student/Viewing ${resolvedId} now`);
});

test('open links on new tab if "a" target is "_blank"', async ({ basePage }) => {
  await basePage.navigateToMentors();
  await basePage.navigateToMentorDetails();

  await expect(basePage.advancedBreadcrumbs2.getByRole('link', { name: 'Enabler' })).toHaveAttribute('target', '_blank');
});

test('not preserve fragments if disabled', async ({ basePage }) => {
  await basePage.navigateToMentors();
  await basePage.navigateToMentorDetails();

  await expect(basePage.advancedBreadcrumbs2.getByRole('link', { name: 'Enabler' })).toHaveAttribute('href', '/mentor?viaNav=true&type=list');
});

test('not preserve query params if disabled', async ({ basePage }) => {
  await basePage.navigateToMentors();
  await basePage.navigateToMentorDetails();

  await expect(basePage.advancedBreadcrumbs1.getByRole('link', { name: 'Enabler' })).toHaveAttribute('href', '/mentor#testFragment');
});
