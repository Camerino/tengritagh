import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Sarah M.',
    date: 'March 2026',
    rating: 5,
    text: 'The best hand-pulled noodles I have ever had! The Big Plate Chicken Laghman is absolutely incredible. The noodles are perfectly chewy and the sauce is rich and flavorful.',
  },
  {
    id: '2',
    name: 'James L.',
    date: 'February 2026',
    rating: 5,
    text: 'Authentic Uyghur cuisine right in the heart of NYC. The lamb samsa is crispy, flaky, and packed with juicy lamb. A hidden gem near Times Square!',
  },
  {
    id: '3',
    name: 'Emily C.',
    date: 'January 2026',
    rating: 5,
    text: 'Family-run with so much heart. You can taste the love in every dish. The Uyghur polo is fragrant and perfectly spiced. Will definitely be coming back!',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-[#D4A84B] text-[#D4A84B]' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  );
}

export function GoogleReviews() {
  return (
    <section
      aria-labelledby="reviews-heading"
      data-testid="google-reviews"
      className="w-full bg-[#FFF8F0] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2
            id="reviews-heading"
            className="font-heading text-3xl font-bold text-[#2D2926] sm:text-4xl"
          >
            What People Say
          </h2>
          <p className="mt-2 text-[#8B8178]">From Google Reviews</p>
        </div>

        {/* Mobile: horizontal scroll / Desktop: 3-col grid */}
        <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
          {MOCK_REVIEWS.map((review) => (
            <Card
              key={review.id}
              className="min-w-[280px] flex-shrink-0 sm:min-w-0"
              data-testid="review-card"
            >
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  {/* Avatar */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C75B39] text-sm font-bold text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2D2926]">{review.name}</p>
                    <p className="text-xs text-[#8B8178]">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-3 text-sm leading-relaxed text-[#2D2926]/80">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
