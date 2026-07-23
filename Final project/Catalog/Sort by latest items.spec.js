import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Тест поля сортировки товаров', () => {

  test('Успешная сортировка товаров по новизне (Последние)', async ({ page }) => {
    const EXPECTED_SORT_TEXT = 'Последние';

    // Инициализируем наш основной CatalogPage
    const catalogPage = new CatalogPage(page);

    // 1. Открываем каталог
    await page.goto('https://intershop5.skillbox.ru/product-category/catalog/');
    
    // 2. Выбираем сортировку по новизне ("date") через CatalogPage
    await catalogPage.selectSortByValue('date');
    
    // 3 и 4. Ждем, когда бэкенд обновит URL, и проверяем параметр сортировки
    await expect(page).toHaveURL(/.*orderby=date.*/);

    // 5. Проверяем, что в самом дропдауне визуально выбрана правильная опция
    await expect(catalogPage.sortDropdown).toContainText(EXPECTED_SORT_TEXT, { ignoreCase: true });
  });

});