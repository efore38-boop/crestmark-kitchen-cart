import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Leaf, ShieldCheck, Sparkles, Sprout, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/CrestmarkChrome";
import { heroProductImage, products } from "@/lib/crestmark-products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crestmark Enterprises | Quality Soy. Trusted Nutrition." },
      {
        name: "description",
        content:
          "Crestmark Enterprises is a Zimbabwean manufacturer of high-quality soy-based food products including tofu, instant soy porridge, vital gluten and soy seasoning.",
      },
      { property: "og:title", content: "Crestmark Enterprises | Quality Soy. Trusted Nutrition." },
      {
        property: "og:description",
        content:
          "Premium Zimbabwean soy-based food products for households, retailers, restaurants and institutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Crestmark Enterprises",
          slogan: "Quality Soy. Trusted Nutrition.",
          email: "infor@crestmark.co.zw",
          telephone: ["+263 786 362 216", "+263 784 920 381"],
          address: { "@type": "PostalAddress", addressCountry: "ZW" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Crestmark soy-based products",
          itemListElement: products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name: product.name,
              description: product.description,
              brand: { "@type": "Brand", name: "Crestmark Enterprises" },
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD" },
              },
            },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

const values = [
  { label: "Quality", icon: ShieldCheck, text: "Controlled production standards and dependable food products." },
  { label: "Integrity", icon: Leaf, text: "Transparent trading, honest supply and reliable communication." },
  { label: "Innovation", icon: Sparkles, text: "Modern soy applications for everyday and commercial nutrition." },
  { label: "Community", icon: UsersRound, text: "Made for homes, partners and institutions across Zimbabwe." },
  { label: "Sustainability", icon: Sprout, text: "Plant-based nutrition with an earth-conscious point of view." },
];

const partners = ["Retailers", "Distributors", "Restaurants", "Institutions", "Commercial Customers"];

function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative grid min-h-screen overflow-hidden pt-20 text-hero-foreground">
        <img
          src={heroProductImage}
          alt="Soybeans, tofu and premium soy ingredients styled for Crestmark Enterprises"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl content-end px-5 pb-24 pt-24 sm:px-8 lg:pb-20">
          <div className="max-w-4xl animate-fade-up">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.36em] text-accent-gold">Crestmark Enterprises</p>
            <h1 className="max-w-5xl font-serif text-6xl uppercase leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl">
              Quality Soy.<br />Trusted Nutrition.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-hero-muted sm:text-xl">
              High-quality soy-based products, proudly manufactured in Zimbabwe for households, retailers and institutions.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link to="/shop">Shop Our Products</Link>
              </Button>
              <Button asChild variant="hero" size="xl">
                <Link to="/about">Discover Crestmark</Link>
              </Button>
            </div>
          </div>
          <div className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-hero-muted animate-gentle-float">
            <ArrowDown className="h-4 w-4" /> Scroll
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">Zimbabwean soy production</p>
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-6xl">A modern food manufacturer rooted in trust.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              Crestmark Enterprises creates soy-based foods for everyday households, retail shelves, hospitality kitchens, institutions and commercial customers who need dependable quality.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/55" id="featured-products">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">Featured products</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">Soy essentials for home and trade.</h2>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">Shop All Products <ArrowRight /></Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">Why Crestmark</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">Built on principles that matter in food.</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-5">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.label} className="group bg-background p-6 transition-colors hover:bg-secondary">
                  <Icon className="h-7 w-7 text-accent-gold" />
                  <h3 className="mt-8 font-serif text-2xl">{value.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{value.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">Our story</p>
            <h2 className="mt-4 font-serif text-5xl leading-none sm:text-7xl">From raw ingredient to trusted nutrition.</h2>
          </div>
          <div className="grid gap-8">
            {[
              ["Source", "Soy and functional ingredients are selected for reliable quality."],
              ["Craft", "Products are manufactured for practical use across homes and businesses."],
              ["Supply", "Crestmark supports households, retailers, restaurants and institutions."],
            ].map(([title, text], index) => (
              <div key={title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 border-t border-primary-foreground/20 pt-6">
                <span className="font-serif text-4xl text-accent-gold">0{index + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl">{title}</h3>
                  <p className="mt-2 leading-7 text-primary-foreground/75">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden">
            <img
              src={heroProductImage}
              alt="Soy products manufactured in Zimbabwe"
              loading="lazy"
              width={1200}
              height={756}
              className="aspect-[5/4] w-full object-cover image-reveal"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">From Zimbabwe</p>
            <h2 className="mt-4 font-serif text-5xl leading-tight sm:text-7xl">Proudly manufactured in Zimbabwe.</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Crestmark is built for local reliability and regional ambition — bringing high-quality soy products to customers who value nutrition, consistency and dependable supply.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 md:grid-cols-4 md:items-end">
            <h2 className="font-serif text-5xl leading-tight sm:text-7xl md:col-span-2">Product showcase.</h2>
            <p className="text-lg leading-8 text-muted-foreground md:col-span-2">
              Elegant, functional soy products for daily cooking, institutional feeding and commercial manufacturing.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {products.map((product, index) => (
              <Link
                key={product.id}
                to="/products/$slug"
                params={{ slug: product.slug }}
                className={index === 0 ? "group block overflow-hidden md:col-span-2 md:row-span-2" : "group block overflow-hidden"}
              >
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="mt-3 block font-serif text-2xl">{product.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/55">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">Business partners</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">Supply for serious food operators.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {partners.map((partner) => (
                <div key={partner} className="border border-border bg-background px-5 py-5 font-serif text-2xl">{partner}</div>
              ))}
              <Button asChild size="lg" className="h-full min-h-16">
                <Link to="/contact">Become a Partner <ArrowRight /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 text-center sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">Crestmark Enterprises</p>
          <h2 className="mx-auto max-w-4xl font-serif text-5xl leading-none sm:text-7xl">Better nutrition starts here.</h2>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">Contact Crestmark</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
