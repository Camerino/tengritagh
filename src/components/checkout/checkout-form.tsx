'use client';

import { type ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

interface CheckoutFormProps {
  customerInfo: CustomerInfo;
  onChange: (info: CustomerInfo) => void;
  errors: Partial<Record<keyof CustomerInfo, string>>;
}

function formatPhoneNumber(value: string): string {
  // Strip everything except digits
  const digits = value.replace(/\D/g, '');

  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export function CheckoutForm({ customerInfo, onChange, errors }: CheckoutFormProps) {
  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({ ...customerInfo, name: e.target.value });
  }

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhoneNumber(e.target.value);
    onChange({ ...customerInfo, phone: formatted });
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({ ...customerInfo, email: e.target.value });
  }

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-xl font-bold text-[#2D2926]">Your Information</h2>

      <div>
        <label htmlFor="customer-name" className="mb-1 block text-sm font-medium text-[#2D2926]">
          Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="customer-name"
          type="text"
          placeholder="Your name"
          value={customerInfo.name}
          onChange={handleNameChange}
          maxLength={100}
          data-testid="customer-name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="customer-phone" className="mb-1 block text-sm font-medium text-[#2D2926]">
          Phone <span className="text-red-500">*</span>
        </label>
        <Input
          id="customer-phone"
          type="tel"
          placeholder="(212) 555-1234"
          value={customerInfo.phone}
          onChange={handlePhoneChange}
          data-testid="customer-phone"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="customer-email" className="mb-1 block text-sm font-medium text-[#2D2926]">
          Email <span className="text-[#8B8178]">(optional)</span>
        </label>
        <Input
          id="customer-email"
          type="email"
          placeholder="your@email.com"
          value={customerInfo.email}
          onChange={handleEmailChange}
          data-testid="customer-email"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>
    </div>
  );
}
