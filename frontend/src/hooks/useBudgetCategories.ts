export interface Transaction {
  hash: string;
  amount: number;
  memo: string;
  timestamp: number;
}

export type Category = 'Food' | 'Travel' | 'Rent' | 'Shopping' | 'Bills' | 'Other';

export interface CategorizedTransaction extends Transaction {
  category: Category;
}

export interface CategorySummary {
  category: Category;
  total: number;
}

const CATEGORY_REGEX: Record<Category, RegExp[]> = {
  Food: [/food/i, /restaurant/i, /cafe/i, /grocer/i, /coffee/i, /pizza/i, /burger/i],
  Travel: [/uber/i, /lyft/i, /flight/i, /airbnb/i, /hotel/i, /train/i, /bus/i],
  Rent: [/rent/i, /apartment/i, /lease/i],
  Shopping: [/shop/i, /amazon/i, /store/i, /mall/i, /clothes/i],
  Bills: [/bill/i, /electric/i, /water/i, /internet/i, /phone/i, /utility/i],
  Other: [],
};

function categorizeMemo(memo: string): Category {
  for (const [cat, regexes] of Object.entries(CATEGORY_REGEX)) {
    if (regexes.some((re) => re.test(memo))) return cat as Category;
  }
  return 'Other';
}

export function useBudgetCategories(transactions: Transaction[]) {
  const categorized: CategorizedTransaction[] = transactions.map((tx) => ({
    ...tx,
    category: categorizeMemo(tx.memo),
  }));

  const summary: CategorySummary[] = Array.from(
    categorized.reduce((acc, tx) => {
      acc.set(tx.category, (acc.get(tx.category) || 0) + tx.amount);
      return acc;
    }, new Map<Category, number>())
  ).map(([category, total]) => ({ category, total }));

  return { categorized, summary };
} 