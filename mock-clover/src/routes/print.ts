import { Router, type Request, type Response } from 'express';
import { store } from '../store';
import type { PrintEventRequest } from '../types';

const router = Router();

// POST /v3/merchants/:mId/print_event - Trigger print
router.post(
  '/v3/merchants/:mId/print_event',
  async (req: Request<{ mId: string }, unknown, PrintEventRequest>, res: Response) => {
    // Check failure mode
    const delay = store.getDelay();
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    const { fail, statusCode } = store.shouldFail('print_event');
    if (fail) {
      res.status(statusCode).json({ message: `Mock failure (${statusCode})` });
      return;
    }

    const body = req.body;

    if (!body.orderRef?.id) {
      res.status(400).json({ message: 'orderRef.id is required' });
      return;
    }

    const order = store.getOrder(body.orderRef.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    store.addPrintEvent(body.orderRef.id);
    console.log(`[Mock Clover] Print event triggered for order ${body.orderRef.id}`);

    res.status(200).json({ status: 'ok' });
  },
);

export default router;
