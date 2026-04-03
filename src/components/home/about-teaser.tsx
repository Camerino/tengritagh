import Link from 'next/link';

export function AboutTeaser() {
  return (
    <section
      aria-labelledby="about-teaser-heading"
      data-testid="about-teaser"
      className="w-full bg-[#FAF7EE] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Image placeholder */}
          <div className="h-64 w-full rounded-xl bg-gradient-to-br from-[#6B1D2A]/20 to-[#C75B39]/20 lg:h-80 lg:w-1/2">
            <div className="flex h-full items-center justify-center text-[#8B8178]">
              <span className="text-6xl" role="img" aria-label="Uyghur cuisine">
                🏔️
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <h2
              id="about-teaser-heading"
              className="font-heading text-3xl font-bold text-[#2D2926] sm:text-4xl"
            >
              A Taste of the Silk Road
            </h2>
            <p className="mt-4 leading-relaxed text-[#2D2926]/80">
              Uyghur cuisine is a vibrant tapestry of Central Asian flavors, shaped by centuries of
              Silk Road trade. From hand-pulled laghman noodles to smoky charcoal-grilled kawap,
              every dish tells the story of a rich culinary heritage. At Tengri Tagh, we bring these
              authentic flavors to the heart of New York City.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center text-[#C75B39] transition-colors hover:text-[#C75B39]/80"
              data-testid="learn-more-link"
            >
              Learn More
              <span className="ml-1" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
