import { test, expect } from '@playwright/test';

test.describe('食材一覧画面', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#ingredient-list');
  });

  test('食材一覧画面が表示される', async ({ page }) => {
    // ページタイトルの確認
    await expect(page.locator('.page-title')).toContainText('食材一覧');
    
    // テーブルの存在確認
    await expect(page.locator('.ingredient-table')).toBeVisible();
  });

  test('食材一覧テーブルにデータが表示される', async ({ page }) => {
    // テーブルヘッダーの確認
    await expect(page.locator('th').first()).toContainText('コード');
    
    // データ行が表示されていることを確認
    await expect(page.locator('.ingredient-table tbody tr')).not.toHaveCount(0);
  });

  test('食材名で検索できる', async ({ page }) => {
    // 検索フィールドの確認
    const searchInput = page.locator('#searchName');
    await expect(searchInput).toBeVisible();
    
    // 検索を実行
    await searchInput.fill('トマト');
    
    // 結果が1件になることを確認
    await expect(page.locator('.result-count')).toContainText('1件');
    
    // トマトが表示されていることを確認
    await expect(page.locator('.ingredient-table tbody')).toContainText('トマト');
  });

  test('検索結果が0件の場合メッセージが表示される', async ({ page }) => {
    // 存在しない食材名で検索
    await page.fill('#searchName', '存在しない食材');
    
    // 0件のメッセージが表示される
    await expect(page.locator('.result-count')).toContainText('0件');
    await expect(page.locator('.no-data')).toContainText('該当する食材が見つかりません');
  });
});

test.describe('サイドバーの食材メニュー', () => {
  test('食材メニューがネストされている', async ({ page }) => {
    await page.goto('/');
    
    // 食材メニューグループをクリック
    await page.click('.sidebar-group-header:has-text("食材")');
    
    // 子メニューが表示される
    await expect(page.locator('a[href="#ingredients"]')).toBeVisible();
    await expect(page.locator('a[href="#ingredient-list"]')).toBeVisible();
  });

  test('食材一覧へ遷移できる', async ({ page }) => {
    await page.goto('/');
    
    // 食材メニューを展開
    await page.click('.sidebar-group-header:has-text("食材")');
    
    // 食材一覧リンクをクリック
    await page.click('a[href="#ingredient-list"]');
    
    // 食材一覧画面が表示される
    await expect(page.locator('h2')).toContainText('食材一覧');
  });

  test('サイドバー開閉ボタンの背景色がオレンジ色である', async ({ page }) => {
    await page.goto('/');
    
    // サイドバー開閉ボタンが表示されている
    const toggleButton = page.locator('.sidebar-toggle');
    await expect(toggleButton).toBeVisible();
    
    // 背景色がaccent-color（オレンジ）であることを確認
    const backgroundColor = await toggleButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    // accent-color: #FF7043 = rgb(255, 112, 67)
    expect(backgroundColor).toBe('rgb(255, 112, 67)');
  });
});
