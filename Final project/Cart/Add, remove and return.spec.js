import { test, expect } from '@playwright/test';
import { CartPage } from './CartPage.js';

test.describe('Тестирование удаления и восстановления товара в корзине', () => {

  test('Успешное удаление гитар и их последующий возврат в корзину', async ({ page }) => {
    const PRODUCT_URL = 'https://intershop5.skillbox.ru/product/gibson-les-paul-studio-2018-vintage-sunburst/';
    const EXPECTED_PRODUCT_NAME = 'Gibson Les Paul Studio';
    const EMPTY_CART_TEXT = 'Корзина пуста.';
    const QUANTITY = '7';

    const cartPage = new CartPage(page);

    // 1. Открываем карточку товара
    await page.goto(PRODUCT_URL);
    
    // 2. Устанавливаем количество 7
    await cartPage.productQuantityInput.fill(QUANTITY);
    
    // 3. Кликаем «Добавить в корзину»
    await cartPage.addToCartButton.click();
    
    // 4. Переходим в корзину через появившуюся ссылку
    await cartPage.viewCartLink.click();
    
    // 5. Проверяем имя товара в корзине 
    await expect(cartPage.productLink).toContainText(EXPECTED_PRODUCT_NAME, { ignoreCase: true });
    
    // 6. Проверяем количество перед удалением
    await expect(cartPage.cartQuantityInput).toHaveValue(QUANTITY);
    
    // 7. Кликаем по крестику удаления товара
    await cartPage.removeProductButton.click();

    // 8. Ждем и проверяем уведомление о том, что корзина пуста
    // toHaveText автоматически дождется, пока текст в элементе обновится
    await expect(cartPage.emptyCartMessage).toHaveText(EMPTY_CART_TEXT);
    
    // 9. Кликаем по ссылке «Вернуть?» (восстанавливаем товар)
    await cartPage.restoreProductLink.click();

    // 10. Проверяем, что товар снова успешно восстановился в таблице корзины
    await expect(cartPage.productLink).toContainText(EXPECTED_PRODUCT_NAME, { ignoreCase: true });
    
    // 11. Финальная проверка, что количество тоже вернулось обратно к 7
    await expect(cartPage.cartQuantityInput).toHaveValue(QUANTITY);
    
    console.log('✓ Сценарий удаления и восстановления успешно выполнен!');
  });

});