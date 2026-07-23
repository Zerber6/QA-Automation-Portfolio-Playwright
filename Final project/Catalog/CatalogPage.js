export class CatalogPage {
  constructor(page) {
    this.page = page;

    // Контейнер бокового меню категорий, чтобы искать строго внутри него
    this.sidebarMenu = this.page.locator('.widget_product_categories, .product-categories');

    // 1. Ссылка на категорию "Без категории"
    this.uncategorizedCategoryLink = this.sidebarMenu.locator('a[href*="/uncategorized/"]'); 

    // 2. Ссылка на категорию "Книги"
    this.booksCategoryLink = this.sidebarMenu.locator('a[href*="/catalog/books/"]');

    // 3. Ссылка на сам корень "Каталог"
    this.rootCatalogLink = this.page.locator('.current-cat > a');

    // ОСТАЛЬНЫЕ ЛОКАТОРЫ: Переписаны на гибкий поиск по роли и тексту внутри бокового меню
    this.clothingCategoryLink = this.sidebarMenu.getByRole('link', { name: 'Одежда', exact: true });
    this.electronicsCategoryLink = this.sidebarMenu.getByRole('link', { name: 'Электроника', exact: true });
    this.appliancesCategoryLink = this.sidebarMenu.getByRole('link', { name: 'Бытовая техника', exact: true });
    this.phonesCategoryLink = this.sidebarMenu.getByRole('link', { name: 'Телефоны', exact: true });
    this.photoVideoCategoryLink = this.sidebarMenu.getByRole('link', { name: 'Фото/видео', exact: true });
    this.refrigeratorsCategoryLink = this.sidebarMenu.getByRole('link', { name: 'Холодильники', exact: true });
    this.tabletsCategoryLink = this.sidebarMenu.getByRole('link', { name: 'Планшеты', exact: true });
    this.tvCategoryLink = this.sidebarMenu.getByRole('link', { name: 'Телевизоры', exact: true });
    this.washingMachinesCategoryLink = this.sidebarMenu.getByRole('link', { name: 'Стиральные машины', exact: true });
    this.watchesCategoryLink = this.sidebarMenu.getByRole('link', { name: 'Часы', exact: true });
    // Локаторы сортировки
    this.sortDropdown = page.locator('select.orderby');
  }

  // МЕТОДЫ ДЛЯ ВЗАИМОДЕЙСТВИЯ (Playwright сам ждет видимости и кликабельности):

  // Тот самый метод, который вызывается в твоем новом тесте!
  async clickUncategorizedCategory() {
    await this.uncategorizedCategoryLink.click();
  }

  async clickBooksCategory() {
    await this.booksCategoryLink.click();
  }

  async clickRootCatalog() {
    await this.rootCatalogLink.click();
  }

  async clickClothingCategory() {
    await this.clothingCategoryLink.click();
  }

  async clickElectronicsCategory() {
    await this.electronicsCategoryLink.click();
  }

  async clickAppliancesCategory() {
    await this.appliancesCategoryLink.click();
  }

  async clickPhonesCategory() {
    await this.phonesCategoryLink.click();
  }

  async clickPhotoVideoCategory() {
    await this.photoVideoCategoryLink.click();
  }

  async clickRefrigeratorsCategory() {
    await this.refrigeratorsCategoryLink.click();
  }

  async clickTabletsCategory() {
    await this.tabletsCategoryLink.click();
  }

  async clickTvCategory() {
    await this.tvCategoryLink.click();
  }

  async clickWashingMachinesCategory() {
    await this.washingMachinesCategoryLink.click();
  }

  async clickWatchesCategory() {
    await this.watchesCategoryLink.click();
  }

  // Методы Сортировки

  async selectSortByValue(value) {
  // Передаем сюда 'date', и Playwright сам найдет option с таким value и выберет его
  await this.sortDropdown.selectOption(value);
  }
}