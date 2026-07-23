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

  // ГЛОБАЛЬНЫЙ ГЕНЕРАТОР ВНУТРИ PAGE OBJECT 🎯
  getDynamicUser() {
    // Берем таймстамп и добиваем случайными цифрами до 10 знаков
    const timestamp = Date.now().toString(); // обычно 13 знаков
    const randomTail = Math.floor(1000 + Math.random() * 9000).toString(); // еще 4 знака
    const uniqueId = (timestamp + randomTail).slice(0, 10); // Строго 10 символов
    
    // 'u_' (2 символа) + 10 символов = ровно 12 символов!
    const username = `u_${uniqueId}`; 
    const email = `u_${uniqueId}@mail.ru`;

    return {
      username: username,
      email: email,
      password: 'SecurePass123!'
    };
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