import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';
import { CheckoutPage } from './CheckoutPage.js';

test.describe('Покупка и оформление заказа на сайте (Банковский перевод)', () => {

  test('Успешное оформление заказа при выборе прямого банковского перевода', async ({ page }) => {
    const LOGIN_URL = 'https://intershop5.skillbox.ru/my-account/'; // Ссылка на авторизацию
    const PRODUCT_URL = 'https://intershop5.skillbox.ru/product/gibson-les-paul-studio-2018-vintage-sunburst/';
    const CHECKOUT_URL = 'https://intershop5.skillbox.ru/checkout/';
    const EXPECTED_CONFIRM_TEXT = 'Спасибо! Ваш заказ был получен.';

    // Данные покупателя для биллинга
    const customerAddress = {
      firstName: 'Иван',
      lastName: 'Иванов',
      address: 'Вадильева 6 кв 111',
      city: 'Россия',
      state: 'Российская',
      postcode: '666666',
      phone: '+71253811234'
    };

    // Инициализируем Page Objects
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    // ==========================================
    // 1. АВТОРИЗАЦИЯ
    // ==========================================
    await page.goto(LOGIN_URL);

    await loginPage.usernameField.fill('123256');
    await loginPage.passwordField.fill('1"Gh%3p>Y0(9B6:b');
    await page.locator('#rememberme').click(); // Кликаем чекбокс "Запомнить меня"
    await loginPage.loginButton.click();

    // Ждем успешного перехода в Личный Кабинет
    await expect(page).toHaveURL(/.*\/my-account.*/);

    // ==========================================
    // 2. ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ
    // ==========================================
    await page.goto(PRODUCT_URL);
    await page.locator('button.single_add_to_cart_button').click();
    
    // Ждем зеленую плашку успешного добавления
    await expect(page.locator('.woocommerce-message')).toBeVisible();

    // ==========================================
    // 3. ПЕРЕХОД К ОФОРМЛЕНИЮ И ЗАПОЛНЕНИЕ ПОЛЕЙ ПО PAGE OBJECT
    // ==========================================
    await page.goto(CHECKOUT_URL);

    // Наш метод заполнения адреса с красивыми секундными паузами ⏱️
    await checkoutPage.fillBillingAddress(customerAddress);

    // ==========================================
    // 4. ВЫБОР МЕТОДА ОПЛАТЫ (Прямой банковский перевод)
    // ==========================================
    // Заменяем громоздкий Selenium-ожидатель лоадера на чистое авто-ожидание Playwright.
    // Если на форме висит блок-оверлей, даем ему скрыться перед кликом.
    const woocommerceOverlay = page.locator('.blockOverlay, .blockUI');
    if (await woocommerceOverlay.count() > 0) {
      await expect(woocommerceOverlay).toBeHidden();
    }

    // Выбираем радио-кнопку прямого банковского перевода (bacs)
    const bacsPaymentRadio = page.locator('#payment_method_bacs');
    await bacsPaymentRadio.check();

    // ==========================================
    // 5. РАЗМЕЩЕНИЕ ЗАКАЗА
    // ==========================================
    await checkoutPage.placeOrderButton.click();

    // ==========================================
    // 6. ПРОВЕРКА ПОДТВЕРЖДЕНИЯ ЗАКАЗА
    // ==========================================
    // Ждем финальный блок подтверждения покупки и сверяем текст
    await expect(checkoutPage.orderConfirmationBlock).toContainText(EXPECTED_CONFIRM_TEXT, { ignoreCase: true });

    console.log('✓ Финальный E2E-сценарий с банковским переводом успешно выполнен!');
  });
});