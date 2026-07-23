import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Авторизация пользователя (Невалидный Email)', () => {

  test('Показать ошибку при вводе невалидных данных', async ({ page }) => {
    const LOGIN_URL = 'https://intershop5.skillbox.ru/my-account/';
    
    // Тестовые данные для негативного сценария
    const INVALID_EMAIL = '1309@gmail.com';
    const INVALID_PASS = '123';
    const EXPECTED_ERROR = 'Неизвестный адрес почты';

    const loginPage = new LoginPage(page);

    // 1. Открываем страницу авторизации
    await page.goto(LOGIN_URL);

    // 2. Используем метод нашего Page Object для ввода невалидных данных
    await loginPage.login(INVALID_EMAIL, INVALID_PASS);

    // 3. ВЕРИФИКАЦИЯ ОШИБКИ
    // Playwright автоматически дождется появления плашки с ошибками 
    // и проверит, что внутри есть нужный текст (регистронезависимо)
    await expect(loginPage.errorList).toContainText(EXPECTED_ERROR, { ignoreCase: true });

    console.log(`✓ Негативный тест успешно пройден! Система выдала правильную ошибку: "${EXPECTED_ERROR}"`);
  });

});