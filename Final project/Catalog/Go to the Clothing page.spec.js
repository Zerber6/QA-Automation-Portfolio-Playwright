import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Одежда"', () => {

  test('Успешный переход в раздел "Одежда" через боковое меню Каталога', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const CLOTHES_PATH = '/catalog/clothes/';      

    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу каталога
    await page.goto(CATALOG_URL);
    
    // 2 и 3. Находим ссылку на "Одежду" и кликаем (с автоматическим ожиданием)
    await catalogPage.clickClothingCategory();

    // 4 и 5. Ожидаем, пока URL изменится, и проверяем его регистронезависимо
    await expect(page).toHaveURL(new RegExp(CLOTHES_PATH, 'i'));

    // 6. Проверяем, что пункт в боковом меню подсветился как активный
    const activeCategory = page.locator('li.cat-item.current-cat');
    await expect(activeCategory).toBeVisible();
  });

});