import SEO from "@/components/common/SEO";

const Contact = () => (
  <main className="container mx-auto px-4 py-6">
    <SEO title="Contact Us — FusionKart AI" description="Get in touch with FusionKart AI support." canonical="/contact" />
    <h1 className="mb-4 text-2xl font-semibold">Contact Us</h1>
    <section className="prose dark:prose-invert max-w-none">
      <p>Need help? Email support@fusionkart.ai and we’ll respond within 1 business day.</p>
      <p>For urgent order issues, include your order ID in the subject line.</p>
    </section>
  </main>
);

export default Contact;
