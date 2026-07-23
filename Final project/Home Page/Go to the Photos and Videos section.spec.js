import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Сложная навигация по многоуровневому меню', () => {

  test('Успешно перейти в раздел "Фото/видео" через цепочку меню Каталог -> Электроника', async ({ page }) => {
    const PHOTO_VIDEO_PATH = '/photo_video/';
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу сайта
    await page.goto(BASE_URL);

    // 2 и 3. Проходим по цепочке ховеров и кликаем по пункту "Фото/видео"
    await homePage.navigateToPhotoVideoMenu();

    // 4 и 5. Проверяем, что URL изменился на нужный раздел
    await expect(page).toHaveURL(new RegExp(PHOTO_VIDEO_PATH, 'i'));
  });

});