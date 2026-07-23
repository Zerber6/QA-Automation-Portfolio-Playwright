import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Тест поля сортировки товаров (По отзывам)', () => {

  test('Успешная сортировка товаров по рейтингу/отзывам', async ({ page }) => {
    const EXPECTED_TEXT = 'По отзывам';
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';

    const catalogPage = new CatalogPage(page);

    // 1. Открываем каталог товаров
    await page.goto(CATALOG_URL);

    // 2. Выбираем сортировку по отзывам ("rating") через наш CatalogPage
    await catalogPage.selectSortByValue('rating');

    // 3 & 4. Ждем обновления страницы и проверяем наличие параметра в URL
    await expect(page).toHaveURL(/.*orderby=rating.*/);

    // 5. Проверяем, что в выпадающем списке активен нужный текст
    await expect(catalogPage.sortDropdown).toContainText(EXPECTED_TEXT, { ignoreCase: true });
  });

});