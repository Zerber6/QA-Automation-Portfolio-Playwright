import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Электроника"', () => {

  test('Успешный переход в раздел "Электроника" через боковое меню Каталога', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const EXPECTED_PATH = '/catalog/electronics/';

    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу общего каталога
    await page.goto(CATALOG_URL);
    
    // 2 и 3. Находим ссылку "Электроника" и кликаем по ней (с авто-ожиданием)
    await catalogPage.clickElectronicsCategory();

    // 4 и 5. Ожидаем смены URL и проверяем его (регистронезависимо)
    await expect(page).toHaveURL(new RegExp(EXPECTED_PATH, 'i'));

    // 6. Проверяем, что активная категория подсвечена (.current-cat) и содержит текст "Электроника"
    const activeCategory = page.locator('.current-cat', { hasText: 'Электроника' });
    await expect(activeCategory).toBeVisible();
  });

});