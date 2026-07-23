import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Сложная навигация по многоуровневому меню', () => {

  test('Успешно перейти в раздел "Телевизоры" через цепочку Каталог -> Электроника', async ({ page }) => {
    const TV_CATEGORY_PATH = '/electronics/tv/';
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу
    await page.goto(BASE_URL);

    // 2 и 3. Проходим по цепочке ховеров и кликаем по пункту "Телевизоры"
    await homePage.navigateToTVsMenu();

    // 4 и 5. Проверяем, что URL изменился на нужный раздел
    await expect(page).toHaveURL(new RegExp(TV_CATEGORY_PATH, 'i'));
  });

});