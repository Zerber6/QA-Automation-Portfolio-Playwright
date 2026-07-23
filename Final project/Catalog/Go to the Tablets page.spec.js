import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Планшеты"', () => {

  test('Успешный переход в раздел "Планшеты" через боковое меню Каталога', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const EXPECTED_PATH = '/catalog/electronics/pad/';
    const CATEGORY_NAME = 'Планшеты';

    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу каталога
    await page.goto(CATALOG_URL);
    
    // 2. Получаем доступ к локатору ссылки "Планшеты"
    const tabletsLink = catalogPage.tabletsCategoryLink;
    
    // 3. Проверяем текст ссылки перед кликом (регистронезависимо)
    await expect(tabletsLink).toHaveText(CATEGORY_NAME, { ignoreCase: true });

    // 4. Кликаем по ней
    await catalogPage.clickTabletsCategory();
    
    // 5. Ожидаем смену URL и проверяем его
    await expect(page).toHaveURL(new RegExp(EXPECTED_PATH, 'i'));

    // 6. Проверяем, что активная категория подсвечена и содержит текст "Планшеты" (игнорируя счетчик товаров вроде "(2)")
    const activeCategory = page.locator('.current-cat');
    await expect(activeCategory).toContainText(CATEGORY_NAME, { ignoreCase: true });
    });

});