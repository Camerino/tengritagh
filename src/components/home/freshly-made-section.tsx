export function FreshlyMadeSection() {
  const features = [
    {
      id: 'hand-pulled',
      emoji: '🍜',
      title: 'Hand-Pulled to Order',
      description:
        'Every bowl of laghman starts with fresh dough, stretched and pulled by hand right when you order.',
    },
    {
      id: 'freshness',
      emoji: '🔥',
      title: 'Taste the Freshness',
      description:
        'No pre-made meals here. Every dish is cooked from scratch using authentic Uyghur recipes and fresh ingredients.',
    },
    {
      id: 'family',
      emoji: '👨‍👩‍👧‍👦',
      title: 'Family-Operated Kitchen',
      description:
        'We are a family-run kitchen, bringing the warmth of home cooking to every dish we prepare.',
    },
  ];

  return (
    <section
      aria-labelledby="freshly-made-heading"
      data-testid="freshly-made"
      className="w-full bg-[#2D2926] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2
            id="freshly-made-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Freshly Made for Every Order
          </h2>
          <p className="mt-3 text-lg text-[#D4A84B]">
            Family-operated. Every dish cooked from scratch, with love.
          </p>
        </div>

        <div className="space-y-10">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center gap-6">
              {/* Animated GIF placeholder circle */}
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#D4A84B]/30 bg-gradient-to-br from-[#C75B39]/20 to-[#D4A84B]/20 sm:h-24 sm:w-24">
                <span className="text-3xl sm:text-4xl" role="img" aria-label={feature.title}>
                  {feature.emoji}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-white/70 sm:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
