import { Link } from "@tanstack/react-router";
import { Menu, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { displayWhatsappNumber, formatPrice, products, whatsappNumber } from "@/lib/crestmark-products";
import { useCart } from "@/lib/crestmark-cart";

type CustomerForm = {
  name: string;
  phone: string;
  location: string;
  notes: string;
};

const navItems = [
  { label: "About", to: "/about" },
  { label: "Products", to: "/shop" },
  { label: "Our Story", to: "/our-story" },
  { label: "Contact", to: "/contact" },
] as const;

export function CrestmarkShell({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-all duration-500",
          scrolled || menuOpen
            ? "border-border bg-background/90 shadow-elegant backdrop-blur-xl"
            : "border-transparent bg-transparent text-hero-foreground",
        )}
      >
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:flex sm:justify-between sm:px-8">
          <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label="Crestmark home">
            <span className="grid h-10 w-10 shrink-0 place-items-center border border-current/30 font-serif text-lg leading-none">
              C
            </span>
            <span className="min-w-0">
              <span className="block truncate font-serif text-lg uppercase tracking-[0.22em] sm:text-xl">
                Crestmark
              </span>
              <span className="block truncate text-[0.65rem] uppercase tracking-[0.28em] opacity-75">
                Quality Soy
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.24em] lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="transition-opacity hover:opacity-70"
                activeProps={{ className: "text-accent-gold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Open cart with ${itemCount} items`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag />
              {itemCount > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent-gold px-1 text-[0.68rem] font-bold text-accent-gold-foreground">
                  {itemCount}
                </span>
              ) : null}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "grid overflow-hidden border-t border-border bg-background/95 px-5 text-foreground transition-all duration-500 lg:hidden",
            menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-transparent",
          )}
        >
          <nav className="min-h-0 space-y-1 py-5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block py-3 font-serif text-2xl"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {children}

      <Button
        type="button"
        className="fixed inset-x-5 bottom-5 z-30 h-14 shadow-floating md:hidden"
        aria-label={`Open cart with ${itemCount} items`}
        onClick={() => setCartOpen(true)}
      >
        <ShoppingBag /> Cart {itemCount > 0 ? `(${itemCount})` : ""}
      </Button>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}

