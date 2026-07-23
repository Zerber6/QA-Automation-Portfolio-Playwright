export class LoginPage {
  constructor(page) {
    this.page = page;

    // ЛОКАТОРЫ АВТОРИЗАЦИИ
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('button[name="login"]');

    // ЛОКАТОРЫ РЕГИСТРАЦИИ
    this.regUsernameField = page.locator('#reg_username');
    this.regEmailField = page.locator('#reg_email');
    this.regPasswordField = page.locator('#reg_password');
    this.registerButton = page.locator('button[name="register"]');
    this.errorList = page.locator('ul.woocommerce-error');
  }

  // МЕТОДЫ
  async login(user, pass) {
    await this.usernameField.fill(user);
    await this.passwordField.fill(pass);
    await this.loginButton.click();
  }

  async register(email, pass, username = null) {
    if (username) {
      await this.regUsernameField.fill(username);
    }
    await this.regEmailField.fill(email);
    await this.regPasswordField.fill(pass);
    await this.registerButton.click();
  }
}