import { expect, test } from "@playwright/test";

test("showreel iframe is created only after explicit play", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(
    page.locator('script[src*="youtube"], script[src*="vimeo"]'),
  ).toHaveCount(0);

  const playButton = page.getByRole("button", { name: "Leisti AVideo showreel" });
  await expect(playButton).toBeVisible();
  await playButton.click();

  const iframe = page.locator("iframe[data-lite-video-iframe]");
  await expect(iframe).toHaveCount(1);
  await expect(iframe).toHaveAttribute(
    "src",
    /^https:\/\/www\.youtube-nocookie\.com\/embed\/kM0p-mKQQaY\?/,
  );
  await expect(iframe).toHaveAttribute("title", /Sveiki atvykę į AVideo/);
});

test("D1-backed routes and 404 render", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("heading", { name: "Darbai" })).toBeVisible();
  await expect(page.getByText("BESTOGO In Slow Motion", { exact: true })).toBeVisible();
  await expect(page.getByText("LIVE fx30 1359", { exact: true })).toHaveCount(0);
  await expect(page.locator("iframe")).toHaveCount(0);

  const posters = page.locator(".project-card img");
  await expect(posters).toHaveCount(35);
  for (let index = 0; index < 6; index += 1) {
    const poster = posters.nth(index);
    await poster.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        poster.evaluate((image) => (image as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }

  await page.goto("/work/bestogo-in-slow-motion");
  await expect(
    page.getByRole("heading", { name: "BESTOGO In Slow Motion" }),
  ).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);

  const response = await page.goto("/work/not-a-real-project");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
});

const viewports = [
  { name: "375", width: 375, height: 812 },
  { name: "430", width: 430, height: 860 },
  { name: "768", width: 768, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

for (const viewport of viewports) {
  test(`homepage has no horizontal overflow at ${viewport.name}px`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");

    await expect(page.getByRole("navigation", { name: "Pagrindinė navigacija" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Atrinkti darbai" })).toBeVisible();

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);

    if (viewport.width === 375 || viewport.width === 1440) {
      await page.screenshot({
        path: `/tmp/avideo-phase1-${viewport.name}.png`,
        fullPage: true,
      });
    }
  });
}
