export class CartPage {
  constructor(page) {
    this.page = page;

    // --- ЭЛЕМЕНТЫ КАРТОЧКИ ТОВАРА (перенесено из ProductPage) ---
    // Поле количества на странице самого товара (обычно в блоке .summary)
    this.productQuantityInput = page.locator('.summary div.quantity input.qty');
    // Кнопка «Добавить в корзину»
    this.addToCartButton = page.locator('button.single_add_to_cart_button');
    // Ссылка «Просмотр корзины» в зеленой плашке после добавления
    this.viewCartLink = page.locator('.woocommerce-message a.wc-forward');

    // --- ЭЛЕМЕНТЫ СТРАНИЦЫ КОРЗИНЫ ---
    // Название товара в таблице корзины
    this.productLink = page.locator('td.product-name a');
    // Поле количества товара уже внутри корзины
    this.cartQuantityInput = page.locator('td.product-quantity div.quantity input.qty');

    // Элементы купона и перехода к чекауту
    this.couponInputField = page.locator('#coupon_code');
    this.applyCouponButton = page.locator('button[name="apply_coupon"]');
    this.checkoutButton = page.locator('a.checkout-button');

    // Элементы удаления и восстановления
    this.removeProductButton = page.locator('a.remove');
    this.emptyCartMessage = page.locator('p.cart-empty.woocommerce-info');
    this.restoreProductLink = page.locator('div.woocommerce-message a.restore-item');
  }
}