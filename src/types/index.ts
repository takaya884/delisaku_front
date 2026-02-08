export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  lastUpdated: string;
  expiryDate?: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  servings: number;
  prepTime: number; // minutes
  cookTime: number; // minutes
  ingredients: RecipeIngredient[];
  instructions: string[];
  imageUrl?: string;
}

export interface RecipeIngredient {
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
}

/**
 * 食材マスタ
 * 食材登録画面で管理する食材情報
 */
export interface Ingredient {
  id: string;
  /** 食材コード */
  code: string;
  /** 食材名 */
  name: string;
  /** 単位 */
  unit: string;
  /** 入数 */
  packageQuantity: number;
  /** 仕入価格 */
  purchasePrice: number;
  /** 賞味期限 */
  expiryDate?: string;
  /** 商品画像URL */
  imageUrl?: string;
  /** 発注先URL */
  orderUrl?: string;
}

/**
 * 売上チャネルカテゴリー
 */
export type SalesChannelCategory = 
  | 'in-store'          // 店内販売
  | 'payment'           // 決済手段別
  | 'online-delivery'   // オンライン・デリバリー
  | 'reservation'       // 予約・事前決済
  | 'subscription'      // サブスク・定期購入
  | 'b2b'              // 法人・特殊販売
  | 'other';           // その他

/**
 * データ取得方法
 */
export type DataRetrievalMethod =
  | 'api'              // API連携
  | 'csv-import'       // CSV取り込み
  | 'manual'           // 手動入力
  | 'webhook'          // Webhook受信
  | 'rpa'              // RPA自動取得
  | 'email-parsing'    // メール解析
  | 'cloud-sync';      // クラウド同期

/**
 * 売上チャネル定義
 */
export interface SalesChannel {
  id: string;
  name: string;
  category: SalesChannelCategory;
  description: string;
  retrievalMethod: DataRetrievalMethod;
  apiEndpoint?: string;
  apiDocUrl?: string;
  notes?: string;
  icon: string;
}

/**
 * 日次売上データ
 */
export interface DailySalesData {
  id: string;
  channelId: string;
  channelName: string;
  date: string;
  totalSales: number;
  transactionCount: number;
  averageTransaction: number;
  lastUpdated: string;
  status: 'success' | 'pending' | 'error';
}
