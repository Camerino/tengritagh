import { Router, type Request, type Response } from 'express';
import { store } from '../store';
import type {
  CreateOrderRequest,
  BulkLineItemsRequest,
  CloverOrder,
  CloverOrderType,
} from '../types';

const router = Router();

// ---------------------------------------------------------------------------
// Helper: check failure mode and optionally delay
// ---------------------------------------------------------------------------
async function maybeFailOrDelay(res: Response, endpoint?: string): Promise<boolean> {
  const delay = store.getDelay();
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  const { fail, statusCode } = store.shouldFail(endpoint);
  if (fail) {
    res.status(statusCode).json({ message: `Mock failure (${statusCode})` });
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Clover API routes
// ---------------------------------------------------------------------------

// POST /v3/merchants/:mId/orders - Create order
router.post(
  '/v3/merchants/:mId/orders',
  async (req: Request<{ mId: string }, CloverOrder, CreateOrderRequest>, res: Response) => {
    if (await maybeFailOrDelay(res, 'orders')) return;

    const body = req.body;
    const now = Date.now();

    const order: CloverOrder = {
      id: store.generateId(),
      currency: 'USD',
      total: 0,
      title: body.title ?? '',
      note: body.note ?? '',
      state: body.state ?? 'open',
      createdTime: now,
      modifiedTime: now,
    };

    if (body.orderType) {
      order.orderType = {
        id: body.orderType.id,
        label: 'Online Pickup',
      };
    }

    const created = store.createOrder(order);
    console.log(`[Mock Clover] Created order ${created.id}`);
    res.status(200).json(created);
  },
);

// POST /v3/merchants/:mId/orders/:orderId/bulk_line_items - Add line items
router.post(
  '/v3/merchants/:mId/orders/:orderId/bulk_line_items',
  async (req: Request<{ mId: string; orderId: string }>, res: Response) => {
    if (await maybeFailOrDelay(res, 'bulk_line_items')) return;

    const { orderId } = req.params;
    const body = req.body as BulkLineItemsRequest;

    const order = store.getOrder(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    const lineItems = (body.items ?? []).map((item) => ({
      id: '',
      name: item.name,
      price: item.price,
      unitQty: item.unitQty ?? 1,
      note: item.note ?? '',
      createdTime: Date.now(),
      orderRef: { id: orderId },
    }));

    const created = store.addLineItems(orderId, lineItems);
    if (!created) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    console.log(`[Mock Clover] Added ${created.length} line items to order ${orderId}`);
    res.status(200).json({ elements: created });
  },
);

// GET /v3/merchants/:mId/orders/:orderId - Get order
router.get(
  '/v3/merchants/:mId/orders/:orderId',
  (req: Request<{ mId: string; orderId: string }>, res: Response) => {
    const { orderId } = req.params;
    const order = store.getOrder(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.status(200).json(order);
  },
);

// PUT /v3/merchants/:mId/orders/:orderId - Update order
router.put(
  '/v3/merchants/:mId/orders/:orderId',
  (req: Request<{ mId: string; orderId: string }>, res: Response) => {
    const { orderId } = req.params;
    const updates = req.body as Partial<CloverOrder>;

    const updated = store.updateOrder(orderId, updates);
    if (!updated) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    console.log(`[Mock Clover] Updated order ${orderId}, state: ${updated.state}`);
    res.status(200).json(updated);
  },
);

// GET /v3/merchants/:mId/order_types - Get order types
router.get('/v3/merchants/:mId/order_types', (_req: Request, res: Response) => {
  const orderTypes: CloverOrderType[] = [
    {
      id: 'ONLINE_PICKUP',
      label: 'Online Pickup',
      taxable: true,
      isDefault: false,
      isHidden: false,
    },
    {
      id: 'DINE_IN',
      label: 'Dine In',
      taxable: true,
      isDefault: true,
      isHidden: false,
    },
  ];
  res.status(200).json({ elements: orderTypes });
});

// ---------------------------------------------------------------------------
// Admin endpoints (for E2E test verification)
// ---------------------------------------------------------------------------

// GET /__admin/orders — list all received orders
router.get('/__admin/orders', (_req: Request, res: Response) => {
  res.json(store.getAllOrders());
});

// GET /__admin/print_events — list all print events
router.get('/__admin/print_events', (_req: Request, res: Response) => {
  res.json(store.getPrintEvents());
});

// PUT /__admin/fail — toggle failure mode
router.put('/__admin/fail', (req: Request, res: Response) => {
  const { enabled } = req.body as { enabled: boolean };
  store.setAdminConfig({ failMode: enabled });
  res.json({ failMode: enabled });
});

// POST /__admin/config — set advanced failure / delay configuration
router.post('/__admin/config', (req: Request, res: Response) => {
  const config = req.body as Record<string, unknown>;
  store.setAdminConfig({
    failNext: typeof config.failNext === 'number' ? config.failNext : 0,
    statusCode: typeof config.statusCode === 'number' ? config.statusCode : 500,
    failEndpoints: Array.isArray(config.failEndpoints) ? (config.failEndpoints as string[]) : [],
    delayMs: typeof config.delayMs === 'number' ? config.delayMs : 0,
    delayCount: typeof config.delayCount === 'number' ? config.delayCount : 0,
  });
  res.json({ ok: true, config: store.getAdminConfig() });
});

// DELETE /__admin/reset — clear all data
router.delete('/__admin/reset', (_req: Request, res: Response) => {
  store.clear();
  res.json({ ok: true });
});

export default router;
