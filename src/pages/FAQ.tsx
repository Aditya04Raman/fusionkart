import SEO from "@/components/common/SEO";

const FAQ = () => (
  <main className="container mx-auto px-4 py-6">
    <SEO title="Help & FAQ — FusionKart AI" description="Answers to common questions about shopping, shipping, and returns." canonical="/faq" />
    <h1 className="mb-4 text-2xl font-semibold">Help & FAQ</h1>
    <section className="prose dark:prose-invert max-w-none">
      <h2>Orders & Shipping</h2>
      <p>Most orders ship within 24–48 hours. You’ll receive tracking via email.</p>
      <h2>Returns</h2>
      <p>30-day hassle-free returns. Start a return from your Orders page.</p>
      <h2>Payments</h2>
      <p>We accept major cards and secure wallets. Your data stays safe.</p>
    </section>
  </main>
);

export default FAQ;
