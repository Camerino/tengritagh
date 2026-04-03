export const RESTAURANT = {
  name: 'Tengri Tagh Uyghur Cuisine',
  nameShort: 'Tengri Tagh',
  phone: '(555) 123-4567',
  phoneHref: 'tel:+15551234567',
  email: 'info@tengritagh.com',
  address: '123 W 46th St, New York, NY 10036',
  addressShort: 'Near Times Square, NYC',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Tengri+Tagh+Uyghur+Cuisine+Times+Square+NYC',
  priceRange: '$$',
  cuisineTypes: ['Uyghur', 'Chinese', 'Central Asian'],
  siteUrl: 'https://tengritagh.com',
} as const;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/tengritagh',
  facebook: 'https://facebook.com/tengritagh',
  tiktok: 'https://tiktok.com/@tengritagh',
  yelp: 'https://yelp.com/biz/tengritagh',
} as const;

export const ORDER_PLATFORMS = {
  doordash: {
    name: 'DoorDash',
    url: '#',
    color: '#FF3008',
  },
  ubereats: {
    name: 'Uber Eats',
    url: '#',
    color: '#06C167',
  },
  grubhub: {
    name: 'Grubhub',
    url: '#',
    color: '#F63440',
  },
} as const;

export const STORE_HOURS = [
  { day: 'Monday', open: '11:00 AM', close: '10:00 PM' },
  { day: 'Tuesday', open: '11:00 AM', close: '10:00 PM' },
  { day: 'Wednesday', open: '11:00 AM', close: '10:00 PM' },
  { day: 'Thursday', open: '11:00 AM', close: '10:00 PM' },
  { day: 'Friday', open: '11:00 AM', close: '11:00 PM' },
  { day: 'Saturday', open: '11:00 AM', close: '11:00 PM' },
  { day: 'Sunday', open: '12:00 PM', close: '9:00 PM' },
] as const;
