import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { displayWhatsappNumber } from "@/lib/crestmark-products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Crestmark Enterprises | WhatsApp Orders & Partnerships" },
      { name: "description", content: "Contact Crestmark Enterprises in Zimbabwe for soy product orders, retailer supply, distributor enquiries and commercial partnerships." },
      { property: "og:title", content: "Contact Crestmark Enterprises" },
      { property: "og:description", content: "WhatsApp, phone and email contacts for Crestmark soy product orders and partnerships." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-28">
      <section className="section-y pt-12">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-gold">Contact</p>
            <h1 className="mt-4 font-serif text-5xl leading-none sm:text-7xl">Talk to Crestmark.</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              For orders, supply enquiries and partnership conversations, contact Crestmark directly. WhatsApp is the fastest route for product availability and delivery arrangements.
            </p>
            <Button asChild size="xl" className="mt-8">
              <a href="https://wa.me/263786362216" target="_blank" rel="noreferrer">Open WhatsApp</a>
            </Button>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {[
              [MessageCircle, 'WhatsApp', displayWhatsappNumber],
              [Phone, 'Phone', '+263 784 920 381'],
              [Mail, 'Email', 'infor@crestmark.co.zw'],
              [MapPin, 'Location', 'Zimbabwe'],
            ].map(([Icon, label, value]) => {
              const ContactIcon = Icon as typeof MessageCircle;
              return (
                <article key={label as string} className="bg-background p-6">
                  <ContactIcon className="h-7 w-7 text-accent-gold" />
                  <h2 className="mt-8 font-serif text-2xl">{label as string}</h2>
                  <p className="mt-3 text-muted-foreground">{value as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
