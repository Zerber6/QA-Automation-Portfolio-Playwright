import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Регистрация пользователя (Позитивный сценарий)', () => {

  test('Успешная регистрация нового аккаунта с правильной длиной логина', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Вызываем генератор прямо из Page Object! 🎯
    const newUser = loginPage.getDynamicUser(); 

    // Открываем правильную страницу регистрации
    await page.goto('https://intershop5.skillbox.ru/register/');

    // Заполняем форму через локаторы Page Object
    await loginPage.regUsernameField.fill(newUser.username);
    await loginPage.regEmailField.fill(newUser.email);
    await loginPage.regPasswordField.fill(newUser.password);

    // Отправляем форму
    await loginPage.registerButton.click();

    // Верификация
    const successContainer = page.locator('.content-page, .woocommerce-message');
    await expect(successContainer).toContainText('Регистрация завершена', { ignoreCase: true });

    console.log(`✓ Тест пройден! Юзер успешно создан. Длина логина: ${newUser.username.length} символов.`);
  });

});