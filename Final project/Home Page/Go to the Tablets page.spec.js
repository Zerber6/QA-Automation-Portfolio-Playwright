import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Переход к разделу планшетов', () => {

  test('Перейти на страницу с планшетами после клика по второй кнопке "Просмотреть"', async ({ page }) => {
    const PAD_CATEGORY_PATH = '/product-category/catalog/electronics/pad/';
    const BASE_URL = 'https://intershop5.skillbox.ru';
    const TARGET_BUTTON_INDEX = 1; // Индекс 1 — это вторая кнопка в массиве

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу сайта
    await page.goto(BASE_URL);

    // 2, 3 и 4. Скролл и клик по второй кнопке
    // Playwright сам проскроллит к элементу с индексом 1, дождется его видимости и кликнет!
    await homePage.clickOnPromoButtonByIndex(TARGET_BUTTON_INDEX);

    // 5 и 6. Ожидаем изменение URL и проверяем, что попали в нужный раздел
    await expect(page).toHaveURL(new RegExp(PAD_CATEGORY_PATH, 'i'));
  });

});