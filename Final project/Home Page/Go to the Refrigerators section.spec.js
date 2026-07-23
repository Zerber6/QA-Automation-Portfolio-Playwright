import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Сложная навигация по многоуровневому меню', () => {

  test('Успешно перейти в раздел "Холодильники" через Каталог -> Бытовая техника', async ({ page }) => {
    const REFRIGERATORS_PATH = '/product-category/catalog/appliances/refrigerators/';
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу
    await page.goto(BASE_URL);

    // 2 и 3. Проходим по цепочке ховеров и кликаем по пункту "Холодильники"
    await homePage.navigateToRefrigeratorsMenu();

    // 4 & 5. Проверяем, что URL изменился на нужный раздел
    await expect(page).toHaveURL(new RegExp(REFRIGERATORS_PATH, 'i'));
  });

});