import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Сложная навигация по многоуровневому меню', () => {

  test('Успешно перейти в раздел "Стиральные машины" через Каталог -> Бытовая техника', async ({ page }) => {
    const WASH_MACHINES_PATH = '/product-category/catalog/appliances/wash/';
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу
    await page.goto(BASE_URL);

    // 2 and 3. Проходим по цепочке ховеров и кликаем по пункту "Стиральные машины"
    await homePage.navigateToWashingMachinesMenu();

    // 4 and 5. Проверяем, что URL изменился на нужную категорию
    await expect(page).toHaveURL(new RegExp(WASH_MACHINES_PATH, 'i'));
  });

});