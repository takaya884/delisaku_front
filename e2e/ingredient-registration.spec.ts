import { test, expect } from '@playwright/test';

test.describe('食材登録画面', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#ingredients');
  });

  test('食材登録フォームが表示される', async ({ page }) => {
    // ページタイトルの確認
    await expect(page.locator('.page-title')).toContainText('食材登録');
    
    // フォームの存在確認
    await expect(page.locator('.ingredient-form')).toBeVisible();
  });

  test('必須項目の入力なしでは登録できない', async ({ page }) => {
    // 登録ボタンをクリック
    await page.click('button[type="submit"]');
    
    // エラーメッセージが表示される
    await expect(page.locator('.error-message').first()).toBeVisible();
  });

  test('フォームに入力して登録できる', async ({ page }) => {
    // フォームに入力
    await page.fill('#code', 'ING001');
    await page.fill('#name', 'テスト食材');
    await page.fill('#unit', 'kg');
    await page.fill('#packageQuantity', '10');
    await page.fill('#purchasePrice', '500');
    
    // 登録ボタンをクリック
    await page.click('button[type="submit"]');
    
    // 成功メッセージが表示される
    await expect(page.locator('.success-message')).toBeVisible();
    
    // 登録済みリストに表示される
    await expect(page.locator('.registered-list')).toBeVisible();
    await expect(page.locator('.ing-name')).toContainText('テスト食材');
  });

  test('賞味期限を入力できる', async ({ page }) => {
    const expiryInput = page.locator('#expiryDate');
    await expect(expiryInput).toBeVisible();
    
    // 日付を入力
    await expiryInput.fill('2026-03-15');
    await expect(expiryInput).toHaveValue('2026-03-15');
  });

  test('発注先URLフィールドが存在する', async ({ page }) => {
    // 必須項目を入力
    await page.fill('#code', 'ING001');
    await page.fill('#name', 'テスト食材');
    await page.fill('#unit', 'kg');
    await page.fill('#packageQuantity', '10');
    await page.fill('#purchasePrice', '500');
    
    // URLフィールドが存在することを確認
    const orderUrlField = page.locator('#orderUrl');
    await expect(orderUrlField).toBeVisible();
    
    // 正しいURLを入力できることを確認
    await orderUrlField.fill('https://example.com/order');
    await expect(orderUrlField).toHaveValue('https://example.com/order');
  });

  test('複数の食材を連続で登録できる', async ({ page }) => {
    // 1つ目の食材を登録
    await page.fill('#code', 'ING001');
    await page.fill('#name', '食材1');
    await page.fill('#unit', 'kg');
    await page.fill('#packageQuantity', '10');
    await page.fill('#purchasePrice', '500');
    await page.click('button[type="submit"]');
    
    // 成功メッセージを待つ
    await expect(page.locator('.success-message')).toBeVisible();
    
    // 2つ目の食材を登録
    await page.fill('#code', 'ING002');
    await page.fill('#name', '食材2');
    await page.fill('#unit', '個');
    await page.fill('#packageQuantity', '20');
    await page.fill('#purchasePrice', '300');
    await page.click('button[type="submit"]');
    
    // 登録済みリストに2つの食材が表示される
    await expect(page.locator('.registered-list li')).toHaveCount(2);
  });
});
