export interface BarberService {
  id: string;
  name: string;
  category: 'cuts' | 'beards' | 'combos' | 'vip';
  price: number;
  durationMinutes: number;
  description: string;
  includes: string[];
  popular?: boolean;
}

export interface BarberAddon {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
}

export interface BarberMaster {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  rating: number;
  reviewCount: number;
  avatarUrl: string;
  badge?: string;
  workingDays: string[];
}

export interface HaircutStyle {
  id: string;
  title: string;
  category: 'fades' | 'classics' | 'beards' | 'modern';
  categoryLabel: string;
  imageUrl: string;
  durationMinutes: number;
  price: number;
  serviceId: string;
  suitableFace: string;
  hairType: string;
  maintenanceWeeks: string;
  stylingProduct: string;
  description: string;
  barberQuote: string;
}

export interface SocialFeedPost {
  id: string;
  authorName: string;
  handle: string;
  avatar: string;
  imageUrl: string;
  caption: string;
  serviceName: string;
  barberName: string;
  likes: number;
  commentsCount: number;
  timestamp: string;
  isVerifiedClient: boolean;
  type: 'client_look' | 'studio_update' | 'testimonial';
  quote?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  rating: number;
  date: string;
  service: string;
  barber: string;
  comment: string;
  verified: boolean;
}

