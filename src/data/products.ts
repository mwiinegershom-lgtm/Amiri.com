export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  videoUrl?: string;
  sizes: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 'p_1',
    name: 'MX1 Leather Patch Denim',
    category: 'Denim',
    price: 1150,
    description: 'Signature skinny fit denim featuring hand-distressed details and ribbed leather patches.',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop'
    ],
    videoUrl: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=165&oauth2_token_id=57447761',
    sizes: ['28', '29', '30', '31', '32', '33', '34', '36'],
    inStock: true,
  },
  {
    id: 'p_2',
    name: 'Skel Top Low Sneaker',
    category: 'Footwear',
    price: 590,
    description: 'Low-top leather sneakers with signature hand-cut skeleton appliqués.',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop'
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    inStock: true,
  },
  {
    id: 'p_3',
    name: 'Core Logo Tee',
    category: 'Tops',
    price: 350,
    description: 'Premium supima cotton t-shirt with classic core logo print on the chest.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
  },
  {
    id: 'p_4',
    name: 'Sunset Silk Bowling Shirt',
    category: 'Tops',
    price: 850,
    description: 'Fluid silk bowling shirt featuring a custom Malibu sunset gradient print.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2070&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 'p_5',
    name: 'Bones Varsity Jacket',
    category: 'Outerwear',
    price: 2200,
    description: 'Wool-blend varsity jacket with leather sleeves and bone chenille patches.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop'
    ],
    sizes: ['46', '48', '50', '52', '54'],
    inStock: true,
  }
];
