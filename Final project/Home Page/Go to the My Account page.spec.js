import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Переход на страницу "Мой аккаунт"', () => {

  test('Успешно перейти на страницу "Мой аккаунт" при клике через главное меню', async ({ page }) => {
    const MY_ACCOUNT_PATH = '/my-account/';
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу
    await page.goto(BASE_URL);

    // 2 и 3. Кликаем по ссылке в меню (Playwright сам дождется элемента)
    await homePage.clickOnMyAccountMenu();

    // 4 и 5. Ожидаем смены URL и проверяем его умным ассертом
    await expect(page).toHaveURL(new RegExp(MY_ACCOUNT_PATH, 'i'));
  });

 });