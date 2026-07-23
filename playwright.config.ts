import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Указываем Playwright искать тесты строго в папке tests
  testDir: 'Final project',
  
  // НАСТРОЙКА РЕПОРТЕРА (Генерирует HTML-отчёт в папку playwright-report)
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  // Время ожидания для каждого отдельного теста (60 секунд)
  timeout: 120000,
  
  // Время ожидания для ассертов вроде expect(page).toHaveURL
  expect: {
    timeout: 10000,
  },

  // Запуск тестов в один поток
  workers: 1,

  // Глобальные настройки для всех браузеров
  use: {
    // Наш базовый URL
    baseURL: 'https://intershop5.skillbox.ru',
    
    headless: true,
    
    // Сохранять скриншоты только при падении теста
    screenshot: 'only-on-failure',

    // Записывать трассировку при первом повторе (полезно для отладки)
    trace: 'on-first-retry',

    // Playwright будет залипать на 1.5 секунды перед КАЖДЫМ действием
    launchOptions: {
      slowMo: 1500, 
    }
  },

  // Оставляем для тестирования браузеры
  projects: [
    {
      name: 'chromium',
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

    {
      name: 'Brave',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
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
          slowMo: 1500,
          args: ['-start-maximized']
        }
      },
    },
  ],
});
