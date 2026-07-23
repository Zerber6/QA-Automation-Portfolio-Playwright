import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Навигация по вложенному меню на Главной странице', () => {

  test('Успешно перейти в раздел "Книги" через раскрывающееся подменю', async ({ page }) => {
    const BOOKS_CATEGORY_PATH = '/product-category/catalog/books/';
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу
    await page.goto(BASE_URL);

    // 2. Имитируем ховер пользователя: наводим мышь на пункт "Каталог"
    // Наш чистый метод внутри HomePage вызовет встроенный .hover(), который сам проскроллит к меню
    await homePage.hoverOverCatalogMenu();

    // 3 и 4. Кликаем по пункту "Книги"
    // Playwright сам дождется, пока подменю раскроется, станет видимым и кликабельным!
    // Никаких ручных ожиданий CSS-анимаций больше не нужно.
    await homePage.clickOnBooksSubMenu();

    // 5 и 6. Ожидаем смену URL и проверяем его (с игнорированием регистра 'i')
    await expect(page).toHaveURL(new RegExp(BOOKS_CATEGORY_PATH, 'i'));
  });

});