import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Тест поля сортировки товаров (По убыванию цены)', () => {

  test('Успешная сортировка товаров по убыванию цены', async ({ page }) => {
    const EXPECTED_TEXT = 'По убыванию цены';
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';

    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу каталога
    await page.goto(CATALOG_URL);

    // 2. Выбираем сортировку по убыванию цены ("price-desc") через наш CatalogPage
    await catalogPage.selectSortByValue('price-desc');

    // 3 и 4. Ждем обновления и проверяем, что нужный параметр прописался в URL
    await expect(page).toHaveURL(/.*orderby=price-desc.*/);

    // 5. Проверяем, что в дропдауне визуально горит правильный текст
    await expect(catalogPage.sortDropdown).toContainText(EXPECTED_TEXT, { ignoreCase: true });
  });

});