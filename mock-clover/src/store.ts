import type { CloverOrder, CloverLineItem } from './types';

interface AdminConfig {
  failMode: boolean;
  failNext: number;
  statusCode: number;
  failEndpoints: string[];
  delayMs: number;
  delayCount: number;
  requestCount: number;
}

class InMemoryStore {
  private orders: Map<string, CloverOrder> = new Map();
  private lineItems: Map<string, CloverLineItem[]> = new Map();
  private printEvents: Array<{ orderId: string; timestamp: number }> = [];
  private idCounter = 1000;
  private adminConfig: AdminConfig = {
    failMode: false,
    failNext: 0,
    statusCode: 500,
    failEndpoints: [],
    delayMs: 0,
    delayCount: 0,
    requestCount: 0,
  };

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

  // --- Admin / test helpers ---

  getAllOrders(): Array<CloverOrder & { lineItems: CloverLineItem[] }> {
    const result: Array<CloverOrder & { lineItems: CloverLineItem[] }> = [];
    for (const [orderId, order] of this.orders.entries()) {
      const items = this.lineItems.get(orderId) ?? [];
      result.push({ ...order, lineItems: items });
    }
    return result;
  }

  setAdminConfig(config: Partial<AdminConfig>): void {
    this.adminConfig = { ...this.adminConfig, ...config, requestCount: 0 };
  }

  getAdminConfig(): AdminConfig {
    return { ...this.adminConfig };
  }

  /**
   * Check whether the current request to a given endpoint should fail.
   * Increments the internal request counter.
   */
  shouldFail(endpoint?: string): { fail: boolean; statusCode: number } {
    // Check endpoint-specific failures
    if (
      endpoint &&
      this.adminConfig.failEndpoints.length > 0 &&
      this.adminConfig.failEndpoints.includes(endpoint)
    ) {
      return { fail: true, statusCode: this.adminConfig.statusCode || 500 };
    }

    // Check fail mode
    if (this.adminConfig.failMode) {
      return { fail: true, statusCode: this.adminConfig.statusCode || 500 };
    }

    // Check failNext counter
    if (this.adminConfig.failNext > 0) {
      this.adminConfig.requestCount += 1;
      if (this.adminConfig.requestCount <= this.adminConfig.failNext) {
        return { fail: true, statusCode: this.adminConfig.statusCode || 500 };
      }
    }

    return { fail: false, statusCode: 200 };
  }

  /**
   * Return the delay for this request (if configured).
   */
  getDelay(): number {
    if (this.adminConfig.delayMs > 0 && this.adminConfig.delayCount > 0) {
      this.adminConfig.delayCount -= 1;
      return this.adminConfig.delayMs;
    }
    return 0;
  }

  clear(): void {
    this.orders.clear();
    this.lineItems.clear();
    this.printEvents.length = 0;
    this.adminConfig = {
      failMode: false,
      failNext: 0,
      statusCode: 500,
      failEndpoints: [],
      delayMs: 0,
      delayCount: 0,
      requestCount: 0,
    };
  }
}

export const store = new InMemoryStore();
