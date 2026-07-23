import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Авторизация пользователя (Пустой логин)', () => {

  test('Отобразить ошибку о необходимости имени пользователя', async ({ page }) => {
    const LOGIN_URL = 'https://intershop5.skillbox.ru/my-account/';
    
    // Тестовые данные для проверки валидации
    const TEST_PASSWORD = '123';
    const EXPECTED_ERROR = 'Имя пользователя обязательно';

    const loginPage = new LoginPage(page);

    // 1. Открываем страницу авторизации
    await page.goto(LOGIN_URL);

    // 2. Оставляем логин пустым, заполняем только пароль
    await loginPage.passwordField.fill(TEST_PASSWORD);

    // 3. Нажимаем кнопку входа
    await loginPage.loginButton.click();

    // 4. ВЕРИФИКАЦИЯ ОШИБКИ БЭКЕНДА
    // Playwright сам дождется появления плашки woocommerce-error и сверит текст
    await expect(loginPage.errorList).toContainText(EXPECTED_ERROR, { ignoreCase: true });

    console.log(`✓ Негативный тест на пустой логин успешно пройден! Отображается ошибка: "${EXPECTED_ERROR}"`);
  });

});