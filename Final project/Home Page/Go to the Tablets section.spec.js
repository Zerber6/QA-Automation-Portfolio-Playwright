import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Сложная навигация по многоуровневому меню', () => {

  test('Успешно перейти в раздел "Планшеты" через цепочку Каталог -> Электроника', async ({ page }) => {
    const PAD_CATEGORY_PATH = '/product-category/catalog/electronics/pad/';
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу
    await page.goto(BASE_URL);

    // 2 и 3. Проходим по цепочке ховеров и кликаем по пункту "Планшеты"
    await homePage.navigateToTabletsMenu();

    // 4 и 5. Проверяем, что URL изменился на нужный раздел
    await expect(page).toHaveURL(new RegExp(PAD_CATEGORY_PATH, 'i'));
  });

});