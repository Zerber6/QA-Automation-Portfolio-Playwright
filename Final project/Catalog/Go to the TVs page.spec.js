import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Телевизоры"', () => {

  test('Переход на страницу и клик по категории "Телевизоры"', async ({ page }) => {
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const EXPECTED_PATH = '/catalog/electronics/tv/';
    const EXPECTED_CATEGORY_NAME = 'Телевизоры';
      
    const catalogPage = new CatalogPage(page);

    // 1. Открываем страницу каталога
    await page.goto(CATALOG_URL);
    
    // 2. Получаем доступ к локатору ссылки "Телевизоры"
    const tvLink = catalogPage.tvCategoryLink;
        
    // 3. Проверка текста перед кликом (используем toContainText из-за возможного счетчика товаров)
    await expect(tvLink).toContainText(EXPECTED_CATEGORY_NAME, { ignoreCase: true });
    
    // 4. Клик по ссылке через Page Object
    await catalogPage.clickTvCategory();
    
    // 5. Ожидание смены URL и проверка
    await expect(page).toHaveURL(new RegExp(EXPECTED_PATH, 'i'));

    // 6. Проверка активной категории (используем проверенный toContainText)
    const activeCategory = page.locator('.current-cat');
    await expect(activeCategory).toBeVisible();
    await expect(activeCategory).toContainText(EXPECTED_CATEGORY_NAME, { ignoreCase: true });
  });

});