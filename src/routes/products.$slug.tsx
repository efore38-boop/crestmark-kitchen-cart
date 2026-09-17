import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/CrestmarkChrome";
import { formatPrice, getProductBySlug, products } from "@/lib/crestmark-products";
import { useCart } from "@/lib/crestmark-cart";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable | Crestmark Enterprises" }, { name: "robots", content: "noindex" }] };
    }

    return {
      meta: [
        { title: `${loaderData.name} | Crestmark Enterprises` },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: `${loaderData.name} | Crestmark Enterprises` },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${loaderData.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/products/${loaderData.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.name,
            description: loaderData.description,
            brand: { "@type": "Brand", name: "Crestmark Enterprises" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD" },
            },
          }),
        },
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const product = Route.useLoaderData();
  const related = products.filter((item) => item.id !== product.id).slice(0, 3);
  const [quantity, setQuantity] = useState(1);
  const [packSize, setPackSize] = useState(product.packSizes[0] ?? "Standard pack");
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-background pt-28">
      <section className="section-y pt-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/shop"><ArrowLeft /> Back to shop</Link>
          </Button>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="overflow-hidden bg-secondary">
              <img
                src={product.image}
                alt={product.alt}
                width={1200}
                height={912}
                className="aspect-[4/5] w-full object-cover lg:aspect-square"
              />
            </div>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">{product.category}</p>
              <h1 className="mt-4 font-serif text-5xl leading-none sm:text-7xl">{product.name}</h1>
              <p className="mt-5 font-serif text-3xl">{formatPrice(product.price)}</p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{product.detail}</p>

              <div className="mt-8 grid gap-4">
                <div>
                  <label htmlFor="pack-size" className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">Available pack sizes</label>
                  <select
                    id="pack-size"
                    value={packSize}
                    onChange={(event) => setPackSize(event.target.value)}
                    className="mt-2 h-12 w-full border border-input bg-background px-3 outline-none focus:ring-1 focus:ring-ring"
                  >
                    {product.packSizes.map((size) => <option key={size}>{size}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                  <div className="flex h-13 items-center border border-border">
                    <Button type="button" variant="ghost" size="icon" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                      <Minus />
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button type="button" variant="ghost" size="icon" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(99, value + 1))}>
                      <Plus />
                    </Button>
                  </div>
                  <Button type="button" size="xl" onClick={() => addToCart({ product, packSize, quantity })}>
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="mt-10 grid gap-8 border-t border-border pt-8">
                <InfoBlock title="Product description" text={product.description} />
                <InfoBlock title="Ingredients" text={product.ingredients ?? "Ingredient information will be confirmed directly by Crestmark."} />
                <InfoBlock title="Nutritional information" text={product.nutrition ?? "Nutritional information has not been supplied yet."} />
                <div>
                  <h2 className="font-serif text-2xl">Usage suggestions</h2>
                  <ul className="mt-3 space-y-2 text-muted-foreground">
                    {product.usage.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/55">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-serif text-4xl leading-tight sm:text-6xl">Related products</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="font-serif text-2xl">{title}</h2>
      <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}
