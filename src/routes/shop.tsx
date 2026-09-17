import { createFileRoute } from "@tanstack/react-router";

import { ProductCard } from "@/components/CrestmarkChrome";
import { products } from "@/lib/crestmark-products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Soy Products | Crestmark Enterprises" },
      { name: "description", content: "Shop Crestmark tofu, instant soy porridge, vital gluten and soy seasoning as a guest and order directly through WhatsApp." },
      { property: "og:title", content: "Shop Soy Products | Crestmark Enterprises" },
      { property: "og:description", content: "Browse Crestmark's soy-based product range and send your order via WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/shop" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <main className="min-h-screen bg-background pt-28">
      <section className="section-y pt-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">Shop</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-7xl">Soy-based products for every table and trade counter.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Choose products, pack sizes and quantities. Your order is sent directly to Crestmark on WhatsApp for availability, current pricing, delivery and payment arrangements.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
