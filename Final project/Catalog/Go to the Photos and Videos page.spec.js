import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Фото/видео"', () => {

  test('Успешный переход в раздел "Фото/видео" через боковое меню Каталога', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const EXPECTED_PATH = '/catalog/electronics/photo_video/';

    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу каталога
    await page.goto(CATALOG_URL);
    
    // 2 и 3. Находим ссылку "Фото/видео" и кликаем по ней (с авто-ожиданием)
    await catalogPage.clickPhotoVideoCategory();

    // 4 and 5. Ожидаем смену URL и проверяем его (регистронезависимо)
    await expect(page).toHaveURL(new RegExp(EXPECTED_PATH, 'i'));

    // 6. Проверяем, что пункт меню подсветился как активный
    const activeCategory = page.locator('.current-cat');
    await expect(activeCategory).toBeVisible();
  });

});