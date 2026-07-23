import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Авторизация пользователя (Невалидный Пароль)', () => {

  test('Показать ошибку при вводе невалидного пароля', async ({ page }) => {
    const LOGIN_URL = 'https://intershop5.skillbox.ru/my-account/';
    
    // Тестовые данные для негативного сценария
    const VALID_USER = '12325';
    const INVALID_PASS = '123';
    const EXPECTED_ERROR = 'Веденный пароль для пользователя 12325 неверный';

    const loginPage = new LoginPage(page);

    // 1. Открываем страницу авторизации
    await page.goto(LOGIN_URL);

    // 2. Отправляем данные через готовый метод Page Object
    await loginPage.login(VALID_USER, INVALID_PASS);

    // 3. ЖЕСТКАЯ ВЕРИФИКАЦИЯ ОШИБКИ БЭКЕНДА
    // Автоматически ждем появления списка ошибок и проверяем текст внутри
    await expect(loginPage.errorList).toContainText(EXPECTED_ERROR, { ignoreCase: true });

    console.log(`✓ Негативный тест на пароль успешно пройден! Отображается ошибка: "${EXPECTED_ERROR}"`);
  });

});