export interface Appointment {
  id: string;
  bookingRef: string;
  service: BarberService;
  addons: BarberAddon[];
  barber: BarberMaster;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
  totalPrice: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export const SERVICES: BarberService[] = [
  {
    id: 'srv-signature-cut',
    name: 'The Signature Haircut',
    category: 'cuts',
    price: 45,
    durationMinutes: 45,
    description: 'Precision scissor and clipper craft tailored to your head shape, completed with a straight-razor nape clean and cooling tonic.',
    includes: ['Consultation & texture assessment', 'Bespoke clipper / shear cut', 'Straight-razor neck shave', 'Invigorating tea tree scalp rinse', 'Matte clay or pomade finish'],
    popular: true,
  },
  {
    id: 'srv-skin-fade',
    name: 'Skin Fade & Razor Taper',
    category: 'cuts',
    price: 52,
    durationMinutes: 50,
    description: 'Ultra-clean zero/foil blend fading seamlessly into textured or classic upper hair with crisp hairline edge work.',
    includes: ['Zero foil blend down to skin', 'Custom shear texturizing on top', 'Hot towel razor hairline alignment', 'Matte sea-salt styling spray finish'],
    popular: true,
  },
  {
    id: 'srv-traditional-shave',
    name: 'Traditional Hot Towel Shave',
    category: 'beards',
    price: 40,
    durationMinutes: 40,
    description: 'Classic wet shave experience using pre-shave oils, three steamed eucalyptus towels, lather bowl, and a single-blade straight razor.',
    includes: ['Hot essential oil compress', 'Rich badger-brush warm lather', 'Straight-razor grain shave', 'Ice-cold alum stone towel closure', 'Sandalwood restorative balm'],
  },
  {
    id: 'srv-beard-sculpt',
    name: 'Beard Sculpt & Razor Lineup',
    category: 'beards',
    price: 36,
    durationMinutes: 35,
    description: 'Freehand beard tapering, clipper debulking, scissor precision trimming, and straight-razor cheek & neck line definition.',
    includes: ['Beard length consultation', 'Freehand shape balancing', 'Razor line-up with clear glide gel', 'Warm botanical towel & beard butter'],
    popular: true,
  },
  {
    id: 'srv-cut-beard-combo',
    name: 'The Heritage Cut & Beard Combo',
    category: 'combos',
    price: 75,
    durationMinutes: 75,
    description: 'Our most sought-after full regimen: signature haircut combined with complete beard architectural shaping and hot towel razor service.',
    includes: ['Full signature haircut & neck shave', 'Precision beard trim & shaping', 'Dual hot towel treatment', 'Shampoo & conditioning rinse', 'Dual styling (hair pomade + beard balm)'],
    popular: true,
  },
  {
    id: 'srv-vip-executive',
    name: 'Executive Grooming Ritual',
    category: 'vip',
    price: 110,
    durationMinutes: 90,
    description: 'The supreme gentleman lounge treatment. Comprehensive haircut, hot towel shave, detoxifying black charcoal facial mask, and scalp therapy.',
    includes: ['Full bespoke haircut & styling', 'Straight-razor hot shave with oils', 'Detoxifying mineral face scrub & charcoal mask', 'Deep tension neck & shoulder massage', 'Complimentary single-malt or espresso'],
  },
  {
    id: 'srv-buzz-cleanup',
    name: 'Clean Buzz & Sharp Lineup',
    category: 'cuts',
    price: 32,
    durationMinutes: 30,
    description: 'Uniform clipper cut (one to two guards) with tight perimeter contouring and razor neck finish.',
    includes: ['Dual guard clipper buzz', 'Razor neck cleanup', 'Cooling bay rum splash'],
  },
];

export const ADDONS: BarberAddon[] = [
  {
    id: 'addon-eucalyptus-towel',
    name: 'Extra Eucalyptus Hot Towel',
    price: 8,
    durationMinutes: 5,
    description: 'Deep pore relaxation with natural eucalyptus steam compress.',
  },
  {
    id: 'addon-scalp-massage',
    name: 'Invigorating Scalp Therapy',
    price: 15,
    durationMinutes: 10,
    description: 'Tea-tree oil pressure-point massage relieving head & neck tension.',
  },
  {
    id: 'addon-charcoal-mask',
    name: 'Activated Charcoal Pore Mask',
    price: 18,
    durationMinutes: 15,
    description: 'Removes impurities and balances skin tone before final finish.',
  },
  {
    id: 'addon-gray-blend',
    name: 'Subtle Gray Blending Camo',
    price: 30,
    durationMinutes: 20,
    description: 'Natural matte 10-minute tone reduction for beard or temple hair.',
  },
];

export const BARBERS: BarberMaster[] = [
  {
    id: 'barber-marcus',
    name: 'Marcus Vance',
    title: 'Master Craftsman & Co-Founder',
    experienceYears: 14,
    specialty: 'Architectural Fades & Beard Sculpting',
    bio: 'Trained in traditional London barbering and modern West Coast fades. Known for microscopic attention to hairline symmetry and razor detailing.',
    rating: 4.98,
    reviewCount: 384,
    avatarUrl: '/src/assets/images/barber_craft_action_1791282769913.jpg',
    badge: 'Co-Founder',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  {
    id: 'barber-elena',
    name: 'Elena Rostova',
    title: 'Senior Barber & Texture Specialist',
    experienceYears: 10,
    specialty: 'Executive Scissor Work & Classic Pompadours',
    bio: 'Former session stylist dedicated to craft barbering. Elena excels in natural shears motion, flow hairstyles, and tailored low tapers that grow out effortlessly.',
    rating: 4.95,
    reviewCount: 298,
    avatarUrl: '/src/assets/images/haircut_classic_pompadour_1791282745858.jpg',
    badge: 'Texture Lead',
    workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  {
    id: 'barber-darius',
    name: 'Darius King',
    title: 'Precision Barber & Shave Specialist',
    experienceYears: 8,
    specialty: 'High & Low Skin Fades, Traditional Wet Shaves',
    bio: 'Renowned for razor-sharp tapers and relaxing hot-towel wet shaves. Darius treats every cut like an artisanal sculpture.',
    rating: 4.92,
    reviewCount: 245,
    avatarUrl: '/src/assets/images/haircut_textured_fade_1791282728777.jpg',
    badge: 'Razor Master',
    workingDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
];

export const HAIRCUT_STYLES: HaircutStyle[] = [
  {
    id: 'style-textured-crop-fade',
    title: 'Modern Textured Crop & Skin Fade',
    category: 'fades',
    categoryLabel: 'Fades & Crops',
    imageUrl: '/src/assets/images/haircut_textured_fade_1791282728777.jpg',
    durationMinutes: 50,
    price: 52,
    serviceId: 'srv-skin-fade',
    suitableFace: 'Oval, Square, Heart',
    hairType: 'Straight, Wavy, Thick',
    maintenanceWeeks: '2 to 3 weeks',
    stylingProduct: 'Matte Clay or Sea Salt Texture Powder',
    description: 'A contemporary European crop featuring heavy textured point-cutting on top and a seamless high skin fade along the temples and occipital bone.',
    barberQuote: 'The skin fade emphasizes jawline structure while the choppy fringe requires zero fuss in the morning.',
  },
  {
    id: 'style-executive-pompadour',
    title: 'Executive Low Taper Pompadour',
    category: 'classics',
    categoryLabel: 'Classics & Tapers',
    imageUrl: '/src/assets/images/haircut_classic_pompadour_1791282745858.jpg',
    durationMinutes: 45,
    price: 45,
    serviceId: 'srv-signature-cut',
    suitableFace: 'Round, Oval, Diamond',
    hairType: 'Medium to dense hair',
    maintenanceWeeks: '3 to 4 weeks',
    stylingProduct: 'Low-shine water-based pomade',
    description: 'A timeless silhouette with controlled volume through the crown, clean scissor-tapered sides, and soft temple blend without exposing scalp.',
    barberQuote: 'Refined enough for boardrooms yet effortlessly handsome for evening outings.',
  },
  {
    id: 'style-sculpted-beard-fade',
    title: 'Sculpted Beard & Razor Contour',
    category: 'beards',
    categoryLabel: 'Beard Artistry',
    imageUrl: '/src/assets/images/haircut_beard_sculpt_1791282757829.jpg',
    durationMinutes: 35,
    price: 36,
    serviceId: 'srv-beard-sculpt',
    suitableFace: 'All face geometries',
    hairType: 'Full or medium coarse beards',
    maintenanceWeeks: '2 weeks',
    stylingProduct: 'Cedarwood & Jojoba Beard Oil',
    description: 'Graduated sideburn-to-cheek transition, crisp straight-razor cheek lines, and sculpted weight along the lower jaw to accentuate angular masculine symmetry.',
    barberQuote: 'The secret is blending the top of the sideburns so the haircut and beard flow in one seamless gradient.',
  },
  {
    id: 'style-heritage-ritual-cut',
    title: 'Artisanal Shear Craft & Hot Towel Finish',
    category: 'modern',
    categoryLabel: 'Signature Craft',
    imageUrl: '/src/assets/images/barber_craft_action_1791282769913.jpg',
    durationMinutes: 75,
    price: 75,
    serviceId: 'srv-cut-beard-combo',
    suitableFace: 'Universal',
    hairType: 'All textures',
    maintenanceWeeks: '3 to 4 weeks',
    stylingProduct: 'Botanical tonic & flexible cream',
    description: 'The definitive Heritage & Blade bespoke session. Scissor over comb precision shaping paired with traditional hot-towel wet shave techniques.',
    barberQuote: 'Handcrafted barbering that honors heritage techniques with modern ergonomic styling.',
  },
];

export const SOCIAL_POSTS: SocialFeedPost[] = [
  {
    id: 'post-1',
    authorName: 'Julian Mercer',
    handle: '@jmercer_arch',
    avatar: 'JM',
    imageUrl: '/src/assets/images/haircut_textured_fade_1791282728777.jpg',
    caption: 'Fresh skin fade by @marcus.vance before the studio architecture summit. The line work is untouched. Nobody touches my hair other than Heritage & Blade.',
    serviceName: 'Skin Fade & Razor Taper',
    barberName: 'Marcus Vance',
    likes: 142,
    commentsCount: 18,
    timestamp: '2 hours ago',
    isVerifiedClient: true,
    type: 'client_look',
    quote: 'The line work is untouched. Nobody touches my hair other than Heritage & Blade.',
  },
  {
    id: 'post-2',
    authorName: 'Heritage & Blade Studio',
    handle: '@heritageandblade',
    avatar: 'HB',
    imageUrl: '/src/assets/images/hero_barbershop_interior_1791282714553.jpg',
    caption: 'Studio doors open at 8:00 AM. Warm cedarwood steam, fresh espresso pulled, and vintage Belmont chairs oiled. Book your chair online before the weekend fills.',
    serviceName: 'Studio Announcement',
    barberName: 'Heritage Team',
    likes: 318,
    commentsCount: 24,
    timestamp: 'Yesterday',
    isVerifiedClient: false,
    type: 'studio_update',
  },
  {
    id: 'post-3',
    authorName: 'Christian Cole',
    handle: '@ccole_fin',
    avatar: 'CC',
    imageUrl: '/src/assets/images/haircut_classic_pompadour_1791282745858.jpg',
    caption: 'Elena dialed in the low taper pompadour just right. Natural flow, zero greasy residue, and effortless morning styling. 10/10 master barber.',
    serviceName: 'The Signature Haircut',
    barberName: 'Elena Rostova',
    likes: 215,
    commentsCount: 14,
    timestamp: '3 days ago',
    isVerifiedClient: true,
    type: 'client_look',
    quote: 'Elena dialed in the low taper pompadour just right. 10/10 master barber.',
  },
  {
    id: 'post-4',
    authorName: 'Marcus Vance',
    handle: '@marcus.vance',
    avatar: 'MV',
    imageUrl: '/src/assets/images/haircut_beard_sculpt_1791282757829.jpg',
    caption: 'Clean razor contour for David today. Notice how tapering down from 1.5 into the beard cheek gives clean cheekbones without sacrificing chin density.',
    serviceName: 'Beard Sculpt & Razor Lineup',
    barberName: 'Marcus Vance',
    likes: 409,
    commentsCount: 31,
    timestamp: '4 days ago',
    isVerifiedClient: false,
    type: 'studio_update',
  },
  {
    id: 'post-5',
    authorName: 'Aaron Diaz',
    handle: '@aarondiaz.creative',
    avatar: 'AD',
    imageUrl: '/src/assets/images/barber_craft_action_1791282769913.jpg',
    caption: 'The Executive Ritual here is on another level. Hot towel with eucalyptus steam, straight razor shave, and cold stone wrap. Felt like a brand new man walking out.',
    serviceName: 'Executive Grooming Ritual',
    barberName: 'Darius King',
    likes: 278,
    commentsCount: 19,
    timestamp: '5 days ago',
    isVerifiedClient: true,
    type: 'client_look',
    quote: 'Hot towel with eucalyptus steam, straight razor shave, and cold stone wrap. Felt like a brand new man.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    clientName: 'Alexander Hayes',
    rating: 5,
    date: 'October 2, 2026',
    service: 'The Heritage Cut & Beard Combo',
    barber: 'Marcus Vance',
    comment: 'Marcus takes his time to truly assess your hair growth patterns before ever touching the clippers. The straight razor lineup was surgical. Will never go anywhere else in the city.',
    verified: true,
  },
  {
    id: 'rev-2',
    clientName: 'Dr. Ryan Gallagher',
    rating: 5,
    date: 'September 28, 2026',
    service: 'The Signature Haircut',
    barber: 'Elena Rostova',
    comment: 'Elena gave me the best scissor cut I have had in a decade. It grew out naturally over four weeks without getting bulky around the ears. Outstanding ambiance and punctuality.',
    verified: true,
  },
  {
    id: 'rev-3',
    clientName: 'Liam O’Connor',
    rating: 5,
    date: 'September 24, 2026',
    service: 'Executive Grooming Ritual',
    barber: 'Darius King',
    comment: 'The hot towel shave and charcoal mask took away weeks of fatigue. Darius is a true craftsman of the straight blade. An authentic gentleman lounge experience.',
    verified: true,
  },
  {
    id: 'rev-4',
    clientName: 'Mateo Morales',
    rating: 5,
    date: 'September 19, 2026',
    service: 'Skin Fade & Razor Taper',
    barber: 'Marcus Vance',
    comment: 'Crisp zero blend with surgical transitions. The booking online was instantaneous with clear reminders. 5 stars all the way.',
    verified: true,
  },
];

export const TIME_SLOTS = [
  '08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM',
  '11:30 AM', '01:15 PM', '02:00 PM', '02:45 PM',
  '03:30 PM', '04:15 PM', '05:00 PM', '05:45 PM',
  '06:30 PM', '07:15 PM',
];
