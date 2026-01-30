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
