import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Регистрация пользователя (Негативный сценарий)', () => {

  test('Показать ошибку при регистрации с уже существующим логином', async ({ page }) => {
    // Входные параметры для теста
    const REGISTER_URL = 'https://intershop5.skillbox.ru/register/';
    const EXISTING_USER = '6666666'; 
    const EXISTING_PASS = '666666';
    const EXISTING_EMAIL = `${EXISTING_USER}@mail.ru`;
    const EXPECTED_ERROR = 'Учетная запись с таким именем пользователя уже зарегистрирована';

    const loginPage = new LoginPage(page);

    // 1. Открываем страницу аккаунта/регистрации
    await page.goto(REGISTER_URL);

    // 2. Заполняем форму РЕГИСТРАЦИИ существующими данными через Page Object
    await loginPage.regUsernameField.fill(EXISTING_USER);
    await loginPage.regEmailField.fill(EXISTING_EMAIL);
    await loginPage.regPasswordField.fill(EXISTING_PASS);

    // 3. Нажимаем кнопку «Регистрация»
    await loginPage.registerButton.click();

    // 4. ВЕРИФИКАЦИЯ ОШИБКИ БЭКЕНДА
    // Playwright автоматически дождется плашки ошибок и сравнит текст
    await expect(loginPage.errorList).toContainText(EXPECTED_ERROR, { ignoreCase: true });
    console.log(`✓ Тест пройден! Система успешно заблокировала дубликат и выдала ошибку: "${EXPECTED_ERROR}"`);
  });

});