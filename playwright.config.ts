import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright設定ファイル
 * E2Eテストの設定を定義
 */
export default defineConfig({
  testDir: './e2e',
  /* 各テストの最大実行時間 */
  timeout: 30 * 1000,
  /* テスト全体の期待される最大時間 */
  expect: {
    timeout: 5000,
  },
  /* 並列実行の設定 */
  fullyParallel: true,
  /* CIでは失敗時のリトライを行う */
  retries: process.env.CI ? 2 : 0,
  /* ワーカー数 */
  workers: process.env.CI ? 1 : undefined,
  /* レポーターの設定 */
  reporter: 'html',
  /* 全テスト共通の設定 */
  use: {
    /* ベースURL */
    baseURL: 'http://127.0.0.1:3000',
    /* 失敗時のトレース取得 */
    trace: 'on-first-retry',
    /* スクリーンショットの設定 */
    screenshot: 'only-on-failure',
  },

  /* プロジェクト（ブラウザ）の設定 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* 必要に応じて他のブラウザも追加可能
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],

  /* テスト開始前に開発サーバーを起動 */
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
