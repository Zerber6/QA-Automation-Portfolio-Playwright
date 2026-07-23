import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Переход на страницу "Корзина"', () => {

  test('Успешно перейти на страницу "Корзина" при клике через главное меню', async ({ page }) => {
    const CART_PATH = '/cart/';
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу сайта
    await page.goto(BASE_URL);

    // 2 и 3. Клик по ссылке корзины в меню
    // Метод сам дождется элемента и кликнет по нему
    await homePage.clickOnMainCartMenu();

    // 4 и 5. Ожидаем загрузки страницы и проверяем URL
    // Умный веб-ассерт сам подождет, пока адрес страницы не поменяется на /cart/
    await expect(page).toHaveURL(new RegExp(CART_PATH, 'i'));
  });

});