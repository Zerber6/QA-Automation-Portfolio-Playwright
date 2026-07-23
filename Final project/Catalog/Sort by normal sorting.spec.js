import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Тест поля сортировки товаров (Сброс на дефолт)', () => {

  test('Успешный возврат к "Обычной сортировке" после фильтрации по цене', async ({ page }) => {
    const EXPECTED_SORT_TEXT = 'Обычная сортировка'; 
    // Специально стартуем со страницы, где уже активна сортировка по цене
    const INITIAL_URL = 'https://intershop5.skillbox.ru/product-category/catalog/?orderby=price';

    const catalogPage = new CatalogPage(page);

    // 1. Заходим на страницу с примененной сортировкой по цене
    await page.goto(INITIAL_URL);
    
    // 2. Сбрасываем сортировку на дефолтную ("menu_order") через наш CatalogPage
    await catalogPage.selectSortByValue('menu_order');

    // 3 и 4. Ждем обновления и проверяем, что 'price' исчез из URL
    // В Playwright expect().not.toHaveURL идеально заменяет ручное ожидание функции
    await expect(page).not.toHaveURL(/.*orderby=price.*/);

    // 5. Проверяем, что в дропдауне активен правильный текст
    await expect(catalogPage.sortDropdown).toContainText(EXPECTED_SORT_TEXT, { ignoreCase: true });
  });

});