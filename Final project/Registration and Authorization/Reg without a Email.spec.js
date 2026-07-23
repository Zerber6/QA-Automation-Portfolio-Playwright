import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Регистрация пользователя (Негативный сценарий)', () => {

  test('Показать ошибку при регистрации с пустым полем Email', async ({ page }) => {
    const REGISTER_URL = 'https://intershop5.skillbox.ru/register/';
    
    // Генерируем уникальный компактный логин строго по твоей формуле (12 символов)! 🎯
    const uniqueId = Date.now().toString().slice(-10);
    const dynamicUsername = `u_${uniqueId}`;
    const TEST_PASS = 'SecurePass123!';

    const loginPage = new LoginPage(page);

    // 1. Открываем правильную страницу регистрации
    await page.goto(REGISTER_URL);

    // 2. Заполняем имя пользователя и пароль через локаторы Page Object
    await loginPage.regUsernameField.fill(dynamicUsername);
    await loginPage.regPasswordField.fill(TEST_PASS);

    // Поле Email намеренно оставляем пустым, как и требует сценарий

    // 3. Нажимаем кнопку «Регистрация»
    await loginPage.registerButton.click();

    // 4. ВЕРИФИКАЦИЯ ОШИБКИ БЭКЕНДА
    // Playwright сам дождется появления плашки ошибок и проверит текст сообщения
    await expect(loginPage.errorList).toContainText('введите корректный email', { ignoreCase: true });

    console.log(`✓ Негативный тест пройден! Система заблокировала регистрацию без почты для ${dynamicUsername}.`);
  });

});