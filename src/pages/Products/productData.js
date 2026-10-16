// 750 mL GM Bottle Assets (3D Renders)
import img750_strawberry from '../../assets/750 ML 3D (1)/1.png';
import img750_blueCuracao from '../../assets/750 ML 3D (1)/2.png';
import img750_blueberry from '../../assets/750 ML 3D (1)/3.png';
import img750_cranberry from '../../assets/750 ML 3D (1)/4.png';
import img750_mango from '../../assets/750 ML 3D (1)/5.png';
import img750_mintyJamun from '../../assets/750 ML 3D (1)/6.png';
import img750_melon from '../../assets/750 ML 3D (1)/7.png';
import img750_orange from '../../assets/750 ML 3D (1)/8.png';
import img750_chocolate from '../../assets/750 ML 3D (1)/9.png';
import img750_greenApple from '../../assets/750 ML 3D (1)/10.png';
import img750_plain from '../../assets/750 ML 3D (1)/11.png';
import img750_zestyLemon from '../../assets/750 ML 3D (1)/12.png';
import img750_coconut from '../../assets/750 ML 3D (1)/13.png';

// 180 mL GM Bottle Assets (3D Renders)
import img180_blueberry from '../../assets/180 ML 3D/1.png';
import img180_greenApple from '../../assets/180 ML 3D/2.png';
import img180_orange from '../../assets/180 ML 3D/3.png';
import img180_melon from '../../assets/180 ML 3D/4.png';
import img180_coconut from '../../assets/180 ML 3D/5.png';
import img180_blueCuracao from '../../assets/180 ML 3D/6.png';
import img180_plain from '../../assets/180 ML 3D/7.png';
import img180_strawberry from '../../assets/180 ML 3D/8.png';
import img180_cranberry from '../../assets/180 ML 3D/9.png';
import img180_mango from '../../assets/180 ML 3D/10.png';
import img180_mintyJamun from '../../assets/180 ML 3D/11.png';

// Hipster 3D Bottle Assets
import imgHipster_lemon from '../../assets/Hipster 3d/2.png';
import imgHipster_plain from '../../assets/Hipster 3d/3.png';
import imgHipster_apple from '../../assets/Hipster 3d/1.png';

