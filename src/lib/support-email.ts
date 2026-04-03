/**
 * Send a support ticket email when an order fails to sync with Clover.
 * Currently logs to console — replace with Resend/SendGrid/etc. when ready.
 */

interface FailedOrderDetails {
  orderId: string;
  orderNumber: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: { name: string; quantity: number; priceCents: number }[];
  subtotalCents: number;
  error: string;
  timestamp: string;
}

export async function sendFailedOrderNotification(details: FailedOrderDetails) {
  const supportEmail = process.env.SUPPORT_EMAIL ?? 'support@tengritagh.com';

  const itemsList = details.items
    .map((item) => `  - ${item.name} x${item.quantity} ($${(item.priceCents / 100).toFixed(2)})`)
    .join('\n');

  const emailBody = `
⚠️ FAILED ORDER ALERT — Action Required

Order #${details.orderNumber} failed to reach the POS system.
The customer has been notified to call the restaurant.

Customer: ${details.customerName}
Phone: ${details.customerPhone}
Email: ${details.customerEmail || 'N/A'}
Time: ${details.timestamp}

Items Ordered:
${itemsList}

Subtotal: $${(details.subtotalCents / 100).toFixed(2)}

Error: ${details.error}
Order ID: ${details.orderId}

Please contact the customer or process this order manually.
`.trim();

  // TODO: Replace with actual email service (Resend, SendGrid, etc.)
  // For now, log the email that would be sent
  console.error(`[SUPPORT EMAIL] To: ${supportEmail}`);
  console.error(
    `[SUPPORT EMAIL] Subject: ⚠️ Failed Order #${details.orderNumber} — POS Sync Failed`,
  );
  console.error(`[SUPPORT EMAIL]\n${emailBody}`);

  // When email service is ready, uncomment:
  // await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     from: 'orders@tengritagh.com',
  //     to: supportEmail,
  //     subject: `⚠️ Failed Order #${details.orderNumber} — POS Sync Failed`,
  //     text: emailBody,
  //   }),
  // });
}
