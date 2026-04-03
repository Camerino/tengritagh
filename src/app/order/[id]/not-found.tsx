import Link from 'next/link';

export default function OrderNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="font-heading text-2xl font-bold text-[#2D2926]">Order not found</h1>
      <p className="mt-2 text-[#8B8178]">
        We couldn&apos;t find the order you&apos;re looking for.
      </p>
      <Link
        href="/menu"
        className="mt-6 inline-block rounded-lg bg-[#C75B39] px-6 py-3 text-white hover:bg-[#a84a2e]"
      >
        Back to Menu
      </Link>
    </div>
  );
}
