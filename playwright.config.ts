import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Указываем Playwright искать тесты строго в папке tests
  testDir: 'Final project',
  
  // Время ожидания для каждого отдельного теста (30 секунд)
  timeout: 60000,
  
  // Время ожидания для ассертов вроде expect(page).toHaveURL
  expect: {
    timeout: 10000,
  },

  // Запуск тестов в один поток, чтобы они не перемешивались на экране
  workers: 1,

  // Глобальные настройки для всех браузеров
  use: {
    // Наш базовый URL[cite: 1]
    baseURL: 'https://intershop5.skillbox.ru',
    
    // Включаем ВИДИМЫЙ режим браузера, чтобы ты видел все клики[cite: 1]
    headless: false,
    
    // Сохранять скриншоты только при падении теста
    screenshot: 'only-on-failure',

    // Playwright будет залипать на 1.5 секунды перед КАЖДЫМ действием
    launchOptions: {
      slowMo: 1500, 
    }
  },

  // Оставляем для тестирования ТОЛЬКО обычный Chrome
projects: [
    {
      name: 'chromium', // Твой текущий стандартный Chrome
      use: { 
        ...devices['Desktop Chrome'],
        viewport: null, 
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: 1500 
        }
      },
    },

    // 1. ДОБАВЛЯЕМ BRAVE
    {
      name: 'Brave',
      use: {
        ...devices['Desktop Chrome'], // Базовые настройки берём от Chrome
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          // Укажи здесь РЕАЛЬНЫЙ путь к файлу brave.exe на своём ПК:
          executablePath: '/usr/bin/brave-browser',
          args: ['--start-maximized'],
          slowMo: 1500
        }
      },
    },

{
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: null, 
        deviceScaleFactor: undefined,
        launchOptions: {
          slowMo: 1500, // Чтобы глазки успевали радоваться
          
          // Для Firefox флаг максимизации пишется по-другому!
          args: ['-start-maximized'] // Обрати внимание: тут ОДНО тире, а не два!
        }
      },
    },
  ],
});
