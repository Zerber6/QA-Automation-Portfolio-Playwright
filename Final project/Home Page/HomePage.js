export class HomePage {
  constructor(page) {
    this.page = page;
    
    // 1. Кнопка промо на главной (оставляем как было)
    this.booksPromoButton = this.page
      .locator('div.caption', { hasText: 'Книги' })
      .locator('span.promo-link-btn');

    // 2. Локатор для самого пункта меню "Каталог" (чтобы раскрыть меню)
    // Ищем ссылку со словом "Каталог" внутри главного меню
    this.catalogMenuLink = this.page.locator('.menu-item a', { hasText: 'Каталог' }).first();

    // 3. ТОЧНЫЙ ЛОКАТОР для ссылки "Книги"
    // Используем уникальный ID, который ты нашел в верстке!
    this.booksSubMenuLink = this.page.locator('#menu-item-180 a');

    // НОВЫЙ ЛОКАТОР: Коллекция всех промо-кнопок "Просмотреть" на главной странице
    // В Selenium ты искал их, а потом скроллил. В Playwright мы описываем их как коллекцию кнопок.
    this.promoButtons = this.page.locator('span.promo-link-btn'); 

    // 5. ИСПРАВЛЕННЫЙ НА PLAYWRIGHT ЛОКАТОР КОРЗИНЫ:
    // Мы берем блок главного меню по его классу/id и ищем в нем ссылку с точным текстом "Корзина"
    this.mainCartMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Корзина', exact: true });

    // 6. Локатор для ссылки "Одежда" внутри подменю (из твоего файла!)
    // Используем чистый подход Playwright через контейнер главного меню
    this.clothesSubMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Одежда', exact: true });

    // Ищем строго ссылку с точным текстом "Мой аккаунт" внутри хедера
    this.myAccountMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Мой аккаунт', exact: true });

    // Локатор для ссылки "Электроника" (ищем внутри контейнера главного меню)
    this.electronicsMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Электроника', exact: true });

    // Локатор для финальной ссылки "Телефоны" 
    this.phonesSubMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Телефоны', exact: true });

    // Локатор для финальной ссылки "Фото/видео" во вложенном меню
    this.photoVideoSubMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Фото/видео', exact: true });

    // Локатор для ссылки "Бытовая техника" (ищем внутри контейнера главного меню)
    this.appliancesMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Бытовая техника', exact: true });

    // Локатор для финальной ссылки "Холодильники"
    this.refrigeratorsSubMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Холодильники', exact: true });

    // Локатор для ссылки "Планшеты" во вложенном меню
    this.tabletsSubMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Планшеты', exact: true });

    // Локатор для ссылки "Телевизоры" во вложенном меню
    this.tvsSubMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Телевизоры', exact: true });

    // Локатор для ссылки "Стиральные машины" во вложенном меню
    this.washingMachinesSubMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Стиральные машины', exact: true });

    // Локатор для ссылки "Часы" во вложенном меню
    this.watchesSubMenuLink = this.page.locator('#menu-primary-menu').getByRole('link', { name: 'Часы', exact: true });

    // Оставляем только для того, чтобы убедиться, что карусель отрендерилась
    this.slickSlides = this.page.locator('.slick-slide');

    // Поле ввода поиска (в шапке сайта)
    this.searchField = this.page.locator('.search-field, input[type="search"]').first();

    // Кнопка отправки поисковой формы
    this.searchSubmitButton = this.page.locator('.search-submit, button[type="submit"]').first();
  }

  // МЕТОДЫ ДЛЯ ТЕСТА:

  // Метод для наведения курсора на меню "Каталог"
  async hoverOverCatalogMenu() {
    // Наводим строго на видимую ссылку "Каталог"
    await this.catalogMenuLink.hover();
    // Ждем 500мс, чтобы подменю физически отобразилось на экране
    await this.page.waitForTimeout(500);
  }

  // Метод для клика по категории "Книги" во вложенном меню
  async clickOnBooksSubMenu() {
    // Кликаем по ссылке внутри li#menu-item-180
    await this.booksSubMenuLink.click();
  }

  // Метод для перехода на страницу книг через промо
  async clickOnBooksPromo() {
    await this.booksPromoButton.click();
  }

  // НОВЫЙ МЕТОД: Кликнуть по промо-кнопке по её индексу
  async clickOnPromoButtonByIndex(index) {
    // .nth(index) выбирает нужный элемент из списка (0 - первая, 1 - вторая, 2 - третья)
    // Playwright сам проскроллит к этой кнопке, подождет видимости и кликнет!
    await this.promoButtons.nth(index).click();
  }

  // Клик по корзине в главном меню
  async clickOnMainCartMenu() {
    await this.mainCartMenuLink.click();
  }

  // Кликнуть по "Одежде"
  async clickOnClothesSubMenu() {
    await this.clothesSubMenuLink.click();
  }

  // НОВЫЙ МЕТОД: Клик по ссылке "Мой аккаунт"
  async clickOnMyAccountMenu() {
    // Ждать появления и видимости не нужно — Playwright сделает это на автомате!
    await this.myAccountMenuLink.click();
  }

  // Метод для пошагового раскрытия сложного меню до Телефонов
  async navigateToPhonesMenu() {
  // 1. Наводим мышь на "Каталог", чтобы раскрылось первое меню
  await this.catalogMenuLink.hover();
  await this.page.waitForTimeout(300); // Даем чуть-чуть времени на появление "Электроники"

  // 2. Наводим мышь на "Электроника", чтобы раскрылось подменю следующего уровня
  await this.electronicsMenuLink.hover();
  await this.page.waitForTimeout(300); // Даем время раскрыться "Телефонам"

  // 3. Кликаем по "Телефоны"
  await this.phonesSubMenuLink.click();
  }

  // Метод для пошагового раскрытия меню до раздела Фото/видео
  async navigateToPhotoVideoMenu() {
  // 1. Наводим на "Каталог"
  await this.catalogMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 2. Наводим на "Электроника"
  await this.electronicsMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 3. Кликаем по "Фото/видео"
  await this.photoVideoSubMenuLink.click();
  }

  // Метод для пошагового раскрытия меню до раздела Холодильники
  async navigateToRefrigeratorsMenu() {
  // 1. Наводим на "Каталог"
  await this.catalogMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 2. Наводим на "Бытовая техника"
  await this.appliancesMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 3. Кликаем по "Холодильники"
  await this.refrigeratorsSubMenuLink.click();
  }

  // Метод для пошагового раскрытия меню до раздела Планшеты
  async navigateToTabletsMenu() {
  // 1. Наводим на "Каталог"
  await this.catalogMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 2. Наводим на "Электроника"
  await this.electronicsMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 3. Кликаем по "Планшеты"
  await this.tabletsSubMenuLink.click();
  }

  // Метод для пошагового раскрытия меню до раздела Телевизоры
  async navigateToTVsMenu() {
  // 1. Наводим на "Каталог"
  await this.catalogMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 2. Наводим на "Электроника"
  await this.electronicsMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 3. Кликаем по "Телевизоры"
  await this.tvsSubMenuLink.click();
  }

  // Метод для пошагового раскрытия меню до раздела Стиральные машины
  async navigateToWashingMachinesMenu() {
  // 1. Наводим на "Каталог"
  await this.catalogMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 2. Наводим на "Бытовая техника"
  await this.appliancesMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 3. Кликаем по "Стиральные машины"
  await this.washingMachinesSubMenuLink.click();
  }

  // Метод для пошагового раскрытия меню до раздела Часы
  async navigateToWatchesMenu() {
  // 1. Наводим на "Каталог"
  await this.catalogMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 2. Наводим на "Электроника"
  await this.electronicsMenuLink.hover();
  await this.page.waitForTimeout(300);

  // 3. Кликаем по "Часы"
  await this.watchesSubMenuLink.click();
  }

  // Метод для клика по кнопке "Вперед" на слайдере
// ====== МЕТОДЫ ДЛЯ СЛАЙДЕРА (Добавь их внутрь класса HomePage) ======

// 1. Нативный JS-скролл к стартовому слайду (индекс -3)
async scrollSlideIntoViewJS(index) {
  await this.page.evaluate((idx) => {
    const slide = document.querySelector(`.slick-slide[data-slick-index="${idx}"]`);
    if (slide) slide.scrollIntoView({ block: 'center', inline: 'center' });
  }, index);
}

// 2. Нативный JS-клик по стрелке
async jsClickNext() {
  await this.page.evaluate(() => {
    const nextButton = document.querySelector('button.slick-next') || document.querySelector('a.slick-next');
    if (nextButton) nextButton.click();
  });
}

// 3. ТОТ САМЫЙ МЕТОД, КОТОРОГО НЕ ХВАТАЛО! Получение класса слайда
async jsGetSlideClass(index) {
  return await this.page.evaluate((idx) => {
    const slide = document.querySelector(`.slick-slide[data-slick-index="${idx}"]`);
    return slide ? slide.className : '';
  }, index);
}

// Метод для выполнения поиска товара
async searchForProduct(query) {
  await this.searchField.click();
  await this.searchField.fill(query);
  await this.searchSubmitButton.click();
  }
}