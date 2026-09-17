import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { heroProductImage } from "@/lib/crestmark-products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Crestmark Enterprises | Zimbabwean Soy Food Manufacturer" },
      { name: "description", content: "Learn about Crestmark Enterprises, a Zimbabwean manufacturer focused on quality soy products, trusted nutrition and reliable commercial supply." },
      { property: "og:title", content: "About Crestmark Enterprises" },
      { property: "og:description", content: "A premium Zimbabwean soy food manufacturer serving households, retailers, restaurants and institutions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-28">
      <section className="section-y pt-12">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">About Crestmark</p>
            <h1 className="mt-4 font-serif text-5xl leading-none sm:text-7xl">Quality soy, made for Zimbabwe.</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Crestmark Enterprises manufactures high-quality soy-based food products for households, retailers, restaurants, institutions and commercial customers across Zimbabwe.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Quality', 'Integrity', 'Innovation', 'Community', 'Sustainability'].map((value) => (
                <div key={value} className="flex items-center gap-3 border border-border px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-gold" />
                  <span className="font-serif text-xl">{value}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="mt-8">
              <Link to="/shop">Shop Products</Link>
            </Button>
          </div>
          <img
            src={heroProductImage}
            alt="Soybeans and Crestmark soy products"
            loading="lazy"
            width={1200}
            height={756}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}
