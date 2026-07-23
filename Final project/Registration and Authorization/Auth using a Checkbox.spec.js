import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';

test.describe('Тест "Запомнить меня"', () => {

  test('Сохранить сессию после перезапуска браузера', async ({ browser }) => {
    const LOGIN_URL = 'https://intershop5.skillbox.ru/my-account/';
    const USER_NAME = '6666666'; 
    const USER_PASS = '666666';

    // === ШАГ 1: АВТОРИЗАЦИЯ С ЧЕКБОКСОМ В ПЕРВОМ КОНТЕКСТЕ ===
    // Создаем первый изолированный контекст и страницу в нем
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    const loginPage1 = new LoginPage(page1);

    await page1.goto(LOGIN_URL);

    // Заполняем данные
    await loginPage1.usernameField.fill(USER_NAME);
    await loginPage1.passwordField.fill(USER_PASS);

    // Чекбокс "Запомнить меня" — метод .check() сам проверит, выбран ли он
    const rememberMeCheckbox = page1.locator('input[type="checkbox"][name="rememberme"]');
    await rememberMeCheckbox.check();

    // Нажимаем кнопку войти
    await loginPage1.loginButton.click();

    // Ждем успешного входа
    await expect(page1).toHaveURL(/.*\/my-account.*/);

    // Извлекаем все куки, которые установил сайт для сохранения сессии
    const savedCookies = await context1.cookies();

    // Закрываем первый контекст (симулируем полное закрытие браузера)
    await context1.close();

    // === ШАГ 2: ОТКРЫВАЕМ НОВЫЙ БРАУЗЕР И ПОДКИДЫВАЕМ КУКИ ===
    // Создаем второй, абсолютно чистый контекст
    const context2 = await browser.newContext();
    
    // Вбрасываем куки целиком за один раз! Никаких циклов 🚀
    await context2.addCookies(savedCookies);

    // Открываем новую страницу во втором контексте
    const page2 = await context2.newPage();
    await page2.goto(LOGIN_URL);

    // === ШАГ 3: ЖЕСТКАЯ ВЕРИФИКАЦИЯ СЕССИИ ===
    // 1. Проверяем, что кнопка "Выйти" видна на странице (значит, мы авторизованы)
    const logoutBtn = page2.locator('.woocommerce-MyAccount-navigation-link--customer-logout a');
    await expect(logoutBtn).toBeVisible();

    // 2. Дополнительная проверка от профессора: проверяем, что зашли именно под нашим юзером!
    const welcomeUserText = page2.locator('.woocommerce-MyAccount-content p strong');
    await expect(welcomeUserText).toHaveText(USER_NAME);

    // Закрываем второй контекст в конце теста
    await context2.close();

    console.log('✓ Тест "Запомнить меня" успешно пройден! Сессия восстановилась из кук.');
  });

});