import { test, expect } from '@playwright/test';
import { CartPage } from './CartPage.js';

test.describe('Добавление нескольких электрогитар в корзину', () => {

  test('Устанавливает количество 100 и проверяет в корзине', async ({ page }) => {
    const PRODUCT_URL = 'https://intershop5.skillbox.ru/product/gibson-les-paul-studio-2018-vintage-sunburst/';
    const EXPECTED_PRODUCT_NAME = 'Gibson Les Paul Studio 2018 Vintage Sunburst';
    const QUANTITY_TO_ADD = '100';
          
    // Инициализируем наш единый CartPage
    const cartPage = new CartPage(page);

    // 1. Открываем карточку товара
    await page.goto(PRODUCT_URL);
    
    // 2. Вводим "3" в инпут на карточке товара (fill сам очистит поле)
    await cartPage.productQuantityInput.fill(QUANTITY_TO_ADD);

    // 3. Кликаем «Добавить в корзину»
    await cartPage.addToCartButton.click();

    // 4. Кликаем по ссылке «Просмотр корзины»
    await cartPage.viewCartLink.click();

    // 5. Проверяем название товара в корзине
    await expect(cartPage.productLink).toContainText(EXPECTED_PRODUCT_NAME, { ignoreCase: true });

    // 6. Проверяем количество товара уже внутри корзины
    await expect(cartPage.cartQuantityInput).toHaveValue(QUANTITY_TO_ADD);
  });

});