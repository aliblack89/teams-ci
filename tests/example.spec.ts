import { test, expect } from "@playwright/test";

test("can log in", async ({ page }) => {
  await page.goto(
    "https://teams.microsoft.com/l/app/9f1bdeaf-70b1-4a0f-862f-8fbb0b572144?installAppPackage=true&webjoin=true&appTenantId=400ec15e-009c-455f-93cd-f0dd729cd781&login_hint=ali.black%40yhlp1.onmicrosoft.com"
  );
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("Z28L&rDJqHc$cL!");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("button", { name: "No" }).click();

  await page
    .frameLocator(".embedded-electron-webview")
    .getByRole("button", { name: "Add search-spike-local" })
    .click();

  const frame = await page.frameLocator('[name="embedded-page-container"]');

  await expect(frame.getByText("Congratulations, Ali Black!")).toBeVisible();
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
