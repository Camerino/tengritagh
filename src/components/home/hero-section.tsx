import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EtlesPattern } from '@/components/decorative/etles-pattern';
import { RESTAURANT } from '@/lib/constants';

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      data-testid="hero-section"
      className="relative w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6B1D2A] via-[#7A2333] to-[#5A1823]">
        {/* Subtle cross pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23FFF8F0' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Etles pattern stripe */}
      <div className="relative z-10">
        <EtlesPattern className="h-16 sm:h-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-20 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
          {/* Left side: chef GIF + text */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            {/* Chef GIF circle */}
            <div
              className="mb-6 h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-[#D4A84B] bg-gradient-to-br from-[#D4A84B]/30 to-[#C75B39]/30 shadow-lg"
              data-testid="chef-gif"
            >
              <div className="flex h-full w-full items-center justify-center text-3xl">
                <span role="img" aria-label="Chef hand-pulling noodles">
                  👨‍🍳
                </span>
              </div>
            </div>

            {/* Uyghur script */}
            <p
              className="mb-2 text-2xl text-[#D4A84B] sm:text-3xl"
              dir="rtl"
              lang="ug"
              data-testid="uyghur-script"
            >
              تەڭرىتاغ ئۇيغۇر تائاملىرى
            </p>

            {/* Restaurant name */}
            <h1
              id="hero-heading"
              className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            >
              Tengri Tagh
            </h1>
            <p className="font-heading mt-1 text-xl text-[#D4A84B] sm:text-2xl">Uyghur Cuisine</p>

            {/* Tagline */}
            <p className="mt-4 text-lg text-white/90">
              Authentic hand-pulled noodles, kebabs, and more
            </p>
            <a
              href={RESTAURANT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-sm text-[#D4A84B] underline-offset-2 transition-colors hover:text-[#D4A84B]/80 hover:underline"
              data-testid="location-link"
            >
              Near Times Square, NYC
            </a>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-[#D4A84B] text-base font-semibold text-[#2D2926] hover:bg-[#D4A84B]/90"
              >
                <Link href="/menu">Order for Pickup</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/40 bg-transparent text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/menu">View Menu</Link>
              </Button>
            </div>
          </div>

          {/* Right side: food photo placeholders */}
          <div className="hidden flex-1 gap-4 lg:flex">
            <div
              className="h-64 flex-1 rounded-xl bg-gradient-to-br from-[#C75B39]/60 to-[#D4A84B]/40 shadow-lg"
              data-testid="food-photo-1"
              aria-label="Gouyourou Laghman"
            >
              <div className="flex h-full items-center justify-center text-sm font-medium text-white/70">
                Laghman
              </div>
            </div>
            <div
              className="h-64 flex-1 rounded-xl bg-gradient-to-br from-[#D4A84B]/60 to-[#6B1D2A]/40 shadow-lg"
              data-testid="food-photo-2"
              aria-label="Uyghur Kawap"
            >
              <div className="flex h-full items-center justify-center text-sm font-medium text-white/70">
                Kawap
              </div>
            </div>
          </div>
        </div>

        {/* Mobile food photos */}
        <div className="mt-8 flex gap-4 lg:hidden" data-testid="food-photos-mobile">
          <div className="h-40 flex-1 rounded-xl bg-gradient-to-br from-[#C75B39]/60 to-[#D4A84B]/40 shadow-lg">
            <div className="flex h-full items-center justify-center text-sm font-medium text-white/70">
              Laghman
            </div>
          </div>
          <div className="h-40 flex-1 rounded-xl bg-gradient-to-br from-[#D4A84B]/60 to-[#6B1D2A]/40 shadow-lg">
            <div className="flex h-full items-center justify-center text-sm font-medium text-white/70">
              Kawap
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
