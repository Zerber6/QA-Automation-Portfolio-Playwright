import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Холодильники"', () => {

  test('Успешный переход в раздел "Холодильники" через боковое меню Каталога', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const EXPECTED_PATH = '/catalog/appliances/refrigerators/';

    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу общего каталога
    await page.goto(CATALOG_URL);
    
    // 2 and 3. Находим ссылку на "Холодильники" и кликаем по ней (с авто-ожиданием)
    await catalogPage.clickRefrigeratorsCategory();

    // 4 and 5. Ожидаем смену URL и проверяем его (регистронезависимо)
    await expect(page).toHaveURL(new RegExp(EXPECTED_PATH, 'i'));

    // 6. Проверяем, что пункт меню подсветился как активный
    const activeCategory = page.locator('.current-cat');
    await expect(activeCategory).toBeVisible();
  });

});