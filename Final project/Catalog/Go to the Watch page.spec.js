import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Часы"', () => {

  test('Успешный переход в раздел "Часы" через боковое меню Каталога', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const WATCH_CATEGORY_URL_PART = '/catalog/electronics/watch/';
    const EXPECTED_TITLE = 'часы';      

    const catalogPage = new CatalogPage(page);

    // 1. Открываем каталог
    await page.goto(CATALOG_URL);
    
    // 2 и 3. Получаем ссылку на "Часы" и кликаем по ней через Page Object
    await catalogPage.clickWatchesCategory();
    
    // 4. Ожидаем смену URL и проверяем его (регистронезависимо)
    await expect(page).toHaveURL(new RegExp(WATCH_CATEGORY_URL_PART, 'i'));

    // 5. Проверяем активную категорию и её текст
    const activeCategory = page.locator('.current-cat');
    await expect(activeCategory).toBeVisible();
    await expect(activeCategory).toContainText(EXPECTED_TITLE, { ignoreCase: true });
  });

});