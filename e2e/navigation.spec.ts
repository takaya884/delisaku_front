import { test, expect } from '@playwright/test';

test.describe('ナビゲーション', () => {
  test('初期表示は在庫管理ページ', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h2')).toContainText('在庫');
  });

  test('サイドバーから食材登録画面に遷移', async ({ page }) => {
    await page.goto('/');
    
    // サイドバーの食材登録リンクをクリック
    await page.click('a[href="#ingredients"]');
    
    // 食材登録画面が表示されることを確認
    await expect(page.locator('h2')).toContainText('食材登録');
  });

  test('サイドバーからレシピ画面に遷移', async ({ page }) => {
    await page.goto('/');
    
    // サイドバーのレシピリンクをクリック
    await page.click('a[href="#recipes"]');
    
    // レシピ画面が表示されることを確認
    await expect(page.locator('h2')).toContainText('レシピ');
  });

  test('サイドバーの開閉が動作する', async ({ page }) => {
    await page.goto('/');
    
    // サイドバー開閉ボタンをクリック
    const toggleButton = page.locator('.sidebar-toggle');
    await expect(toggleButton).toBeVisible();
    
    // 閉じる
    await toggleButton.click();
    await expect(page.locator('.sidebar.closed')).toBeVisible();
    
    // 開く
    await toggleButton.click();
    await expect(page.locator('.sidebar.open')).toBeVisible();
  });
});

test.describe('ヘッダー', () => {
  test('ヘッダーが表示される', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('.layout-header-title')).toContainText('Delisaku');
  });
});
