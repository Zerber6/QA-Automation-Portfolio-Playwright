export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // ЛОКАТОРЫ БИЛЛИНГА
    this.firstNameField = page.locator('#billing_first_name');
    this.lastNameField = page.locator('#billing_last_name');
    this.addressField = page.locator('#billing_address_1');
    this.cityField = page.locator('#billing_city');
    this.stateField = page.locator('#billing_state');
    this.postcodeField = page.locator('#billing_postcode');
    this.phoneField = page.locator('#billing_phone');

    // МЕТОДЫ ОПЛАТЫ И ЗАКАЗА
    this.codPaymentRadio = page.locator('#payment_method_cod');
    this.placeOrderButton = page.locator('#place_order');
    this.orderConfirmationBlock = page.locator('.woocommerce-order');
  }

  // МЕТОД ЗАПОЛНЕНИЯ АДРЕСА (С теми самыми паузами!)
  async fillBillingAddress(data) {
    const fields = [
      { locator: this.firstNameField, value: data.firstName },
      { locator: this.lastNameField, value: data.lastName },
      { locator: this.addressField, value: data.address },
      { locator: this.cityField, value: data.city },
      { locator: this.stateField, value: data.state },
      { locator: this.postcodeField, value: data.postcode },
      { locator: this.phoneField, value: data.phone }
    ];

    for (const field of fields) {
      await field.locator.fill(field.value);
      await this.page.waitForTimeout(1000); // Замираем на секунду после каждого поля ⏱️
    }
  }
}