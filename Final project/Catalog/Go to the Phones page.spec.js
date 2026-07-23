import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Телефоны"', () => {

  test('Успешный переход в раздел "Телефоны" через боковое меню Каталога', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const EXPECTED_PATH = '/catalog/electronics/phones/';
    const EXPECTED_TEXT = 'Телефоны';

    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу каталога
    await page.goto(CATALOG_URL);
    
    // 2. Локатор ссылки "Телефоны"
    const phonesLink = catalogPage.phonesCategoryLink;

    // 3. Проверяем текст элемента перед кликом (регистронезависимо)
    await expect(phonesLink).toHaveText(EXPECTED_TEXT, { ignoreCase: true });
    
    // 4. Кликаем по ней
    await catalogPage.clickPhonesCategory();

    // 5. Ожидаем смену URL и проверяем его
    await expect(page).toHaveURL(new RegExp(EXPECTED_PATH, 'i'));

    // 6. Проверяем, что категория стала активной
    const activeCategory = page.locator('.current-cat');
    await expect(activeCategory).toBeVisible();
  });

});