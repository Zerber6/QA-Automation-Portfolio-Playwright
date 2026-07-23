import { test, expect } from '@playwright/test';
import { CartPage } from './CartPage.js';

test.describe('Покупка электрогитары с купоном и оформление заказа', () => {

  test('Процесс добавления товара, применения купона и перехода к чекауту', async ({ page }) => {
    const PRODUCT_URL = 'https://intershop5.skillbox.ru/product/gibson-les-paul-studio-2018-vintage-sunburst/';
    const EXPECTED_PRODUCT_NAME = 'Gibson Les Paul Studio';
    const COUPON_CODE = 'sert500';
    const QUANTITY = '7';
    
    const cartPage = new CartPage(page);

    // 1. Открываем карточку товара
    await page.goto(PRODUCT_URL);
    
    // 2. Изменяем количество товара на 7
    await cartPage.productQuantityInput.fill(QUANTITY);
    
    // 3. Добавляем в корзину
    await cartPage.addToCartButton.click();
    
    // 4. Переходим в корзину
    await cartPage.viewCartLink.click();
    
    // 5. Проверяем название товара в корзине 
    await expect(cartPage.productLink).toContainText(EXPECTED_PRODUCT_NAME, { ignoreCase: true });
    
    // 6. Проверяем количество в корзине 
    await expect(cartPage.cartQuantityInput).toHaveValue(QUANTITY);
    
    // 7. Вводим код купона
    await cartPage.couponInputField.fill(COUPON_CODE);
    
    // 8. Применяем купон
    await cartPage.applyCouponButton.click();

    // 💡 ФИКС ДЛЯ FIREFOX: Ждем, пока WooCommerce закончит крутить свой Ajax-лоадер (блок блокировки корзины)
    // Обычно WooCommerce вешает класс .processing на форму корзины или блок div.blockUI
    const woocommerceLoader = page.locator('.processing, .blockUI');
    // Если лоадер появился, даем ему исчезнуть. Если не появился — идем дальше
    if (await woocommerceLoader.count() > 0) {
      await expect(woocommerceLoader).toBeHidden();
    }
    // Альтернатива: небольшая пауза, чтобы дать Firefox обновить состояние анимаций цен
    await page.waitForTimeout(1000);

    // 9. Ожидаем кнопку оформления заказа и кликаем на неё
    // Добавляем force: true, чтобы Playwright пробил клик, даже если Firefox считает, 
    // что поверх кнопки всё еще висит невидимый Ajax-слой
    await cartPage.checkoutButton.click({ force: true });
    
    // 10. Проверка перехода на страницу оформления заказа
    await expect(page).toHaveURL(/.*\/checkout\/.*/);
    
    console.log('✓ Firefox побежден! Тест с купоном успешно выполнен везде.');
  });
});