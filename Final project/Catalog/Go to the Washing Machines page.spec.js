import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Стиральные машины"', () => {

  test('Успешный переход в раздел "Стиральные машины" через боковое меню Каталога', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const EXPECTED_PATH = '/catalog/appliances/wash/';
    const CATEGORY_NAME = 'стиральные машины';

    const catalogPage = new CatalogPage(page);

    // 1. Открываем каталог
    await page.goto(CATALOG_URL);
    
    // 2 и 3. Находим ссылку и кликаем по ней через Page Object (с авто-ожиданием)
    await catalogPage.clickWashingMachinesCategory();
    
    // 4 и 5. Ожидаем смену URL и проверяем его (регистронезависимо)
    await expect(page).toHaveURL(new RegExp(EXPECTED_PATH, 'i'));

    // 6. Проверяем активную категорию и её текст (используем безопасный toContainText)
    const activeCategory = page.locator('.current-cat');
    await expect(activeCategory).toBeVisible();
    await expect(activeCategory).toContainText(CATEGORY_NAME, { ignoreCase: true });
  });

});