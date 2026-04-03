import { ORDER_PLATFORMS } from '@/lib/constants';

export function OrderPlatforms() {
  return (
    <section
      aria-labelledby="platforms-heading"
      data-testid="order-platforms"
      className="w-full py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2
            id="platforms-heading"
            className="font-heading text-2xl font-bold text-[#2D2926] sm:text-3xl"
          >
            Also Order From
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {Object.values(ORDER_PLATFORMS).map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-lg px-8 text-base font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: platform.color }}
              data-testid={`platform-${platform.name.toLowerCase().replace(' ', '-')}`}
            >
              {platform.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
