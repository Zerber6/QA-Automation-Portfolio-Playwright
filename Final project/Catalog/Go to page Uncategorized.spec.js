import { test, expect } from '@playwright/test';
import { CatalogPage } from './CatalogPage.js';

test.describe('Переход на страницу "Без категории"', () => {

  test('Успешный переход в раздел "Без категории" через боковое меню Каталога', async ({ page }) => {
    // Используем базовый URL из настроек (или собираем полный, как в Selenium)
    const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
    const UNCATEGORIZED_PATH = '/product-category/uncategorized/';

    // Инициализируем нашу страницу каталога (её мы перепишем под Playwright на следующем шаге)
    const catalogPage = new CatalogPage(page);

    // 1. Переходим сразу на страницу каталога
    await page.goto(CATALOG_URL);
    
    // 2 и 3. Кликаем по ссылке (в Playwright не нужно отдельно искать элемент, ждать его видимости и кликать — это делается одной командой!)
    await catalogPage.clickUncategorizedCategory();

    // 4 и 5. Ожидаем смены URL и проверяем его (встроенный expect в Playwright сам делает ассерты и ждёт выполнения условия)
    await expect(page).toHaveURL(new RegExp(UNCATEGORIZED_PATH, 'i')); 
  });

});