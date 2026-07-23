import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Регистрация пользователя (Негативный сценарий)', () => {

  test('Показать ошибку при регистрации с пустым полем Пароль', async ({ page }) => {
    const REGISTER_URL = 'https://intershop5.skillbox.ru/register/';
    const EXPECTED_ERROR = 'Введите пароль для регистрации';

    const loginPage = new LoginPage(page);
    
    // Генерируем компактные 12-символьные данные (username и email) через наш метод
    const tempUser = loginPage.getDynamicUser(); 

    // 1. Открываем правильную страницу регистрации
    await page.goto(REGISTER_URL);

    // 2. Заполняем имя пользователя и почту через локаторы Page Object
    await loginPage.regUsernameField.fill(tempUser.username);
    await loginPage.regEmailField.fill(tempUser.email);

    // Поле пароля (regPasswordField) намеренно оставляем пустым

    // 3. Нажимаем кнопку «Регистрация»
    await loginPage.registerButton.click();

    // 4. ВЕРИФИКАЦИЯ ОШИБКИ БЭКЕНДА
    // Playwright автоматически подождет появления плашки woocommerce-error и сверит текст
    await expect(loginPage.errorList).toContainText(EXPECTED_ERROR, { ignoreCase: true });

    console.log(`✓ Негативный тест пройден! Система успешно заблокировала регистрацию без пароля для ${tempUser.username}.`);
  });

});