import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Сложная навигация по многоуровневому меню', () => {

  test('Успешно перейти в раздел "Часы" через цепочку Каталог -> Электроника', async ({ page }) => {
    const WATCH_CATEGORY_PATH = '/catalog/electronics/watch/';
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу
    await page.goto(BASE_URL);

    // 2 и 3. Проходим по цепочке ховеров и кликаем по пункту "Часы"
    await homePage.navigateToWatchesMenu();

    // 4 и 5. Проверяем, что URL изменился на нужную категорию
    await expect(page).toHaveURL(new RegExp(WATCH_CATEGORY_PATH, 'i'));
  });

});