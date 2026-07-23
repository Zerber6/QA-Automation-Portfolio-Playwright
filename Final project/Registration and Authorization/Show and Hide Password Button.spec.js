import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Авторизация пользователя (Интерфейс)', () => {

  test('Показать пароль при нажатии на иконку глаза', async ({ page }) => {
    const LOGIN_URL = 'https://intershop5.skillbox.ru/my-account/';
    const TEST_PASSWORD = '123456';

    const loginPage = new LoginPage(page);

    // 1. Открываем страницу авторизации
    await page.goto(LOGIN_URL);

    // 2. Вводим пароль в поле через Page Object
    // На старте тип этого поля строго 'password'
    await loginPage.passwordField.fill(TEST_PASSWORD);

    // 3. Кликаем по иконке глаза (переключатель видимости)
    const showPasswordIcon = page.locator('span.show-password-input');
    await showPasswordIcon.click();

    // 4. ВЕРИФИКАЦИЯ ИЗМЕНЕНИЯ АТРИБУТА
    // Playwright позволяет изящно проверять атрибуты элементов через веб-ассерты
    await expect(loginPage.passwordField).toHaveAttribute('type', 'text');

    console.log('✓ Тест пройден! Атрибут поля успешно изменился с password на text.');
  });

});