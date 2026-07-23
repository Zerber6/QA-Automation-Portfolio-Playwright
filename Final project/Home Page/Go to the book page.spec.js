import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Переход на страницу с книгами', () => {

  test('Перейти на страницу с книгами после клика по кнопке "Просмотреть"', async ({ page }) => {
    const BOOKS_CATEGORY_PATH = '/product-category/catalog/books/';
    const BASE_URL = 'https://intershop5.skillbox.ru'; // Пока берём из твоего конфига

    // Инициализируем нашу страницу Playwright, передавая объект page
    const homePage = new HomePage(page);

    // 1. Открываем главную страницу
    // Playwright сам по умолчанию ждет состояния 'load' (document.readyState === 'complete')
    await page.goto(BASE_URL);

    // 2 и 3. Скролл и клик по промо-кнопке
    // Метод clickOnBooksPromo() в твоем HomePage уже инкапсулирует авто-скролл и авто-ожидание!
    await homePage.clickOnBooksPromo();

    // 4 и 5. Проверка URL
    // Используем веб-assertion от Playwright. Он умеет автоматически ждать выполнения условия!
    await expect(page).toHaveURL(new RegExp(BOOKS_CATEGORY_PATH, 'i'));
  });

});