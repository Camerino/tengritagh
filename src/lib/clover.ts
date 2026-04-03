/**
 * Clover REST API client module.
 *
 * Communicates with the Clover POS system (real or mock) to create orders,
 * add line items, trigger prints, and poll order status.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CloverConfig {
  baseUrl: string;
  merchantId: string;
  apiToken: string;
}

export interface CloverOrderResponse {
  id: string;
  currency: string;
  total: number;
  title?: string;
  note?: string;
  state: string;
  createdTime: number;
  modifiedTime: number;
  lineItems?: { elements: CloverLineItemResponse[] };
}

export interface CloverLineItemResponse {
  id: string;
  name: string;
  price: number;
  unitQty?: number;
  note?: string;
  createdTime: number;
  orderRef: { id: string };
}

export interface CreateCloverOrderData {
  title: string;
  note: string;
  state: string;
}

export interface CloverLineItemInput {
  name: string;
  price: number; // cents
  unitQty: number;
  note?: string;
}

export class CloverApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly responseBody: string,
  ) {
    super(message);
    this.name = 'CloverApiError';
  }

  /** Client errors (4xx) should not be retried. */
  get isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500 && this.statusCode !== 429;
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const TIMEOUT_MS = 10_000;

function getCloverConfig(): CloverConfig {
  const baseUrl = process.env.CLOVER_API_BASE_URL;
  const merchantId = process.env.CLOVER_MERCHANT_ID;
  const apiToken = process.env.CLOVER_API_TOKEN;

  if (!baseUrl || !merchantId || !apiToken) {
    throw new Error(
      'Missing Clover configuration. Ensure CLOVER_API_BASE_URL, CLOVER_MERCHANT_ID, and CLOVER_API_TOKEN are set.',
    );
  }

  return { baseUrl, merchantId, apiToken };
}

async function cloverFetch<T>(
  config: CloverConfig,
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${config.baseUrl}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiToken}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new CloverApiError(
        `Clover API ${response.status}: ${response.statusText}`,
        response.status,
        body,
      );
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Create an order shell on Clover.
 * POST /v3/merchants/{mId}/orders
 */
export async function createCloverOrder(
  config: CloverConfig,
  data: CreateCloverOrderData,
): Promise<CloverOrderResponse> {
  return cloverFetch<CloverOrderResponse>(config, `/v3/merchants/${config.merchantId}/orders`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Add line items in bulk to an existing Clover order.
 * POST /v3/merchants/{mId}/orders/{orderId}/bulk_line_items
 */
export async function addLineItems(
  config: CloverConfig,
  orderId: string,
  items: CloverLineItemInput[],
): Promise<{ elements: CloverLineItemResponse[] }> {
  return cloverFetch<{ elements: CloverLineItemResponse[] }>(
    config,
    `/v3/merchants/${config.merchantId}/orders/${orderId}/bulk_line_items`,
    {
      method: 'POST',
      body: JSON.stringify({ items }),
    },
  );
}

/**
 * Trigger a print event for a Clover order so a receipt prints in the kitchen.
 * POST /v3/merchants/{mId}/print_event
 */
export async function triggerPrint(
  config: CloverConfig,
  orderId: string,
): Promise<{ status: string }> {
  return cloverFetch<{ status: string }>(config, `/v3/merchants/${config.merchantId}/print_event`, {
    method: 'POST',
    body: JSON.stringify({ orderRef: { id: orderId } }),
  });
}

/**
 * Fetch a Clover order including line items.
 * GET /v3/merchants/{mId}/orders/{orderId}?expand=lineItems
 */
export async function getCloverOrder(
  config: CloverConfig,
  orderId: string,
): Promise<CloverOrderResponse> {
  return cloverFetch<CloverOrderResponse>(
    config,
    `/v3/merchants/${config.merchantId}/orders/${orderId}?expand=lineItems`,
  );
}

/**
 * Update the state of a Clover order (e.g. for status tracking).
 * PUT /v3/merchants/{mId}/orders/{orderId}
 */
export async function updateCloverOrderState(
  config: CloverConfig,
  orderId: string,
  state: string,
): Promise<CloverOrderResponse> {
  return cloverFetch<CloverOrderResponse>(
    config,
    `/v3/merchants/${config.merchantId}/orders/${orderId}`,
    {
      method: 'PUT',
      body: JSON.stringify({ state }),
    },
  );
}

export { getCloverConfig };
