import { defineConfig, devices } from '@playwright/test';

// Проверяем, запущен ли код в CI (GitHub Actions)
const isCI = Boolean((globalThis as any).process?.env?.CI);

export default defineConfig({
  testDir: 'Final project',

  // Таймаут на один тест (120 секунд)
  timeout: 120000,

  expect: {
    timeout: 10000,
  },

  workers: 1,

  // Глобальные настройки
  use: {
    baseURL: 'https://intershop5.skillbox.ru',
    headless: isCI ? true : false, // На ПК с окном, в CI — в фоне
    screenshot: 'only-on-failure',
    
    // Таймауты на действия и переходы
    actionTimeout: 15000,
    navigationTimeout: 60000, // Дадим 60 сек на долгие переходы через VPN/CI
    
    // Единый slowMo для всех режимов
    launchOptions: {
      slowMo: 1500,
    }
  },

  projects: [
    // 1. Google Chrome (Chromium)
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: null, 
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['--start-maximized'],
        }
      },
    },

    // 2. Mozilla Firefox
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: null, 
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['-start-maximized']
        }
      },
    },

    // 3. Brave (только локально)
    ...(isCI ? [] : [{
      name: 'Brave',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          executablePath: '/usr/bin/brave-browser',
          args: ['--start-maximized'],
        }
      },
    }]),
  ],
});