export const PRODUCTS_DATA = [
  {
    id: 'blueberry',
    name: "Grand Master's Blueberry",
    fullName: "GrandMaster’s Vodka – Blueberry",
    tag: 'Blue Berry',
    tagline: "GRAND MASTER’S Blueberry is one of the most sophisticated vodka flavours.",
    description: "It represents the unique scent of cool forest combined with a hint of sweet blueberry. Native Americans once called them ‘star berries’, because the five points of blueberry blossoms make a star shape.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Blueberry flavoured vodka will be best served with a sprite or water.",
    accentColor: "#2b4c8c",
    img: img750_blueberry,
    img750: img750_blueberry,
    img180: img180_blueberry,
    images: {
      '750 ML': img750_blueberry,
      '180 ML': img180_blueberry,
    },
  },
   {
    id: 'hipster',
    name: "Grand Master's Hipster",
    fullName: "GrandMaster’s Vodka – Hipster Pocket Pack",
    tag: 'Hipster',
    tagline: "Ultra-portable ergonomic design with signature platinum vodka craftsmanship.",
    description: "The Grand Master Hipster series combines the silky smoothness of quadruple-distilled platinum vodka with an innovative, pocket-contoured flask design. Engineered for on-the-go lifestyle and modern celebrations without compromising on taste.",
    alcohol: "42.8%",
    accentColor: "#b85d19",
    isHipster: true,
    img: imgHipster_lemon,
    img750: imgHipster_lemon,
    img180: imgHipster_lemon,
    pictures: [
      { id: 'lemon', label: 'Zesty Lemon', src: imgHipster_lemon, alt: "GrandMaster's Hipster - Zesty Lemon" },
      { id: 'plain', label: 'Platinum Vodka', src: imgHipster_plain, alt: "GrandMaster's Hipster - Platinum Vodka" },
      { id: 'apple', label: 'Green Apple', src: imgHipster_apple, alt: "GrandMaster's Hipster - Green Apple" },
    ],
    pairings: "Grandmaster's Hipster pocket editions are best enjoyed ice-cold, on the rocks, or topped with chilled soda and a fresh citrus twist.",
  },
  {
    id: 'cranberry',
    name: "Grand Master's Cranberry",
    fullName: "GrandMaster’s Vodka – Cranberry",
    tag: 'Cranberry',
    tagline: "GRAND MASTER’S Cranberry is a vibrant, crisp and invigorating vodka expression.",
    description: "Infused with the tart, ruby essence of ripe cranberries, delivering an exhilarating burst of fruit brightness and an impeccably smooth finish.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Cranberry flavoured vodka will be best served chilled on the rocks, with tonic, or in a signature cosmopolitan.",
    accentColor: "#8b152b",
    img: img750_cranberry,
    img750: img750_cranberry,
    img180: img180_cranberry,
    images: {
      '750 ML': img750_cranberry,
      '180 ML': img180_cranberry,
    },
  },
  {
    id: 'melon',
    name: "Grand Master's Melon",
    fullName: "GrandMaster’s Vodka – Melon",
    tag: 'Melon',
    tagline: "GRAND MASTER’S Melon delivers lush tropical sweetness and refreshing aromas.",
    description: "Capturing the juicy essence of sun-ripened summer melons, quadruple-distilled to silky perfection for a smooth, velvety finish.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Melon flavoured vodka will be best served with club soda, lemonade, or fresh mint garnish.",
    accentColor: "#2e7d32",
    img: img750_melon,
    img750: img750_melon,
    img180: img180_melon,
    images: {
      '750 ML': img750_melon,
      '180 ML': img180_melon,
    },
  },
  {
    id: 'blue-curacao',
    name: "Grand Master's Blue Curaçao",
    fullName: "GrandMaster’s Vodka – Blue Curaçao",
    tag: 'Blue Curacao',
    tagline: "GRAND MASTER’S Blue Curacao is an exotic, citrus-kissed electric spirit.",
    description: "Crafted with vibrant bittersweet orange peel notes, offering a striking electric hue and a distinctively bold, sophisticated personality.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Blue Curacao flavoured vodka will be best served in tropical cocktails, citrus mixers, or with lemon-lime soda.",
    accentColor: "#006699",
    img: img750_blueCuracao,
    img750: img750_blueCuracao,
    img180: img180_blueCuracao,
    images: {
      '750 ML': img750_blueCuracao,
      '180 ML': img180_blueCuracao,
    },
  },
  {
    id: 'green-apple',
    name: "Grand Master's Green Apple",
    fullName: "GrandMaster’s Vodka – Green Apple",
    tag: 'Green Apple',
    tagline: "GRAND MASTER’S Green Apple is crisp, tangy, and invigoratingly fresh.",
    description: "Combines the sharp, succulent tang of orchard green apples with our ultra-smooth platinum grain spirit for an electric taste experience.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Green Apple flavoured vodka will be best served with ginger ale, lemon-lime soda, or ice-cold shots.",
    accentColor: "#438a20",
    img: img750_greenApple,
    img750: img750_greenApple,
    img180: img180_greenApple,
    images: {
      '750 ML': img750_greenApple,
      '180 ML': img180_greenApple,
    },
  },
  {
    id: 'strawberry',
    name: "Grand Master's Strawberry",
    fullName: "GrandMaster’s Vodka – Strawberry",
    tag: 'Strawberry',
    tagline: "GRAND MASTER’S Strawberry is bursting with luscious berry richness.",
    description: "Delivers natural ripe strawberry sweetness harmonized with smooth quadruple-distilled spirit, crafted for elegant celebrations and refined cocktails.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Strawberry flavoured vodka will be best served with sparkling water, crushed ice, or premium lemonade.",
    accentColor: "#b91c1c",
    img: img750_strawberry,
    img750: img750_strawberry,
    img180: img180_strawberry,
    images: {
      '750 ML': img750_strawberry,
      '180 ML': img180_strawberry,
    },
  },
  {
    id: 'zesty-lemon',
    name: "Grand Master's Zesty Lemon",
    fullName: "GrandMaster’s Vodka – Zesty Lemon",
    tag: 'Zesty Lemon',
    tagline: "GRAND MASTER’S Zesty Lemon is a sparkling Mediterranean citrus delight.",
    description: "Infused with invigorating lemon peel botanical oils for a sharp, energizing citrus profile that awakens the senses.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Zesty Lemon flavoured vodka will be best served with lemon soda, tonic water, or iced tea.",
    accentColor: "#a16207",
    img: img750_zestyLemon,
    img750: img750_zestyLemon,
    img180: img750_zestyLemon,
    images: {
      '750 ML': img750_zestyLemon,
      '180 ML': img750_zestyLemon,
    },
  },
  {
    id: 'orange',
    name: "Grand Master's Orange",
    fullName: "GrandMaster’s Vodka – Orange",
    tag: 'Orange',
    tagline: "GRAND MASTER’S Orange delivers sun-drenched citrus brightness and zesty warmth.",
    description: "A vibrant burst of sweet Valencia orange essences intertwined with our pure grain distillate for a bright, refreshing profile.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Orange flavoured vodka will be best served with cranberry juice, soda, or a splash of chilled prosecco.",
    accentColor: "#c84a00",
    img: img750_orange,
    img750: img750_orange,
    img180: img180_orange,
    images: {
      '750 ML': img750_orange,
      '180 ML': img180_orange,
    },
  },
  {
    id: 'chocolate',
    name: "Grand Master's Chocolate",
    fullName: "GrandMaster’s Vodka – Chocolate",
    tag: 'Chocolate',
    tagline: "GRAND MASTER’S Chocolate offers decadent cocoa indulgence and velvety warmth.",
    description: "Silky, rich roasted cocoa aromas balanced with high-purity grain spirit for an unmatched after-dinner dessert experience.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Chocolate flavoured vodka will be best served neat over a single large ice rock, with espresso, or in a dessert martini.",
    accentColor: "#4e2c14",
    img: img750_chocolate,
    img750: img750_chocolate,
    img180: img750_chocolate,
    images: {
      '750 ML': img750_chocolate,
      '180 ML': img750_chocolate,
    },
  },
  {
    id: 'mango',
    name: "Grand Master's Mango",
    fullName: "GrandMaster’s Vodka – Mango",
    tag: 'Mango',
    tagline: "GRAND MASTER’S Mango radiates sunny tropical intensity and golden sweetness.",
    description: "Filled with rich Alphonso mango essence and a velvety smooth palate that lingers with vibrant tropical warmth.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Mango flavoured vodka will be best served with tonic, tropical fruit punch, or soda with a slice of fresh lime.",
    accentColor: "#c26d00",
    img: img750_mango,
    img750: img750_mango,
    img180: img180_mango,
    images: {
      '750 ML': img750_mango,
      '180 ML': img180_mango,
    },
  },
  {
    id: 'plain',
    name: "Grand Master's Plain",
    fullName: "GrandMaster’s Vodka – Plain",
    tag: 'Plain',
    tagline: "GRAND MASTER’S Plain is the quintessential pure platinum vodka.",
    description: "Quadruple distilled from finest grains and charcoal-filtered to pristine clarity with an impeccably clean, ultra-smooth character.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Plain vodka will be best served straight from the freezer, in a classic dry martini, or with tonic and lemon.",
    accentColor: "#57534e",
    img: img750_plain,
    img750: img750_plain,
    img180: img180_plain,
    images: {
      '750 ML': img750_plain,
      '180 ML': img180_plain,
    },
  },
  {
    id: 'minty-jamun',
    name: "Grand Master's Minty Jamun",
    fullName: "GrandMaster’s Vodka – Minty Jamun",
    tag: 'Minty Jamun',
    tagline: "GRAND MASTER’S Minty Jamun is a rich fusion of ripe wild blackberry and cooling mint.",
    description: "Infused with the distinct, deep ruby notes of authentic wild Jamun berries and harmonized with fresh spearmint leaves for a deliciously refreshing sip.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Minty Jamun flavoured vodka is best served with tonic water, crushed ice, or a splash of soda.",
    accentColor: "#581c87",
    img: img750_mintyJamun,
    img750: img750_mintyJamun,
    img180: img180_mintyJamun,
    images: {
      '750 ML': img750_mintyJamun,
      '180 ML': img180_mintyJamun,
    },
  },
  {
    id: 'coconut',
    name: "Grand Master's Coconut",
    fullName: "GrandMaster’s Vodka – Coconut",
    tag: 'Coconut',
    tagline: "GRAND MASTER’S Coconut is a smooth, velvety tropical indulgence.",
    description: "Crafted with the creamy, sweet essence of island coconuts blended with crystal-clear quadruple-distilled grain spirit.",
    alcohol: "42.8%",
    sizes: ["180 ML", "750 ML"],
    pairings: "Grandmaster's Coconut flavoured vodka is best served with pineapple juice, chilled cola, or on the rocks.",
    accentColor: "#0284c7",
    img: img750_coconut,
    img750: img750_coconut,
    img180: img180_coconut,
    images: {
      '750 ML': img750_coconut,
      '180 ML': img180_coconut,
    },
  },
 
];

