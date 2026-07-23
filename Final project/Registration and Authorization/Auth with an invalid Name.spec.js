import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Авторизация пользователя (Невалидный Username)', () => {

  test('Показать ошибку при вводе невалидного имени пользователя', async ({ page }) => {
    const LOGIN_URL = 'https://intershop5.skillbox.ru/my-account/';
    
    // Невалидные тестовые данные для проверки ошибки бэкенда
    const INVALID_USER = '12309';
    const INVALID_PASS = '123';
    const EXPECTED_ERROR = 'Неизвестное имя пользователя';

    const loginPage = new LoginPage(page);

    // 1. Открываем страницу авторизации
    await page.goto(LOGIN_URL);

    // 2. В одну строчку отправляем невалидные данные через Page Object
    await loginPage.login(INVALID_USER, INVALID_PASS);

    // 3. ВЕРИФИКАЦИЯ ОШИБКИ
    // Проверяем, что на странице появилась плашка woocommerce-error с нужным текстом
    await expect(loginPage.errorList).toContainText(EXPECTED_ERROR, { ignoreCase: true });

    console.log(`✓ Негативный тест на Username пройден! Текст ошибки "${EXPECTED_ERROR}" подтвержден.`);
  });

});