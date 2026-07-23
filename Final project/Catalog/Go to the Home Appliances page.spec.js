import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Бытовая техника"', () => {

  test('Успешный переход в раздел "Бытовая техника" через боковое меню Каталога', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const EXPECTED_PATH = '/catalog/appliances/';

    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу каталога
    await page.goto(CATALOG_URL);
    
    // 2 и 3. Находим ссылку "Бытовая техника" и кликаем по ней
    await catalogPage.clickAppliancesCategory();

    // 4 и 5. Ожидаем смену URL и проверяем его (регистронезависимо)
    await expect(page).toHaveURL(new RegExp(EXPECTED_PATH, 'i'));

    // 6. Проверяем текст главного заголовка на странице
    // toHaveText с флагом ignoreCase избавит от ручного .toLowerCase()
    const pageTitle = page.locator('.entry-title');
    await expect(pageTitle).toHaveText('Бытовая техника', { ignoreCase: true });
  });

});