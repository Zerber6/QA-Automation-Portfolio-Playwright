import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Навигация по вложенному меню на Главной странице', () => {

  test('Успешно перейти в раздел "Одежда" через раскрывающееся подменю Каталога', async ({ page }) => {
    const CLOTHES_CATEGORY_PATH = '/product-category/catalog/clothes/';
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу
    await page.goto(BASE_URL);

    // 2. Наводим мышь на пункт "Каталог" для вызова sub-menu
    await homePage.hoverOverCatalogMenu();

    // 3 и 4. Кликаем по пункту "Одежда" (Playwright сам дождется её видимости)
    await homePage.clickOnClothesSubMenu();

    // 5 и 6. Ожидаем изменения URL и проверяем его
    await expect(page).toHaveURL(new RegExp(CLOTHES_CATEGORY_PATH, 'i'));
  });

});