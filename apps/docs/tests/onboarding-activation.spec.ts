import { expect, test } from "@playwright/test";

test.describe("Onboarding activation example", () => {
  test("redirects the examples index into the onboarding hero example", async ({ page }) => {
    await page.goto("/examples");

    await expect(page).toHaveURL(/\/examples\/onboarding-activation$/);
    await expect(
      page.getByRole("heading", { name: "Onboarding Activation" }),
    ).toBeVisible();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/onboarding-activation");
  });

  test("renders richer onboarding media and layered actions through slots", async ({
    page,
  }) => {
    const demo = page.getByTestId("page-onboarding-state-demo");

    await expect(demo.locator(".sk-onboarding-media")).toBeVisible();
    await expect(demo.locator(".sk-onboarding-actions")).toBeVisible();
    await expect(demo.locator(".sk-shell__media")).not.toHaveAttribute(
      "aria-hidden",
      "true",
    );
    await expect(
      demo.getByRole("button", { name: "Load demo workspace" }),
    ).toBeVisible();
    await expect(
      demo.locator(".sk-onboarding-actions__skip"),
    ).toHaveText("Skip for now");
  });

  test("surfaces the onboarding recipe family and links to adjacent activation scenarios", async ({
    page,
  }) => {
    const family = page.getByTestId("onboarding-scenario-links");

    await expect(family).toBeVisible();
    await expect(family.getByRole("link", { name: /Workspace launch/i })).toBeVisible();
    await expect(family.getByRole("link", { name: /Invite teammates/i })).toBeVisible();
    await expect(family.getByRole("link", { name: /Connect integration/i })).toBeVisible();

    await family.getByRole("link", { name: /Invite teammates/i }).click();

    await expect(page).toHaveURL(/\/recipes\/onboarding-members-state$/);
    await expect(page.locator("h1")).toHaveText("Invite your first teammates");
  });

  test("renders recipe-level members and integration demos with recipe-default links", async ({
    page,
  }) => {
    const membersDemo = page.getByTestId("onboarding-members-demo");
    const integrationDemo = page.getByTestId("onboarding-integration-demo");

    await expect(membersDemo).toBeVisible();
    await expect(
      membersDemo.getByRole("heading", { name: "Invite teammates as the next onboarding step" }),
    ).toBeVisible();
    await expect(
      membersDemo.getByRole("button", { name: "Invite teammates" }),
    ).toBeVisible();
    await expect(
      membersDemo.getByRole("button", { name: "Copy invite link" }),
    ).toBeVisible();

    await expect(integrationDemo).toBeVisible();
    await expect(
      integrationDemo.getByRole("heading", {
        name: "Connect the first integration before work starts",
      }),
    ).toBeVisible();
    await expect(
      integrationDemo.getByRole("button", { name: "Connect integration" }),
    ).toBeVisible();
    await expect(
      integrationDemo.getByRole("link", { name: "View setup guide" }),
    ).toBeVisible();

    await membersDemo.getByRole("link", { name: "Review recipe defaults" }).click();
    await expect(page).toHaveURL(/\/recipes\/onboarding-members-state$/);
    await expect(page.locator("h1")).toHaveText("Invite your first teammates");

    await page.goto("/examples/onboarding-activation");
    await integrationDemo.getByRole("link", { name: "Review recipe defaults" }).click();
    await expect(page).toHaveURL(/\/recipes\/onboarding-integration-state$/);
    await expect(page.locator("h1")).toHaveText("Connect your first integration");
  });

  test("lets the host page complete setup, hide the hero, and reopen it later", async ({
    page,
  }) => {
    const demo = page.getByTestId("page-onboarding-state-demo");
    const closedPanelCopy = demo.locator(".demo-inline-panel__copy p");

    await demo.getByRole("button", { name: "Start guided setup" }).click();

    await expect(
      demo.getByRole("button", { name: "Preparing workspace..." }),
    ).toBeDisabled();
    await expect(closedPanelCopy).toHaveText(
      "Guided setup completed in the page layer. The component stayed stateless and the page decided to hide the onboarding hero.",
    );
    await expect(
      page.getByRole("heading", { name: "Workspace surface unlocked by page state" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Show onboarding again" }).click();

    await expect(page.getByTestId("page-onboarding-state-demo")).toBeVisible();
    await expect(demo.locator(".sk-onboarding-media")).toBeVisible();
  });

  test("handles demo seeding, skip, and recipe-default discovery without changing the prop API", async ({
    page,
  }) => {
    const demo = page.getByTestId("page-onboarding-state-demo");
    const closedPanelCopy = demo.locator(".demo-inline-panel__copy p");

    await demo.getByRole("button", { name: "Load demo workspace" }).click();

    await expect(
      demo.getByRole("button", { name: "Demo workspace seeded" }),
    ).toBeVisible();
    await expect(
      page.locator(".demo-metric").filter({ hasText: "Demo content" }).locator("strong"),
    ).toHaveText("Seeded");

    await demo.locator(".sk-onboarding-actions__skip").click();

    await expect(closedPanelCopy).toHaveText(
      "Skipped from the page layer. No `dismissed`, `showOnce`, or `localStorage` API was needed in the component library.",
    );

    await page.getByRole("button", { name: "Show onboarding again" }).click();
    await demo.getByRole("link", { name: "Review recipe defaults" }).click();

    await expect(page).toHaveURL(/\/recipes\/onboarding-workspace-state$/);
    await expect(
      page.getByRole("heading", { name: "Rich onboarding media and action areas" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "#media" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "#actions" })).toBeVisible();
  });
});
