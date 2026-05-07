import { expect, test } from "@playwright/test";

test.describe("Chinese docs locale", () => {
  test("opens the Chinese docs home, recipe index, detail page, and installation guide", async ({
    page,
  }) => {
    await page.goto("/zh-CN");

    await expect(
      page.getByRole("heading", { name: "给 Vue 团队用的状态界面组件" }),
    ).toBeVisible();
    await expect(page.getByRole("navigation", { name: "主导航" })).toBeVisible();

    await page.getByTestId("home-browse-recipes").click();
    await expect(page).toHaveURL(/\/zh-CN\/recipes$/);
    await expect(page.getByTestId("recipe-list-empty")).toBeVisible();
    await expect(page.getByRole("heading", { name: "按状态类别组织的 preset recipes" })).toBeVisible();

    await page.getByTestId("recipe-link-page-error-state").click();
    await expect(page).toHaveURL(/\/zh-CN\/recipes\/page-error-state$/);
    await expect(
      page.getByRole("heading", { name: "这个页面暂时无法加载" }),
    ).toBeVisible();
    await expect(page.getByTestId("recipe-detail-metadata")).toContainText(
      "ErrorState",
    );

    await page.getByRole("link", { name: "安装" }).click();
    await expect(page).toHaveURL(/\/zh-CN\/docs\/installation$/);
    await expect(page.getByTestId("installation-step-01")).toContainText("安装包");
  });

  test("keeps the current page when switching between English and Chinese", async ({
    page,
  }) => {
    await page.goto("/recipes/onboarding-workspace-state");

    await page.getByRole("link", { name: "Language: 中文" }).click();
    await expect(page).toHaveURL(/\/zh-CN\/recipes\/onboarding-workspace-state$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "欢迎进入你的启动工作区",
      }),
    ).toBeVisible();

    await page.getByRole("link", { name: "语言: English" }).click();
    await expect(page).toHaveURL(/\/recipes\/onboarding-workspace-state$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Welcome to your launch workspace",
      }),
    ).toBeVisible();
  });
});
