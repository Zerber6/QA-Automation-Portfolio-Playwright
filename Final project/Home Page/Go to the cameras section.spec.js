import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Переход к разделу фотоаппаратов', () => {

  test('Перейти на страницу с фотоаппаратами после клика по третьей кнопке "Просмотреть"', async ({ page }) => {
    const BASE_URL = 'https://intershop5.skillbox.ru';
    const TARGET_BUTTON_INDEX = 2; // Индекс 2 — это третья кнопка в массиве

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу сайта
    await page.goto(BASE_URL);

    // 2, 3 и 4. Скролл и клик по третьей кнопке
    // Наш метод сам выберет элемент с индексом 2, докрутит страницу и нажмет на кнопку
    await homePage.clickOnPromoButtonByIndex(TARGET_BUTTON_INDEX);

    // 5 и 6. Ожидаем изменение URL и проверяем, что попали в нужный раздел
    // Умный веб-ассерт автоматически будет ждать появления 'photo_video' в адресе страницы
    await expect(page).toHaveURL(/photo_video/i);
  });

});