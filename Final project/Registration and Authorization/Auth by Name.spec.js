import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Авторизация по имени пользователя', () => {

  test('Успешный вход по валидному логину', async ({ page }) => {
    const LOGIN_URL = 'https://intershop5.skillbox.ru/my-account/';
    
    // Стабильные тестовые данные для проверки логина
    const USER_NAME = '6666666'; 
    const USER_PASS = '666666';

    const loginPage = new LoginPage(page);

    // 1. Открываем страницу авторизации
    await page.goto(LOGIN_URL);

    // 2. Используем готовый метод нашего Page Object (передаем Username и Password)
    await loginPage.login(USER_NAME, USER_PASS);

    // 3. Ждем, пока бэкенд обработает вход и обновит URL
    await expect(page).toHaveURL(/.*\/my-account.*/);

    // 4. СТРОГАЯ ВЕРИФИКАЦИЯ ОТ ПРОФЕССОРА 🔬
    // Вытаскиваем элемент strong, где WooCommerce пишет имя текущего юзера
    const welcomeUserText = page.locator('.woocommerce-MyAccount-content p strong');
    
    // Убеждаемся, что мы зашли именно под логином '6666666'
    await expect(welcomeUserText).toHaveText(USER_NAME);

    console.log(`✓ Тест "AuthByUsername" успешно пройден! Вход по логину ${USER_NAME} подтвержден.`);
  });

});