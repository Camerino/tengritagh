import type { CloverOrder, CloverLineItem } from './types';

class InMemoryStore {
  private orders: Map<string, CloverOrder> = new Map();
  private lineItems: Map<string, CloverLineItem[]> = new Map();
  private printEvents: Array<{ orderId: string; timestamp: number }> = [];
  private idCounter = 1000;

  generateId(): string {
    this.idCounter += 1;
    return `MOCK_${this.idCounter}`;
  }

  createOrder(order: CloverOrder): CloverOrder {
    this.orders.set(order.id, order);
    this.lineItems.set(order.id, []);
    return order;
  }

  getOrder(orderId: string): CloverOrder | undefined {
    const order = this.orders.get(orderId);
    if (order) {
      const items = this.lineItems.get(orderId) ?? [];
      return {
        ...order,
        lineItems: { elements: items },
      };
    }
    return undefined;
  }

  updateOrder(orderId: string, updates: Partial<CloverOrder>): CloverOrder | undefined {
    const existing = this.orders.get(orderId);
    if (!existing) return undefined;

    const updated: CloverOrder = {
      ...existing,
      ...updates,
      id: existing.id,
      modifiedTime: Date.now(),
    };
    this.orders.set(orderId, updated);
    return this.getOrder(orderId);
  }

  addLineItems(orderId: string, items: CloverLineItem[]): CloverLineItem[] | undefined {
    const existing = this.lineItems.get(orderId);
    if (!existing) return undefined;

    const newItems = items.map((item) => ({
      ...item,
      id: this.generateId(),
      createdTime: Date.now(),
      orderRef: { id: orderId },
    }));
    existing.push(...newItems);
    this.lineItems.set(orderId, existing);

    // Update order total
    const order = this.orders.get(orderId);
    if (order) {
      const total = existing.reduce((sum, li) => sum + li.price * (li.unitQty ?? 1), 0);
      order.total = total;
      order.modifiedTime = Date.now();
      this.orders.set(orderId, order);
    }

    return newItems;
  }

  addPrintEvent(orderId: string): void {
    this.printEvents.push({ orderId, timestamp: Date.now() });
  }

  getPrintEvents(): Array<{ orderId: string; timestamp: number }> {
    return [...this.printEvents];
  }

  clear(): void {
    this.orders.clear();
    this.lineItems.clear();
    this.printEvents.length = 0;
  }
}

export const store = new InMemoryStore();
