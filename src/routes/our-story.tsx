import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story | Crestmark Enterprises" },
      { name: "description", content: "The story behind Crestmark Enterprises: modern Zimbabwean soy production built around quality, integrity, community and trusted nutrition." },
      { property: "og:title", content: "Our Story | Crestmark Enterprises" },
      { property: "og:description", content: "From Zimbabwean production to household and commercial soy nutrition." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/our-story" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/our-story" }],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <main className="min-h-screen bg-primary pt-28 text-primary-foreground">
      <section className="section-y pt-12">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">Our Story</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-7xl">Trusted nutrition from a modern local manufacturer.</h1>
          <div className="mt-14 grid gap-8">
            {[
              ['01', 'A local food manufacturing vision', 'Crestmark exists to bring high-quality soy-based foods to households, retailers, restaurants, institutions and commercial customers across Zimbabwe.'],
              ['02', 'Products for everyday reliability', 'The range focuses on practical soy foods and functional ingredients: tofu, instant soy porridge, vital gluten and soy seasoning.'],
              ['03', 'A partner for growth', 'Crestmark supports customers who need consistent supply, responsive communication and nutrition-focused products.'],
            ].map(([number, title, text]) => (
              <article key={number} className="grid gap-5 border-t border-primary-foreground/20 py-8 md:grid-cols-[10rem_minmax(0,1fr)]">
                <span className="font-serif text-6xl text-accent-gold">{number}</span>
                <div>
                  <h2 className="font-serif text-3xl">{title}</h2>
                  <p className="mt-3 max-w-3xl text-lg leading-8 text-primary-foreground/75">{text}</p>
                </div>
              </article>
            ))}
          </div>
          <Button asChild size="lg" className="mt-8">
            <Link to="/contact">Become a Partner <ArrowRight /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
