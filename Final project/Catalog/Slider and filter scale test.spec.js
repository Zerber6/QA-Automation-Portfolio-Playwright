import { test, expect } from '@playwright/test';

test.describe('Тест ползунка и шкалы фильтрации цен (7 сценариев)', () => {

  // Набор тестовых данных на 7 шагов
  const testCases = [
    { shiftX: 10, description: 'на 10px' },
    { shiftX: 50, description: 'на 50px' },
    { shiftX: 100, description: 'на 100px' },
    { shiftX: 150, description: 'на 150px' },
    { shiftX: 200, description: 'на 200px' },
    { shiftX: 250, description: 'на 250px' },
    { shiftX: 300, description: 'на 300px' }
  ];

  // Динамически создаем 7 тестов в цикле
  for (const { shiftX, description } of testCases) {
    test(`Сценарий: Фильтрация при сдвиге ползунка ${description}`, async ({ page }) => {
      const CATALOG_URL = 'https://intershop5.skillbox.ru/product-category/catalog/';
      
      // 1. Открываем страницу каталога перед каждым тестом для чистоты эксперимента
      await page.goto(CATALOG_URL);
      
      // Локаторы элементов слайдера
      const sliderHandle = page.locator('.widget_price_filter span.ui-slider-handle:nth-of-type(1)');
      const submitBtn = page.locator('.widget_price_filter button[type="submit"].button');

      // 2. Ждем, пока ползунок станет видимым
      await expect(sliderHandle).toBeVisible();

      // 3. Честное перетаскивание мышкой через координаты (Drag and Drop)
      const box = await sliderHandle.boundingBox();
      if (box) {
        // Вычисляем центр ползунка
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;

        // Имитируем реальное движение мыши
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(startX + shiftX, startY);
        await page.mouse.up();
      } else {
        throw new Error('Не удалось получить координаты ползунка цены');
      }

      // 4. Нажимаем кнопку «Фильтр»
      await submitBtn.click();
      
      // 5. Проверяем, что в URL подставились параметры фильтрации цен бэкендом
      await expect(page).toHaveURL(/.*min_price.*/);
      await expect(page).toHaveURL(/.*max_price.*/);

      // 6. Проверяем, что контейнер с товарами присутствует и виден на странице
      const productsContainer = page.locator('ul.products');
      await expect(productsContainer).toBeVisible();
      
      console.log(`✓ Тест со сдвигом на ${shiftX}px успешно выполнен.`);
    });
  }
});