import { expect, type Page, test } from "@playwright/test";

const exampleBaseURL = "http://127.0.0.1:4273";
const mobileViewport = { width: 390, height: 844 };

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(async () =>
      page.evaluate(() => {
        const documentWidth = document.documentElement.scrollWidth;
        return documentWidth <= window.innerWidth + 1;
      }),
    )
    .toBe(true);
}

test.describe("Vite Vue admin example", () => {
  test("renders every category-first entry through the public package integration", async ({
    page,
  }) => {
    await page.goto(exampleBaseURL);

    await expect(page.getByTestId("example-app-shell")).toBeVisible();
    await expect(
      page.getByTestId("example-empty-state").locator('.sk-shell[data-category="empty"]'),
    ).toBeVisible();
    await expect(
      page
        .getByTestId("example-onboarding-hero")
        .locator('.sk-shell[data-category="onboarding"]'),
    ).toBeVisible();
    await expect(
      page.getByTestId("example-loading-state").locator('.sk-shell[data-category="loading"]'),
    ).toBeVisible();
    await expect(
      page
        .getByTestId("example-permission-state")
        .locator('.sk-shell[data-category="permission"]'),
    ).toBeVisible();
    await expect(
      page.getByTestId("example-upgrade-state").locator('.sk-shell[data-category="upgrade"]'),
    ).toBeVisible();
    await expect(
      page.getByTestId("example-error-state").locator('.sk-shell[data-category="error"]'),
    ).toBeVisible();
    await expect(
      page.getByTestId("example-success-state").locator('.sk-shell[data-category="success"]'),
    ).toBeVisible();
  });

  test("lets the example host own onboarding visibility and reopen the hero", async ({
    page,
  }) => {
    await page.goto(exampleBaseURL);

    const onboarding = page.getByTestId("example-onboarding-hero");

    await onboarding.getByRole("button", { name: "Start guided setup" }).click();

    await expect(
      onboarding.getByRole("button", { name: "Preparing workspace..." }),
    ).toBeDisabled();
    await expect(onboarding.getByTestId("example-onboarding-closed-panel")).toBeVisible();
    await expect(onboarding.locator('.sk-shell[data-category="onboarding"]')).toHaveCount(0);

    await onboarding.getByRole("button", { name: "Show onboarding again" }).click();

    await expect(
      onboarding.locator('.sk-shell[data-category="onboarding"]'),
    ).toBeVisible();
  });

  test("keeps the onboarding hero readable on desktop width", async ({
    page,
  }) => {
    await page.goto(exampleBaseURL);

    await expectNoHorizontalOverflow(page);

    const layout = await page.getByTestId("example-onboarding-hero").evaluate((section) => {
      const content = section.querySelector<HTMLElement>(".sk-shell__content");
      const media = section.querySelector<HTMLElement>(".sk-shell__media");

      if (!content || !media) {
        return null;
      }

      return {
        contentWidth: content.getBoundingClientRect().width,
        mediaWidth: media.getBoundingClientRect().width,
      };
    });

    expect(layout).not.toBeNull();
    expect(layout!.contentWidth).toBeGreaterThanOrEqual(320);
    expect(layout!.mediaWidth).toBeGreaterThanOrEqual(360);
  });

  test("keeps the onboarding hero stacked and unclipped on phone width", async ({
    page,
  }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto(exampleBaseURL);

    const onboarding = page.getByTestId("example-onboarding-hero");
    const content = onboarding.locator(".sk-shell__content");
    const media = onboarding.locator(".sk-shell__media");
    const actionGroup = onboarding.locator(".sk-onboarding-actions__group");

    await expectNoHorizontalOverflow(page);
    await expect(actionGroup).toHaveCSS("flex-direction", "column");

    const contentBox = await content.boundingBox();
    const mediaBox = await media.boundingBox();

    expect(contentBox).not.toBeNull();
    expect(mediaBox).not.toBeNull();
    expect(mediaBox!.y).toBeGreaterThanOrEqual(
      contentBox!.y + contentBox!.height - 1,
    );
    expect(mediaBox!.x).toBeGreaterThanOrEqual(0);
    expect(mediaBox!.x + mediaBox!.width).toBeLessThanOrEqual(
      mobileViewport.width + 1,
    );
  });
});
