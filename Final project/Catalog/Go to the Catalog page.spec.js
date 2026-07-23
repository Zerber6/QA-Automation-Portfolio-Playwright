import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Каталог"', () => {

  test('Успешно кликнуть по активной ссылке "Каталог" в боковом меню', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const EXPECTED_PATH = '/product-category/catalog/';      

    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу общего каталога
    await page.goto(CATALOG_URL);
    
    // 2 и 3. Находим ссылку "Каталог" и кликаем по ней (с авто-ожиданием)
    await catalogPage.clickRootCatalog();

    // 4. Проверяем, что URL соответствует ожидаемому (регистронезависимо)
    await expect(page).toHaveURL(new RegExp(EXPECTED_PATH, 'i'));

    // 5. Проверяем, что элемент бокового меню сохранил статус активного
    const activeCategory = page.locator('.current-cat');
    await expect(activeCategory).toBeVisible();
  });

});