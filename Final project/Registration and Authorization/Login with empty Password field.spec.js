import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Авторизация пользователя (Пустой пароль)', () => {

  test('Отобразить сообщение о пустом поле пароля', async ({ page }) => {
    const LOGIN_URL = 'https://intershop5.skillbox.ru/my-account/';
    
    // Тестовые данные для негативного сценария
    const TEST_USER = '12325';
    const EXPECTED_ERROR = 'Пароль обязателен';

    const loginPage = new LoginPage(page);

    // 1. Открываем страницу авторизации
    await page.goto(LOGIN_URL);

    // 2. Заполняем только поле логина через локатор из Page Object
    await loginPage.usernameField.fill(TEST_USER);

    // 3. Кликаем по кнопке «Войти», оставив пароль пустым
    await loginPage.loginButton.click();

    // 4. ВЕРИФИКАЦИЯ ОШИБКИ БЭКЕНДА
    // Playwright сам дождется появления плашки woocommerce-error и проверит текст
    await expect(loginPage.errorList).toContainText(EXPECTED_ERROR, { ignoreCase: true });

    console.log(`✓ Негативный тест на пустой пароль успешно пройден! Отображается ошибка: "${EXPECTED_ERROR}"`);
  });

});