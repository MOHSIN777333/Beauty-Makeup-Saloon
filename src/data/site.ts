export interface ServiceItem {
  id: string;
  name: string;
  shortLine: string;
  description: string;
  image: string;
  aspect: 'landscape' | 'portrait';
  featured?: boolean;
  // TODO CLIENT: Add exact "From Rs. X" price when confirmed; keep null to hide gracefully
  priceFrom: string | null;
  subServices: string[];
}

export interface BridalPackage {
  id: string;
  tier: string;
  title: string;
  subtitle: string;
  featured?: boolean;
  // TODO CLIENT: Add exact PKR tier price when confirmed
  priceLabel: string | null;
  inclusions: string[];
}

export interface DealItem {
  id: string;
  code: string;
  title: string;
  description: string;
  items: string[];
  // TODO CLIENT: Add exact PKR prices for deals missing price, and "Valid till" date if seasonal
  price: string | null;
  validTill: string | null;
}

export type GalleryCategory = 'All' | 'Bridal' | 'Makeup' | 'Hair' | 'Skin' | 'Nails';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'All'>;
  image: string;
  aspectRatio: '3/4' | '4/3';
  alt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  specialty: string;
  photo: string;
}

export interface ReviewItem {
  id: string;
  reviewer: string;
  initials: string;
  rating: 5;
  quote: string;
  staffMentioned: string[];
  source: 'Google review';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// TODO CLIENT: Replace generated editorial previews with real salon & bridal photographs
export const IMAGES = {
  heroBridal: '/src/assets/images/hero_bridal_editorial_1795525267838.jpg',
  bridalSuite: '/src/assets/images/bridal_suite_wide_1795525268265.jpg',
  makeupAtelier: '/src/assets/images/service_makeup_atelier_1795525268260.jpg',
  hairSilk: '/src/assets/images/service_hair_silk_1795525269404.jpg',
  skinRitual: '/src/assets/images/service_skin_ritual_1795525269246.jpg',
  nailsJewelry: '/src/assets/images/service_nails_jewelry_1795525269886.jpg',
} as const;

export const site = {
  brand: {
    name: "Maheen's Beauty & Makeup Saloon",
    shortName: "Maheen's",
    monogram: 'M',
    taglines: {
      primary: 'Enhancing Beauty, Elevating Confidence',
      heroPrefix: 'Be Your Own Kind of',
      heroScript: 'Beautiful',
      pullQuote: 'You deserve to look & feel beautiful',
    },
    credit: 'Designed by Mohsin Ali',
  },
  contact: {
    phoneDisplay: '0309-5001971',
    phoneHref: 'tel:+923095001971',
    whatsappNumber: '923095001971',
    email: 'maheensbeautymakeupsaloon@gmail.com',
    address:
      'Bungalow # 315-A, Street No. 9, Block E, Latifabad Unit 09, opposite Nasir Biryani, Hyderabad, Sindh 710000',
    shortAddress: 'Bungalow # 315-A, Street No. 9, Block E, Latifabad Unit 09',
    cityRegion: 'Hyderabad, Sindh 710000',
    landmark: 'Opposite Nasir Biryani, Latifabad Unit 09',
    // TODO CLIENT: Add opening hours string (e.g. "10:00 PM") to enable Hero live hours line
    openingHoursToday: null as string | null,
    // TODO CLIENT: Add weekly schedule rows to enable hours table in Visit Us
    hoursSchedule: [] as { day: string; hours: string }[],
    // TODO CLIENT: Replace with exact verified Google Maps share URL & embed URL
    googleMapsLink:
      'https://www.google.com/maps/search/?api=1&query=Latifabad+Unit+9+Block+E+Hyderabad+Sindh+710000',
    googleMapsEmbedQuery: 'Latifabad Unit 9 Block E, Hyderabad, Sindh, Pakistan',
    // TODO CLIENT: Add verified Google rating (e.g. "4.9") to show rating chip in Hero
    googleRating: null as string | null,
    googleReviewsUrl:
      'https://www.google.com/search?q=Maheen%27s+Beauty+%26+Makeup+Saloon+Latifabad+Hyderabad+reviews',
  },
  social: {
    facebookFollowers: '49K',
    // TODO CLIENT: Replace with exact Maheen's Facebook Page URL
    facebookUrl: 'https://www.facebook.com',
    // TODO CLIENT: Add Instagram handle (e.g. "@maheensbeautysaloon") when confirmed
    instagramHandle: null as string | null,
    instagramUrl: null as string | null,
  },
  languages: ['Sindhi', 'Urdu', 'English'] as const,
  hero: {
    eyebrow: 'Latifabad, Hyderabad',
    supportingLine:
      'Bridal artistry, luminous skincare, and refined hair styling crafted in our private sanctuary.',
    primaryCta: 'Book on WhatsApp',
    secondaryCta: 'View Services',
  },
  trustMetrics: [
    { id: 'fb', target: 49, suffix: 'K+', label: 'Facebook family', animate: true },
    { id: 'reviews', target: 5, suffix: '-Star', label: 'Google reviews', animate: true },
    { id: 'bridal', text: 'Bridal', label: 'Specialists', animate: false },
    { id: 'staff', text: 'Expert', label: 'Female staff', animate: false },
  ],
  services: [
    {
      id: 'bridal',
      name: 'Bridal Packages',
      shortLine: 'Signature Barat, Mehndi & Walima artistry tailored to you',
      description:
        'Dulhan ka din, hamari zimmedari. Complete bridal transformation with skin prep, bespoke draping, and calm studio care.',
      image: IMAGES.heroBridal,
      aspect: 'portrait',
      featured: true,
      priceFrom: null, // TODO CLIENT: Set bridal starting price
      subServices: [
        'Signature Barat Bridal Makeup & Hairstyling',
        'Mehndi & Mayoun Soft Radiance Look',
        'Walima Editorial Glow & Dupatta Setting',
        'Pre-Bridal Skin Prep & Waxing Rituals',
      ],
    },
    {
      id: 'makeup',
      name: 'Makeup Artist',
      shortLine: 'Soft-focus party glam, engagement & studio looks',
      description:
        'Skin-first complexion blending and long-wear finishes tailored for lighting, photography, and effortless movement.',
      image: IMAGES.makeupAtelier,
      aspect: 'landscape',
      priceFrom: null, // TODO CLIENT: Set makeup starting price
      subServices: [
        'Signature Party & Event Makeup',
        'Engagement & Nikkah Soft Glam',
        'Reception & Formal Evening Artistry',
        'Custom Lashes & Hair Styling Pairing',
      ],
    },
    {
      id: 'hair',
      name: 'Hair Care',
      shortLine: 'Silky blowouts, cuts, color & nourishing treatments',
      description:
        'Restorative scalp care, precision styling, and bridal updos shaped for lasting gloss and bounce.',
      image: IMAGES.hairSilk,
      aspect: 'landscape',
      priceFrom: null, // TODO CLIENT: Set hair care starting price
      subServices: [
        'Precision Haircut & Signature Blowout',
        'Bridal & Party Updos / Waves',
        'Keratin & Protein Smoothing Care',
        'Deep Conditioning & Scalp Nourishment',
      ],
    },
    {
      id: 'skin',
      name: 'Skin Care',
      shortLine: 'Deep-cleansing facials, whitening masks & glass-skin glow',
      description:
        'Gentle cleansing, pore refinement, and luminous whitening rituals designed for sensitive and festive skin.',
      image: IMAGES.skinRitual,
      aspect: 'landscape',
      priceFrom: null, // TODO CLIENT: Set skin care starting price
      subServices: [
        'Deep-Cleansing & Pore Clarifying Facial',
        'Whitening Cleansing & Brightening Mask',
        'Pre-Event Hydration & Glow Therapy',
        'Skin Deal 11 & Pamper Rituals',
      ],
    },
    {
      id: 'nails',
      name: 'Manicure & Pedicure',
      shortLine: 'Clean cuticle care, exfoliation & polished finishes',
      description:
        'Warm soak, gentle exfoliation, cuticle precision, and classic bridal or everyday nail polish.',
      image: IMAGES.nailsJewelry,
      aspect: 'portrait',
      priceFrom: null, // TODO CLIENT: Set mani-pedi starting price
      subServices: [
        'Classic Spa Manicure',
        'Relaxing Pedicure & Heel Renewal',
        'Bridal Hand & Nail Finish',
        'Cuticle Shaping & Gloss Polish',
      ],
    },
    {
      id: 'waxing',
      name: 'Waxing Services',
      shortLine: 'Gentle full-body, facial & combo waxing care',
      description:
        'Hygienic, calm-paced waxing performed by gentle female staff for smooth, comfortable results.',
      image: IMAGES.skinRitual,
      aspect: 'landscape',
      priceFrom: null, // TODO CLIENT: Set waxing starting price
      subServices: [
        'Gentle Face Waxing',
        'Full Arms & Legs Smooth Wax',
        'Skin Deal 11 (Face Wax + Cleansing + Mask)',
        'Skin Deal 12 — Wax Combo Deal',
      ],
    },
  ] as ServiceItem[],
  bridalPackages: [
    {
      id: 'barat-signature',
      tier: 'Tier 01',
      title: 'Signature Barat Bridal',
      subtitle: 'Timeless royal poise from dupatta pinning to final touch',
      featured: true,
      priceLabel: null, // TODO CLIENT: Confirm Barat package PKR rate
      inclusions: [
        'Full HD / air-soft bridal complexion & eye artistry',
        'Custom bridal hairstyling, tikka & jhoomar placement',
        'Traditional dupatta & jewelry setting',
        'Dedicated female artist & calm private suite time',
      ],
    },
    {
      id: 'mehndi-walima',
      tier: 'Tier 02',
      title: 'Mehndi & Walima Glam',
      subtitle: 'Fresh luminous glow or sculpted evening elegance',
      featured: false,
      priceLabel: null, // TODO CLIENT: Confirm Mehndi/Walima PKR rate
      inclusions: [
        'Dewy Mehndi or champagne-toned Walima look',
        'Fresh flower or sleek couture hairstyling',
        'Soft-focus lashes & long-wear lip pairing',
        'Pre-makeup skin hydration prep',
      ],
    },
    {
      id: 'family-party',
      tier: 'Tier 03',
      title: 'Bridal Party & Family Suite',
      subtitle: 'Coordinated glam for sisters, mothers & close guests',
      featured: false,
      priceLabel: null, // TODO CLIENT: Confirm party suite PKR rate
      inclusions: [
        'Tailored party makeup & blowdry or updo',
        'Coordinated group time slots on wedding morning',
        'Gentle, welcoming service in Sindhi, Urdu or English',
        'Group seasonal wedding deal eligibility',
      ],
    },
  ] as BridalPackage[],
  deals: [
    {
      id: 'skin-deal-11',
      code: 'Skin Deal 11',
      title: 'Face Wax Deal',
      description: 'Clean, bright facial finish in one gentle express session.',
      items: ['Face Wax', 'Whitening Cleansing', 'Whitening Mask'],
      price: 'Rs. 899',
      validTill: null, // TODO CLIENT: Add validity date if limited-time
    },
    {
      id: 'skin-deal-12',
      code: 'Skin Deal 12',
      title: 'Wax Combo Deal',
      description: 'Complete smooth-skin waxing combo with calming aftercare.',
      items: ['Multi-zone Waxing Combo', 'Soothing Post-Wax Care', 'Hygienic Single-Use Tools'],
      price: null, // TODO CLIENT: Add Skin Deal 12 PKR price
      validTill: null,
    },
    {
      id: 'wedding-deals',
      code: 'Seasonal Offer',
      title: 'Wedding Deals',
      description: 'Curated seasonal bundles for brides, sisters, and wedding guests.',
      items: ['Custom Bridal & Party Pairing', 'Pre-Event Skin Prep', 'Priority Date Scheduling'],
      price: null, // TODO CLIENT: Add Wedding Deals price range
      validTill: null,
    },
    {
      id: 'ultimate-pamper',
      code: 'Signature Bundle',
      title: 'Ultimate Pamper Package',
      description: 'A restorative top-to-toe reset before celebrations or weekend plans.',
      items: ['Deep-Cleansing Facial', 'Gentle Waxing Services', 'Whitening Glow Treatment'],
      price: null, // TODO CLIENT: Add Ultimate Pamper Package price
      validTill: null,
    },
  ] as DealItem[],
  galleryCategories: ['All', 'Bridal', 'Makeup', 'Hair', 'Skin', 'Nails'] as GalleryCategory[],
  gallery: [
    {
      id: 'g-1',
      title: 'Obsidian & Gold Barat Bride',
      category: 'Bridal',
      image: IMAGES.heroBridal,
      aspectRatio: '3/4',
      alt: 'Pakistani bride in dark velvet and antique gold kundan jewelry with warm bronze makeup',
    },
    {
      id: 'g-2',
      title: 'Bridal Suite Transformation',
      category: 'Bridal',
      image: IMAGES.bridalSuite,
      aspectRatio: '4/3',
      alt: 'Bridal makeup session inside a dark marble and antique gold suite',
    },
    {
      id: 'g-3',
      title: 'Champagne Complexion Palette',
      category: 'Makeup',
      image: IMAGES.makeupAtelier,
      aspectRatio: '4/3',
      alt: 'Gold luxury makeup compacts, loose shimmer pigment, and soft brushes on dark slate',
    },
    {
      id: 'g-4',
      title: 'Espresso Silk Waves',
      category: 'Hair',
      image: IMAGES.hairSilk,
      aspectRatio: '4/3',
      alt: 'Lustrous dark espresso wavy hair styling with warm studio lighting',
    },
    {
      id: 'g-5',
      title: 'Botanical Glow Serum Ritual',
      category: 'Skin',
      image: IMAGES.skinRitual,
      aspectRatio: '4/3',
      alt: 'Amber glass skincare serum bottle, warm linen, and candlelight on dark travertine',
    },
    {
      id: 'g-6',
      title: 'Champagne Bridal Manicure & Henna',
      category: 'Nails',
      image: IMAGES.nailsJewelry,
      aspectRatio: '3/4',
      alt: 'Bridal hands with neutral champagne manicure, mehndi, and gold bangles',
    },
    {
      id: 'g-7',
      title: 'Soft Bronze Bridal Contour',
      category: 'Makeup',
      image: IMAGES.heroBridal,
      aspectRatio: '3/4',
      alt: 'Close-up editorial bridal eye and lip artistry against deep charcoal backdrop',
    },
    {
      id: 'g-8',
      title: 'Dupatta Setting & Finishing',
      category: 'Hair',
      image: IMAGES.bridalSuite,
      aspectRatio: '4/3',
      alt: 'Artist finishing bridal hair and embroidered dupatta before mirror',
    },
  ] as GalleryItem[],
  whyUs: {
    eyebrow: "Why Maheen's",
    title: 'Calm hospitality meets editorial craft.',
    points: [
      {
        title: 'Hygiene-first rituals',
        detail: 'Sanitized tools, clean linens, and single-use waxing applicators for every guest.',
      },
      {
        title: 'Gentle, polite female staff',
        detail:
          'Welcoming artists praised in guest reviews for patience, care, and attentive manners.',
      },
      {
        title: 'Comfort in your language',
        detail:
          'Consultations and appointments conducted naturally in Sindhi, Urdu, and English.',
      },
    ],
  },
  // TODO CLIENT: Confirm staff names from reviews (Minal, Shumaila, Waiba, Sumaira, Wahiba, Mehak, Anum)
  // and add verified portraits before enabling the Team section. Empty array hides Team cleanly.
  team: [] as TeamMember[],
  reviews: [
    {
      id: 'rev-dua',
      reviewer: 'Dua Jokhio',
      initials: 'DJ',
      rating: 5,
      quote:
        'It was my first visit and the staff—Minal, Shumaila, and Waiba—were so gentle, polite, and welcoming. Highly recommended.',
      staffMentioned: ['Minal', 'Shumaila', 'Waiba'],
      source: 'Google review',
    },
    {
      id: 'rev-misbah',
      reviewer: 'Misbah Rani',
      initials: 'MR',
      rating: 5,
      quote:
        'Service by Sumaira, Wahiba, Mehak, and Anum was the best. Truly well-mannered staff and a wonderful experience.',
      staffMentioned: ['Sumaira', 'Wahiba', 'Mehak', 'Anum'],
      source: 'Google review',
    },
  ] as ReviewItem[],
  howItWorks: [
    {
      step: '01',
      title: 'Message us on WhatsApp',
      detail: 'Tap any service, deal, or bridal tier to open a pre-filled WhatsApp chat in seconds.',
    },
    {
      step: '02',
      title: 'Confirm service, date & time',
      detail: 'Our team confirms slot availability and answers questions in Sindhi, Urdu, or English.',
    },
    {
      step: '03',
      title: 'Visit & glow',
      detail: 'Arrive at Latifabad Unit 09, unwind in our female-only sanctuary, and step out radiant.',
    },
  ],
  // TODO CLIENT: Add verified answers for: home/venue bridal service, how early to book bridal,
  // specific product brands used, accepted payment methods, and cancellation policy.
  faqs: [
    {
      id: 'faq-female-staff',
      question: 'Do you have only female staff?',
      answer:
        'Yes. All appointments, consultations, and services at Maheen’s Beauty & Makeup Saloon are performed exclusively by trained, polite female staff.',
    },
    {
      id: 'faq-booking',
      question: 'How do I book an appointment or claim a deal?',
      answer:
        'Tap any "Book on WhatsApp" or "Claim on WhatsApp" button on this site—it opens WhatsApp (+92 309 5001971) with your chosen service already written so our team can confirm your slot immediately.',
    },
    {
      id: 'faq-location',
      question: 'Where is the saloon located in Latifabad?',
      answer:
        'We are located at Bungalow # 315-A, Street No. 9, Block E, Latifabad Unit 09, directly opposite Nasir Biryani, Hyderabad, Sindh.',
    },
    {
      id: 'faq-languages',
      question: 'Which languages do your staff speak?',
      answer:
        'Our team speaks Sindhi, Urdu, and English fluently so you can explain your look and skincare preferences comfortably.',
    },
    {
      id: 'faq-deals',
      question: 'What is included in Skin Deal 11?',
      answer:
        'Skin Deal 11 (Face Wax Deal) includes gentle Face Wax, Whitening Cleansing, and a Whitening Mask for Rs. 899.',
    },
  ] as FaqItem[],
};
