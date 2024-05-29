import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly defaultBreadcrumbs: Locator;
  readonly customBreadcrumbs: Locator;
  readonly advancedBreadcrumbs1: Locator;
  readonly advancedBreadcrumbs2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.defaultBreadcrumbs = page.locator('xng-breadcrumb.default');
    this.customBreadcrumbs = page.locator('xng-breadcrumb.title-case');
    this.advancedBreadcrumbs1 = page.locator('xng-breadcrumb.advanced1');
    this.advancedBreadcrumbs2 = page.locator('xng-breadcrumb.advanced2');
  }

  async navigateToMentors() {
    await this.page.getByRole('link', { name: 'Mentors' }).click();
  }

  async navigateToMentees() {
    await this.page.getByRole('link', { name: 'Mentees' }).click();
  }

  async navigateToMentorDetails() {
    await this.page.locator('app-mentor-list mat-card').first().click();
  }

  async navigateToMenteeDetails() {
    await this.page.locator('app-mentee-list mat-card').first().click();
  }

  async editMember() {
    await this.page.getByRole('button', { name: 'Edit' }).click();
  }

  async navigateToConnect() {
    await this.page.getByRole('link', { name: 'Connect' }).click();
  }

  async clickConnectButton() {
    this.page.getByRole('button', { name: 'Connect' }).click();
  }
}
