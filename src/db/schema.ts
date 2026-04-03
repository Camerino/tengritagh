import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const categories = sqliteTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  sortOrder: integer('sort_order').notNull().default(0),
  imageUrl: text('image_url'),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const menuItems = sqliteTable('menu_items', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id),
  name: text('name').notNull(),
  nameZh: text('name_zh'),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  price: integer('price').notNull(), // cents
  imageUrl: text('image_url'),
  isAvailable: integer('is_available').notNull().default(1),
  isFeatured: integer('is_featured').notNull().default(0),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const orders = sqliteTable('orders', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  orderNumber: integer('order_number').notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerEmail: text('customer_email'),
  pickupTime: text('pickup_time').notNull(),
  kitchenNote: text('kitchen_note'),
  status: text('status').notNull().default('received'),
  subtotalCents: integer('subtotal_cents').notNull(),
  cloverOrderId: text('clover_order_id'),
  cloverSyncStatus: text('clover_sync_status').notNull().default('pending'),
  idempotencyKey: text('idempotency_key').unique(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const orderItems = sqliteTable('order_items', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id),
  menuItemId: text('menu_item_id')
    .notNull()
    .references(() => menuItems.id),
  name: text('name').notNull(),
  priceCents: integer('price_cents').notNull(),
  quantity: integer('quantity').notNull().default(1),
  specialInstructions: text('special_instructions'),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const orderStatusEvents = sqliteTable('order_status_events', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id),
  status: text('status').notNull(),
  source: text('source').notNull(), // "web" | "clover" | "staff"
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const siteConfig = sqliteTable('site_config', {
  key: text('key').primaryKey(),
  value: text('value'),
});
