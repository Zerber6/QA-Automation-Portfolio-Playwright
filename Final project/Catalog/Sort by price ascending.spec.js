import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Тест поля сортировки товаров (По возрастанию цены)', () => {

  test('Успешная сортировка товаров по возрастанию цены', async ({ page }) => {
    const EXPECTED_TEXT = 'По возрастанию цены';
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';

    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу каталога
    await page.goto(CATALOG_URL);

    // 2. Выбираем сортировку по цене ("price") через наш CatalogPage
    await catalogPage.selectSortByValue('price');

    // 3 и 4. Ждем обновления и проверяем, что параметр прописался в URL
    await expect(page).toHaveURL(/.*orderby=price.*/);

    // 5. Проверяем, что в дропдауне активен правильный текст
    await expect(catalogPage.sortDropdown).toContainText(EXPECTED_TEXT, { ignoreCase: true });
  });

});