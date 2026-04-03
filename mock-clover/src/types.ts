export interface CloverOrder {
  id: string;
  currency: string;
  employee?: { id: string };
  total: number;
  title?: string;
  note?: string;
  state: string;
  createdTime: number;
  modifiedTime: number;
  lineItems?: { elements: CloverLineItem[] };
  orderType?: { id: string; label: string };
}

export interface CloverLineItem {
  id: string;
  name: string;
  price: number;
  unitQty?: number;
  note?: string;
  createdTime: number;
  orderRef: { id: string };
}

export interface CloverOrderType {
  id: string;
  label: string;
  taxable: boolean;
  isDefault: boolean;
  isHidden: boolean;
}

export interface CreateOrderRequest {
  title?: string;
  note?: string;
  state?: string;
  orderType?: { id: string };
}

export interface BulkLineItemsRequest {
  items: Array<{
    name: string;
    price: number;
    unitQty?: number;
    note?: string;
  }>;
}

export interface PrintEventRequest {
  orderRef: { id: string };
}
