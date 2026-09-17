import heroImage from "@/assets/crestmark-hero.jpg";
import tofuImage from "@/assets/crestmark-tofu.jpg";
import porridgeImage from "@/assets/crestmark-porridge.jpg";
import vitalGlutenImage from "@/assets/crestmark-vital-gluten.jpg";
import soySeasoningImage from "@/assets/crestmark-soy-seasoning.jpg";

export type Product = {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  category: string;
  description: string;
  detail: string;
  price: number | null;
  currency: "USD";
  packSizes: string[];
  availability: "Available" | "Confirm availability";
  image: string;
  alt: string;
  usage: string[];
  ingredients?: string;
  nutrition?: string;
};

export const whatsappNumber = "263786362216";
export const displayWhatsappNumber = "+263 786 362 216";

export const heroProductImage = heroImage;

export const products: Product[] = [
  {
    id: "tofu",
    name: "Tofu",
    shortName: "Tofu",
    slug: "tofu",
    category: "Fresh soy food",
    description: "Protein-rich soy product and nutritious meat alternative.",
    detail:
      "A clean, versatile soy-based protein for home kitchens, restaurants and food-service menus. Pricing and availability are confirmed directly with Crestmark before payment arrangements.",
    price: null,
    currency: "USD",
    packSizes: ["Standard pack", "Bulk order"],
    availability: "Confirm availability",
    image: tofuImage,
    alt: "Premium tofu cubes with soybeans on a green ceramic plate",
    usage: ["Pan-fry for everyday meals", "Add to stews, salads and stir-fries", "Use as a meat alternative in commercial kitchens"],
  },
  {
    id: "instant-soy-porridge",
    name: "Instant Soy Porridge",
    shortName: "Soy Porridge",
    slug: "instant-soy-porridge",
    category: "Breakfast nutrition",
    description:
      "Convenient ready-to-mix porridge containing plant-based protein and essential nutrients.",
    detail:
      "A convenient soy-based porridge designed for quick preparation at home, in institutions and in food-service environments. Pricing and availability are confirmed directly with Crestmark before payment arrangements.",
    price: null,
    currency: "USD",
    packSizes: ["Standard pack", "Family pack", "Institutional order"],
    availability: "Confirm availability",
    image: porridgeImage,
    alt: "Creamy instant soy porridge in a ceramic bowl with soybeans",
    usage: ["Prepare as a quick breakfast", "Serve in schools and institutions", "Adapt with fruit, milk or preferred sweeteners"],
  },
  {
    id: "vital-gluten",
    name: "Vital Gluten",
    shortName: "Vital Gluten",
    slug: "vital-gluten",
    category: "Functional ingredient",
    description:
      "High-protein wheat derivative used as a functional ingredient in bakery and food manufacturing.",
    detail:
      "A functional high-protein ingredient for bakeries, manufacturers and commercial food operations. Pricing and availability are confirmed directly with Crestmark before payment arrangements.",
    price: null,
    currency: "USD",
    packSizes: ["Standard pack", "Commercial pack", "Bulk order"],
    availability: "Confirm availability",
    image: vitalGlutenImage,
    alt: "Vital gluten flour in a ceramic bowl with grains and soybeans",
    usage: ["Strengthen dough in bakery production", "Use in food manufacturing formulations", "Order in commercial quantities for production needs"],
  },
  {
    id: "soy-seasoning",
    name: "Soy Seasoning",
    shortName: "Soy Seasoning",
    slug: "soy-seasoning",
    category: "Everyday flavour",
    description: "Soy-based seasoning designed to enhance everyday meals.",
    detail:
      "A savoury soy-based seasoning for households, restaurants and commercial kitchens. Pricing and availability are confirmed directly with Crestmark before payment arrangements.",
    price: null,
    currency: "USD",
    packSizes: ["Standard pack", "Kitchen pack", "Bulk order"],
    availability: "Confirm availability",
    image: soySeasoningImage,
    alt: "Soy seasoning in a green ceramic dish with herbs and soybeans",
    usage: ["Season everyday meals", "Add depth to sauces and marinades", "Use in restaurant and catering kitchens"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number | null) {
  if (price === null) {
    return "Price on request";
  }

  return `USD ${price.toFixed(2)}`;
}
