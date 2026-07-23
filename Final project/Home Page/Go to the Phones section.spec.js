import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Сложная навигация по многоуровневому меню', () => {

  test('Успешно перейти в раздел "Телефоны" через Каталог -> Электроника', async ({ page }) => {
    const PHONES_CATEGORY_PATH = '/product-category/catalog/electronics/phones/';
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу
    await page.goto(BASE_URL);

    // 2 и 3. Запускаем пошаговый ховер и кликаем по пункту "Телефоны"
    await homePage.navigateToPhonesMenu();

    // 4 и 5. Ожидаем смены URL и проверяем, что попали в нужный раздел
    await expect(page).toHaveURL(new RegExp(PHONES_CATEGORY_PATH, 'i'));
  });

});