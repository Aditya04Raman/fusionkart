import SEO from "@/components/common/SEO";

const Policies = () => (
  <main className="container mx-auto px-4 py-6">
    <SEO title="Policies — FusionKart AI" description="Read our privacy policy and terms of service." canonical="/policies" />
    <h1 className="mb-4 text-2xl font-semibold">Policies</h1>
    <section className="prose dark:prose-invert max-w-none">
      <h2>Privacy Policy</h2>
      <p>We respect your privacy and only collect data necessary to provide our services.</p>
      <h2>Terms of Service</h2>
      <p>By using FusionKart AI, you agree to our terms governing acceptable use and limitations.</p>
    </section>
  </main>
);

export default Policies;
