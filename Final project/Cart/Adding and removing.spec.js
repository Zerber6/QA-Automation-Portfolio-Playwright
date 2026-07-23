import { test, expect } from '@playwright/test';
import { CartPage } from './CartPage.js';

test.describe('Покупка электрогитары и очистка корзины', () => {

  test('Добавляет электрогитару в корзину и удаляет её', async ({ page }) => {
    const PRODUCT_URL = 'https://intershop5.skillbox.ru/product/gibson-les-paul-studio-2018-vintage-sunburst/';
    const EXPECTED_PRODUCT_NAME = 'Gibson Les Paul Studio';
    const EMPTY_CART_TEXT = 'Корзина пуста.';
    const QUANTITY = '7';

    // Инициализируем наш единый Page Object корзины
    const cartPage = new CartPage(page);

    // 1. Открываем карточку товара
    await page.goto(PRODUCT_URL);    

    // 2. Устанавливаем количество товара (7 штук)
    await cartPage.productQuantityInput.fill(QUANTITY);

    // 3. Кликаем «Добавить в корзину»
    await cartPage.addToCartButton.click();
    
    // 4. Переходим в корзину через кнопку в плашке уведомления
    await cartPage.viewCartLink.click();

    // 5. Проверяем название товара в корзине 
    await expect(cartPage.productLink).toContainText(EXPECTED_PRODUCT_NAME, { ignoreCase: true });
    
    // 6. Проверяем количество в корзине 
    await expect(cartPage.cartQuantityInput).toHaveValue(QUANTITY);
    
    // 7. Кликаем на крестик удаления товара
    await cartPage.removeProductButton.click();

    // 8. Ждем и проверяем сообщение о пустой корзине
    await expect(cartPage.emptyCartMessage).toHaveText(EMPTY_CART_TEXT);

    console.log('✓ Тест на полную очистку корзины успешно завершён!');
  });
});