import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import { nanoid } from 'nanoid';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DATABASE_URL ?? './data/tengritagh.db';
const resolvedPath = path.resolve(DB_PATH);

// Ensure data directory exists
const dir = path.dirname(resolvedPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const sqlite = new Database(resolvedPath);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

const db = drizzle(sqlite, { schema });

interface CategorySeed {
  id: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
}

interface MenuItemSeed {
  categoryId: string;
  name: string;
  nameZh: string;
  slug: string;
  description: string;
  price: number; // cents
  isFeatured: number;
  sortOrder: number;
}

const categoryData: CategorySeed[] = [
  {
    id: nanoid(),
    name: 'Laghman',
    slug: 'laghman',
    description: 'Hand-pulled noodle dishes',
    sortOrder: 1,
  },
  {
    id: nanoid(),
    name: 'Polo',
    slug: 'polo',
    description: 'Uyghur pilaf rice dishes',
    sortOrder: 2,
  },
  {
    id: nanoid(),
    name: 'Kebabs',
    slug: 'kebabs',
    description: 'Grilled skewer dishes',
    sortOrder: 3,
  },
  {
    id: nanoid(),
    name: 'Samsa',
    slug: 'samsa',
    description: 'Baked stuffed pastries',
    sortOrder: 4,
  },
  { id: nanoid(), name: 'Nan', slug: 'nan', description: 'Traditional Uyghur bread', sortOrder: 5 },
  {
    id: nanoid(),
    name: 'Soups',
    slug: 'soups',
    description: 'Hearty soups and stews',
    sortOrder: 6,
  },
  {
    id: nanoid(),
    name: 'Drinks',
    slug: 'drinks',
    description: 'Traditional beverages',
    sortOrder: 7,
  },
];

function getCategoryId(slug: string): string {
  const cat = categoryData.find((c) => c.slug === slug);
  if (!cat) throw new Error(`Category not found: ${slug}`);
  return cat.id;
}

const menuItemData: MenuItemSeed[] = [
  // Laghman
  {
    categoryId: getCategoryId('laghman'),
    name: 'Big Plate Chicken Laghman',
    nameZh: '大盘鸡拌面',
    slug: 'big-plate-chicken-laghman',
    description:
      'Hand-pulled noodles with tender chicken, potatoes, and peppers in a rich savory sauce',
    price: 1699,
    isFeatured: 1,
    sortOrder: 1,
  },
  {
    categoryId: getCategoryId('laghman'),
    name: 'Lamb Laghman',
    nameZh: '羊肉拌面',
    slug: 'lamb-laghman',
    description: 'Hand-pulled noodles topped with stir-fried lamb, peppers, and tomatoes',
    price: 1599,
    isFeatured: 0,
    sortOrder: 2,
  },
  {
    categoryId: getCategoryId('laghman'),
    name: 'Beef Laghman',
    nameZh: '牛肉拌面',
    slug: 'beef-laghman',
    description: 'Hand-pulled noodles with stir-fried beef, vegetables, and savory sauce',
    price: 1599,
    isFeatured: 0,
    sortOrder: 3,
  },
  {
    categoryId: getCategoryId('laghman'),
    name: 'Gouyourou Laghman',
    nameZh: '过油肉拌面',
    slug: 'gouyourou-laghman',
    description: 'Hand-pulled noodles with deep-fried lamb slices, peppers, and onions',
    price: 1599,
    isFeatured: 0,
    sortOrder: 4,
  },
  {
    categoryId: getCategoryId('laghman'),
    name: 'Veggie Laghman',
    nameZh: '素菜拌面',
    slug: 'veggie-laghman',
    description: 'Hand-pulled noodles with seasonal stir-fried vegetables',
    price: 1399,
    isFeatured: 0,
    sortOrder: 5,
  },
  {
    categoryId: getCategoryId('laghman'),
    name: 'Suoman',
    nameZh: '炒面',
    slug: 'suoman',
    description: 'Stir-fried hand-pulled noodles with lamb and vegetables',
    price: 1499,
    isFeatured: 0,
    sortOrder: 6,
  },
  // Polo
  {
    categoryId: getCategoryId('polo'),
    name: 'Uyghur Polo',
    nameZh: '手抓饭',
    slug: 'uyghur-polo',
    description: 'Traditional Uyghur pilaf with lamb, carrots, raisins, and chickpeas',
    price: 1499,
    isFeatured: 1,
    sortOrder: 1,
  },
  {
    categoryId: getCategoryId('polo'),
    name: 'Lamb Polo',
    nameZh: '羊肉抓饭',
    slug: 'lamb-polo',
    description: 'Rich pilaf rice cooked with tender lamb shanks and aromatic spices',
    price: 1599,
    isFeatured: 0,
    sortOrder: 2,
  },
  // Kebabs
  {
    categoryId: getCategoryId('kebabs'),
    name: 'Lamb Kebab (2 skewers)',
    nameZh: '烤羊肉串',
    slug: 'lamb-kebab',
    description: 'Two skewers of seasoned lamb, grilled over charcoal with cumin and chili',
    price: 699,
    isFeatured: 0,
    sortOrder: 1,
  },
  {
    categoryId: getCategoryId('kebabs'),
    name: 'Chicken Kebab (2 skewers)',
    nameZh: '烤鸡肉串',
    slug: 'chicken-kebab',
    description: 'Two skewers of marinated chicken, grilled with Uyghur spices',
    price: 599,
    isFeatured: 0,
    sortOrder: 2,
  },
  {
    categoryId: getCategoryId('kebabs'),
    name: 'Beef Kebab (2 skewers)',
    nameZh: '烤牛肉串',
    slug: 'beef-kebab',
    description: 'Two skewers of tender beef, seasoned with cumin and grilled to perfection',
    price: 699,
    isFeatured: 0,
    sortOrder: 3,
  },
  // Samsa
  {
    categoryId: getCategoryId('samsa'),
    name: 'Lamb Samsa',
    nameZh: '烤包子',
    slug: 'lamb-samsa',
    description: 'Flaky baked pastry filled with seasoned lamb, onions, and cumin',
    price: 499,
    isFeatured: 1,
    sortOrder: 1,
  },
  {
    categoryId: getCategoryId('samsa'),
    name: 'Beef Samsa',
    nameZh: '牛肉烤包子',
    slug: 'beef-samsa',
    description: 'Flaky baked pastry filled with seasoned beef and onions',
    price: 499,
    isFeatured: 0,
    sortOrder: 2,
  },
  // Nan
  {
    categoryId: getCategoryId('nan'),
    name: 'Plain Nan',
    nameZh: '馕',
    slug: 'plain-nan',
    description: 'Traditional Uyghur flatbread baked in a tandoor oven',
    price: 399,
    isFeatured: 0,
    sortOrder: 1,
  },
  {
    categoryId: getCategoryId('nan'),
    name: 'Sesame Nan',
    nameZh: '芝麻馕',
    slug: 'sesame-nan',
    description: 'Tandoor-baked flatbread topped with toasted sesame seeds',
    price: 449,
    isFeatured: 0,
    sortOrder: 2,
  },
  // Soups
  {
    categoryId: getCategoryId('soups'),
    name: 'Lamb Soup',
    nameZh: '羊肉汤',
    slug: 'lamb-soup',
    description: 'Hearty lamb broth with tender meat, vegetables, and herbs',
    price: 899,
    isFeatured: 0,
    sortOrder: 1,
  },
  {
    categoryId: getCategoryId('soups'),
    name: 'Gouyourou Soup Noodles',
    nameZh: '过油肉汤面',
    slug: 'gouyourou-soup-noodles',
    description: 'Rich soup with hand-pulled noodles, deep-fried lamb slices, and vegetables',
    price: 1299,
    isFeatured: 0,
    sortOrder: 2,
  },
  // Drinks
  {
    categoryId: getCategoryId('drinks'),
    name: 'Milk Tea',
    nameZh: '奶茶',
    slug: 'milk-tea',
    description: 'Traditional Uyghur salted milk tea with butter',
    price: 349,
    isFeatured: 0,
    sortOrder: 1,
  },
  {
    categoryId: getCategoryId('drinks'),
    name: 'Ayran',
    nameZh: '酸奶',
    slug: 'ayran',
    description: 'Refreshing traditional yogurt drink',
    price: 399,
    isFeatured: 0,
    sortOrder: 2,
  },
];

async function seed() {
  console.log('Seeding database...');

  // Clear existing data
  db.delete(schema.orderStatusEvents).run();
  db.delete(schema.orderItems).run();
  db.delete(schema.orders).run();
  db.delete(schema.menuItems).run();
  db.delete(schema.categories).run();
  db.delete(schema.siteConfig).run();

  // Insert categories
  for (const cat of categoryData) {
    db.insert(schema.categories).values(cat).run();
  }
  console.log(`Inserted ${categoryData.length} categories`);

  // Insert menu items
  for (const item of menuItemData) {
    db.insert(schema.menuItems).values(item).run();
  }
  console.log(`Inserted ${menuItemData.length} menu items`);

  // Insert site config
  const configEntries = [
    { key: 'estimatedWaitMinutes', value: '25' },
    { key: 'storeOpen', value: 'true' },
    { key: 'restaurantName', value: 'Tengri Tagh Uyghur Cuisine' },
    { key: 'restaurantPhone', value: '(555) 123-4567' },
    { key: 'restaurantAddress', value: 'Near Times Square, NYC' },
  ];
  for (const entry of configEntries) {
    db.insert(schema.siteConfig).values(entry).run();
  }
  console.log(`Inserted ${configEntries.length} site config entries`);

  console.log('Seed complete!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
