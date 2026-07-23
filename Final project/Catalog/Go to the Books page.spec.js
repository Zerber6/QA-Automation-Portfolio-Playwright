import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Книги"', () => {

  test('Успешный переход в раздел "Книги" через боковое меню Каталога', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const BOOKS_PATH = '/product-category/catalog/books/';

    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу общего каталога
    await page.goto(CATALOG_URL);
    
    // 2 и 3. Кликаем по ссылке "Книги" (авто-ожидание Playwright сделает всё за нас)
    await catalogPage.clickBooksCategory();

    // 4 и 5. Ожидаем смены URL и проверяем его в регистронезависимом режиме
    await expect(page).toHaveURL(new RegExp(BOOKS_PATH, 'i'));

    // 6. Дополнительная проверка: убеждаемся, что категория в боковом меню стала активной
    // Ищем элемент, у которого одновременно есть классы .cat-item и .current-cat
    const activeCategory = page.locator('.cat-item.current-cat');
    await expect(activeCategory).toBeVisible();
  });

});