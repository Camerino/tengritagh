import { Router, type Request, type Response } from 'express';
import { store } from '../store';
import type {
  CreateOrderRequest,
  BulkLineItemsRequest,
  CloverOrder,
  CloverOrderType,
} from '../types';

const router = Router();

// POST /v3/merchants/:mId/orders - Create order
router.post(
  '/v3/merchants/:mId/orders',
  (req: Request<{ mId: string }, CloverOrder, CreateOrderRequest>, res: Response) => {
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
  (req: Request<{ mId: string; orderId: string }>, res: Response) => {
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

export default router;
