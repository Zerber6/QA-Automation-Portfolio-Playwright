import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Регистрация пользователя (Негативный сценарий)', () => {

  test('Показать ошибку при регистрации с пустым именем пользователя', async ({ page }) => {
    const REGISTER_URL = 'https://intershop5.skillbox.ru/register/';
    
    // Генерируем компактный уникальный email по твоей формуле
    const uniqueId = Date.now().toString().slice(-10);
    const dynamicEmail = `u_${uniqueId}@mail.ru`;
    const TEST_PASS = 'SecurePass123!';
    const EXPECTED_ERROR = 'пожалуйста введите корректное имя пользователя';

    const loginPage = new LoginPage(page);

    // 1. Открываем страницу регистрации
    await page.goto(REGISTER_URL);

    // Имя пользователя (regUsernameField) намеренно оставляем пустым

    // 2. Заполняем почту и пароль через локаторы Page Object
    await loginPage.regEmailField.fill(dynamicEmail);
    await loginPage.regPasswordField.fill(TEST_PASS);

    // 3. Нажимаем кнопку «Регистрация»
    await loginPage.registerButton.click();

    // 4. ВЕРИФИКАЦИЯ ОШИБКИ БЭКЕНДА
    // Playwright автоматически дождется появления плашки и сверит текст
    await expect(loginPage.errorList).toContainText(EXPECTED_ERROR, { ignoreCase: true });

    console.log(`✓ Негативный тест пройден! Ошибка валидации имени пользователя подтверждена.`);
  });

});