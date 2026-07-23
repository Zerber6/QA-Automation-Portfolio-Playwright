import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';

test.describe('Тестирование карусели на Главной странице', () => {

  test('Прокрутка слайдера от индекса -3 до целевого слайда', async ({ page }) => {
    // Твоя любимая константа 
    const TARGET_INDEX = 9; 
    const CLICK_DELAY = 600; // Пауза 0.6 сек, как в Selenium
    const BASE_URL = 'https://intershop5.skillbox.ru';

    const homePage = new HomePage(page);

    // 1. Открываем главную страницу
    await page.goto(BASE_URL);

    // 2. Ждем, пока слайды просто прикрепятся к DOM
    await expect(homePage.slickSlides.first()).toBeAttached();

    // 3. Скроллим к началу слайдера (к индексу -3) через JS
    await homePage.scrollSlideIntoViewJS(-4);
    await page.waitForTimeout(CLICK_DELAY);

    // 4. Кликаем по стрелке "Next" ровно столько раз, сколько нужно от старта
    for (let i = 0; i < TARGET_INDEX; i++) {
      await homePage.jsClickNext(); 
      await page.waitForTimeout(CLICK_DELAY); 
    }

    // 5. Ждем завершения анимации и проверяем класс через JS
    let finalClass = '';
    for (let attempt = 0; attempt < 10; attempt++) {
      finalClass = await homePage.jsGetSlideClass(TARGET_INDEX);
      if (finalClass.includes('slick-active')) {
        break;
      }
      await page.waitForTimeout(200);
    }

    console.log(`Классы целевого слайда: ${finalClass}`);

    // 6. Финальная проверка, что нужный слайд стал активным
    expect(finalClass).toContain('slick-active');
  });

});