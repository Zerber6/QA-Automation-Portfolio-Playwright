import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Авторизация в личном кабинете через Email', () => {

  test('Выполнить вход с валидным адресом электронной почты', async ({ page }) => {
    const LOGIN_URL = 'https://intershop5.skillbox.ru/my-account/';
    
    // Используем именно Email покупателя, как и положено по сценарию! 📧
    const USER_EMAIL = '6666666@yandex.com'; 
    const USER_PASS = '666666';
    const EXPECTED_NAME = '6666666'; // Имя, которое должно отобразиться в приветствии

    const loginPage = new LoginPage(page);

    // 1. Открываем страницу аккаунта
    await page.goto(LOGIN_URL);

    // 2. Вызываем метод авторизации (передаем именно Email!)
    await loginPage.login(USER_EMAIL, USER_PASS);

    // 3. Ждём, пока бэкенд обработает запрос и обновит URL
    await expect(page).toHaveURL(/.*\/my-account.*/);

    // 4. СТРОГАЯ ВЕРИФИКАЦИЯ
    // Находим элемент strong внутри приветственного текста WooCommerce
    const welcomeUserText = page.locator('.woocommerce-MyAccount-content p strong');
    
    // Проверяем, что бэкенд успешно распознал нас и вывел правильное имя пользователя
    await expect(welcomeUserText).toHaveText(EXPECTED_NAME);

    console.log(`Вход по почте ${USER_EMAIL} подтвержден для пользователя ${EXPECTED_NAME}.`);
  });

});