function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { lines, itemCount, orderTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [form, setForm] = useState<CustomerForm>({ name: "", phone: "", location: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const detailedLines = lines
    .map((line) => ({ ...line, product: products.find((product) => product.id === line.productId) }))
    .filter((line) => Boolean(line.product));

  const canSend = form.name.trim() && form.phone.trim() && form.location.trim() && detailedLines.length > 0;

  const totalLabel = orderTotal === null ? "To be confirmed" : `USD ${orderTotal.toFixed(2)}`;

  const whatsappHref = useMemo(() => {
    const orderLines = detailedLines
      .map((line) => `• ${line.product?.name} (${line.packSize}) × ${line.quantity}`)
      .join("\n");
    const notes = form.notes.trim() ? `\nNotes: ${form.notes.trim()}\n` : "";
    const message = `Hello Crestmark Enterprises 👋\n\nI would like to place an order:\n\nOrder\n${orderLines}\n\nTotal: ${totalLabel}\n\nCustomer details\nName: ${form.name.trim()}\nPhone: ${form.phone.trim()}\nDelivery location: ${form.location.trim()}${notes}\nPlease confirm availability, current pricing and delivery arrangements.\n\nThank you.`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [detailedLines, form, totalLabel]);

  const handleSubmit = () => {
    setSubmitted(true);
    if (!canSend) return;
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col border-border bg-background p-0 sm:max-w-xl">
        <SheetHeader className="border-b border-border px-6 py-6 text-left">
          <SheetTitle className="font-serif text-3xl">Your Order</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Review your selection, then send it directly to Crestmark on WhatsApp.
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {detailedLines.length === 0 ? (
            <div className="grid min-h-72 place-items-center border border-border text-center">
              <div className="max-w-xs px-6">
                <ShoppingBag className="mx-auto mb-5 h-10 w-10 text-accent-gold" />
                <p className="font-serif text-2xl">Your cart is empty.</p>
                <p className="mt-2 text-sm text-muted-foreground">Add Crestmark products to begin an order.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {detailedLines.map((line) => {
                const product = line.product;
                if (!product) return null;
                const subtotal = product.price === null ? "Confirm price" : `USD ${(product.price * line.quantity).toFixed(2)}`;

                return (
                  <article key={`${line.productId}-${line.packSize}`} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-b border-border pb-5">
                    <img
                      src={product.image}
                      alt={product.alt}
                      loading="lazy"
                      width={160}
                      height={160}
                      className="aspect-square w-full object-cover"
                    />
                    <div className="min-w-0">
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate font-serif text-xl">{product.name}</h3>
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{line.packSize}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Remove ${product.name}`}
                          onClick={() => removeFromCart(line.productId, line.packSize)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                      <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
                        <div className="flex items-center border border-border">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Decrease ${product.name}`}
                            onClick={() => updateQuantity(line.productId, line.packSize, line.quantity - 1)}
                          >
                            <Minus />
                          </Button>
                          <span className="w-9 text-center text-sm font-semibold">{line.quantity}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Increase ${product.name}`}
                            onClick={() => updateQuantity(line.productId, line.packSize, line.quantity + 1)}
                          >
                            <Plus />
                          </Button>
                        </div>
                        <p className="text-right text-sm font-semibold">{subtotal}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {detailedLines.length > 0 ? (
            <section className="mt-8 space-y-4" aria-labelledby="checkout-heading">
              <div className="flex items-center justify-between border-y border-border py-4">
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">Order Total</span>
                <span className="font-serif text-2xl">{totalLabel}</span>
              </div>
              <div className="space-y-4">
                <h3 id="checkout-heading" className="font-serif text-2xl">Guest details</h3>
                <FormField label="Full Name" error={submitted && !form.name.trim()}>
                  <Input
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    autoComplete="name"
                  />
                </FormField>
                <FormField label="WhatsApp Number" error={submitted && !form.phone.trim()}>
                  <Input
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </FormField>
                <FormField label="Delivery Location" error={submitted && !form.location.trim()}>
                  <Input
                    value={form.location}
                    onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
                    autoComplete="street-address"
                  />
                </FormField>
                <FormField label="Optional Order Notes">
                  <Textarea
                    value={form.notes}
                    onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                    rows={4}
                  />
                </FormField>
              </div>
            </section>
          ) : null}
        </div>

        <div className="border-t border-border bg-secondary/55 p-6">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span>{itemCount} item{itemCount === 1 ? "" : "s"}</span>
            <span>WhatsApp {displayWhatsappNumber}</span>
          </div>
          <Button type="button" className="h-13 w-full" disabled={detailedLines.length === 0} onClick={handleSubmit}>
            Order via WhatsApp
          </Button>
          {submitted && !canSend ? (
            <p className="mt-3 text-sm text-destructive">Please complete your name, WhatsApp number and delivery location.</p>
          ) : null}
          {detailedLines.length > 0 ? (
            <Button type="button" variant="ghost" className="mt-3 w-full" onClick={clearCart}>
              Clear cart
            </Button>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function FormField({ label, error, children }: { label: string; error?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className={cn("text-xs uppercase tracking-[0.2em]", error ? "text-destructive" : "text-muted-foreground")}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">Required</p> : null}
    </div>
  );
}

export function ProductCard({ product, featured = false }: { product: (typeof products)[number]; featured?: boolean }) {
  const [quantity, setQuantity] = useState(1);
  const [packSize, setPackSize] = useState(product.packSizes[0] ?? "Standard pack");
  const { addToCart } = useCart();

  return (
    <article className={cn("group grid border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant", featured ? "lg:grid-rows-[auto_1fr]" : "")}>
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block overflow-hidden" aria-label={`View ${product.name}`}>
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          width={1200}
          height={912}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="grid gap-5 p-5 sm:p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent-gold">{product.category}</p>
          <h3 className="mt-3 font-serif text-3xl leading-tight">{product.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
        </div>
        <div className="grid gap-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.availability}</span>
          </div>
          <label className="sr-only" htmlFor={`${product.id}-pack`}>Pack size</label>
          <select
            id={`${product.id}-pack`}
            value={packSize}
            onChange={(event) => setPackSize(event.target.value)}
            className="h-11 w-full border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
          >
            {product.packSizes.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
            <div className="flex h-11 items-center border border-border">
              <Button type="button" variant="ghost" size="icon" aria-label={`Decrease ${product.name} quantity`} onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                <Minus />
              </Button>
              <span className="w-9 text-center text-sm font-semibold">{quantity}</span>
              <Button type="button" variant="ghost" size="icon" aria-label={`Increase ${product.name} quantity`} onClick={() => setQuantity((value) => Math.min(99, value + 1))}>
                <Plus />
              </Button>
            </div>
            <Button type="button" onClick={() => addToCart({ product, packSize, quantity })}>
              Add to Cart
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" onClick={() => addToCart({ product, packSize, quantity: 1 })}>
              Quick View
            </Button>
            <Button asChild variant="ghost">
              <Link to="/products/$slug" params={{ slug: product.slug }}>View Product</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
