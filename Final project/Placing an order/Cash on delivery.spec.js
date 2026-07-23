import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';
import { CheckoutPage } from './CheckoutPage.js';

test.describe('Покупка и оформление заказа на сайте', () => {

  test('Успешное оформление заказа при выборе Оплата при доставке', async ({ page }) => {
    // URL-адреса страниц
    const LOGIN_URL = 'https://intershop5.skillbox.ru/my-account/'; // Замени на актуальный config.loginUrl, если отличается
    const PRODUCT_URL = 'https://intershop5.skillbox.ru/product/gibson-les-paul-studio-2018-vintage-sunburst/';
    const CHECKOUT_URL = 'https://intershop5.skillbox.ru/checkout/';
    const EXPECTED_CONFIRM_TEXT = 'Спасибо! Ваш заказ был получен.';

    // Данные покупателя для заполнения биллинга
    const customerAddress = {
      firstName: 'Иван',
      lastName: 'Иванов',
      address: 'Вадильева 6 кв 111',
      city: 'Россия',
      state: 'Российская',
      postcode: '666666',
      phone: '+71253811234'
    };

    // Инициализируем наши Page Objects
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    // ==========================================
    // 1. АВТОРИЗАЦИЯ
    // ==========================================
    await page.goto(LOGIN_URL);
    
    // Заполняем логин и пароль
    await loginPage.usernameField.fill('123256');
    await loginPage.passwordField.fill('1"Gh%3p>Y0(9B6:b');

    // Кликаем по чекбоксу «Запомнить меня»
    await page.locator('#rememberme').click();

    // Нажимаем кнопку Войти
    await loginPage.loginButton.click();
    
    // Ждём, пока бэкенд отработает авторизацию и перенаправит в личный кабинет
    await expect(page).toHaveURL(/.*\/my-account.*/);

    // ==========================================
    // 2. ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ
    // ==========================================
    await page.goto(PRODUCT_URL);
    
    // Кликаем по кнопке добавления товара
    const addToCartBtn = page.locator('button.single_add_to_cart_button');
    await addToCartBtn.click();
    
    // Проверяем появление зеленой плашки WooCommerce, сигнализирующей об успешном добавлении
    await expect(page.locator('.woocommerce-message')).toBeVisible();

    // ==========================================
    // 3. ПЕРЕХОД К ОФОРМЛЕНИЮ И ЗАПОЛНЕНИЕ ПОЛЕЙ ПО PAGE OBJECT
    // ==========================================
    await page.goto(CHECKOUT_URL);
    
    // Вызываем наш метод с красивыми секундными паузами между полями
    await checkoutPage.fillBillingAddress(customerAddress);
    
    // ==========================================
    // 4. ВЫБОР МЕТОДА ОПЛАТЫ
    // ==========================================
    // Метод .check() гарантирует, что радио-кнопка будет выбрана (если не была выбрана ранее)
    await checkoutPage.codPaymentRadio.check();
    
    // ==========================================
    // 5. РАЗМЕЩЕНИЕ ЗАКАЗА
    // ==========================================
    await checkoutPage.placeOrderButton.click();
    
    // ==========================================
    // 6. ПРОВЕРКА ПОДТВЕРЖДЕНИЯ ЗАКАЗА
    // ==========================================
    // Автоматически дожидаемся появления финального блока и проверяем текст подтверждения покупки
    await expect(checkoutPage.orderConfirmationBlock).toContainText(EXPECTED_CONFIRM_TEXT, { ignoreCase: true });
    
    console.log('✓ Ура! Глобальный пользовательский сценарий E2E успешно выполнен на ура!');
  });
});