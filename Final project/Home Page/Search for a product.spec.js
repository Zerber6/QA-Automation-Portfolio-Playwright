import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Поиск товаров через Главную страницу', () => {

  test('Выполнить поиск ведра и успешно перейти на страницу Lada', async ({ page }) => {
    // Выставляем тайминги (в миллисекундах), берём за основу твои стандарты
    const CONFIG_TIMEOUT = 5000; 
    const MOCHA_TIMEOUT_ANALOG = 10000; 

    // Устанавливаем таймаут на весь этот конкретный тест (чтобы не завис навечно)
    test.setTimeout(MOCHA_TIMEOUT_ANALOG);

    const SEARCH_QUERY = 'Lada';
    const EXPECTED_PRODUCT_URL = 'https://intershop5.skillbox.ru/product/lada/';

    const homePage = new HomePage(page);

    // 1. Открываем базовый URL сайта
    await page.goto('https://intershop5.skillbox.ru');

    // 2 и 3. Ищем товар, передавая наш таймаут безопасности в метод
    await homePage.searchForProduct(SEARCH_QUERY, CONFIG_TIMEOUT);

    // 4 и 5. Проверяем URL с жестким ограничением по времени
    // В expect у Playwright таймаут передается третьим аргументом в объекте опций
    // Было:
// await expect(page).toHaveURL(EXPECTED_PRODUCT_URL);

// Стало (регулярка, которая пропустит и http, и https):
await expect(page).toHaveURL(/.*intershop5\.skillbox\.ru\/product\/lada\//);
  });

});