import { defineConfig, devices } from '@playwright/test';

// Проверяем, запущен ли код в CI (GitHub Actions), с обходом строгих типов TypeScript
const isCI = Boolean((globalThis as any).process?.env?.CI);

export default defineConfig({
  // Папка с тестами
  testDir: 'Final project',

  // Таймаут на один тест (120 секунд для медленной сети в CI)
  timeout: 120000,

  // Таймаут для ассертов expect(...)
  expect: {
    timeout: 10000,
  },

  // Запуск тестов в один поток
  workers: 1,

  // Глобальные настройки браузеров
  use: {
    baseURL: 'https://intershop5.skillbox.ru',
    headless: true, // Фоновый режим для скорости
    screenshot: 'only-on-failure', // Скриншот только при ошибке
    
    // Задержка между шагами: 1.5 сек локально, 0 сек в CI
    launchOptions: {
      slowMo: isCI ? 0 : 1500,
    }
  },

  // Проекты браузеров для запуска
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
          slowMo: isCI ? 0 : 1500
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
          slowMo: isCI ? 0 : 1500,
          args: ['-start-maximized'] // Флаг окна для Firefox
        }
      },
    },

    // 3. Brave (включается ТОЛЬКО на локальном ПК, пропускается в CI)
    ...(isCI ? [] : [{
      name: 'Brave',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          executablePath: '/usr/bin/brave-browser', // Локальный путь к Brave в Linux
          args: ['--start-maximized'],
          slowMo: 1500
        }
      },
    }]),
  ],
});