/**
 * Returns the corresponding bottle image based on size.
 * @param {Object} product
 * @param {string} size - '750 ML' or '180 ML'
 * @returns {string} Image source URL
 */
export function getProductImage(product, size = '750 ML') {
  if (!product) return '';
  if (product.isHipster || product.pictures) {
    return product.img || product.pictures?.[0]?.src || '';
  }
  const is180 = (size || '').toString().toUpperCase().includes('180');
  const targetKey = is180 ? '180 ML' : '750 ML';

  if (product.images && product.images[targetKey]) {
    return product.images[targetKey];
  }
  if (is180 && product.img180) {
    return product.img180;
  }
  if (!is180 && product.img750) {
    return product.img750;
  }
  return product.img || product.img750 || product.img180 || '';
}

/**
 * Helper to safely find a product by ID, supporting aliases like 'strawberry-reserve'
 * @param {string} id
 * @returns {Object} Product object
 */
export function findProductById(id) {
  if (!id) return PRODUCTS_DATA[0];
  const normalized = id.toLowerCase().trim();
  if (normalized === 'strawberry-reserve') {
    return PRODUCTS_DATA.find((p) => p.id === 'minty-jamun') || PRODUCTS_DATA[0];
  }
  if (normalized === 'hipster' || normalized === 'hipster-3d' || normalized === 'hipster3d') {
    return PRODUCTS_DATA.find((p) => p.id === 'hipster') || PRODUCTS_DATA[0];
  }
  return PRODUCTS_DATA.find((p) => p.id === normalized) || PRODUCTS_DATA[0];
}

/**
 * Splits product name into brand prefix and flavor name
 * e.g. "Grand Master's Blue Curacao" -> { prefix: "Grand Master's", flavor: "Blue Curacao" }
 */
export function formatProductName(name) {
  if (!name) return { prefix: '', flavor: '' };
  const match = name.match(/^(Grand\s*Master['’]s)\s+(.+)$/i);
  if (match) {
    return {
      prefix: match[1],
      flavor: match[2],
    };
  }
  return { prefix: '', flavor: name };
}

