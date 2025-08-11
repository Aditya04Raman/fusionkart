import SEO from "@/components/common/SEO";

const About = () => (
  <main className="container mx-auto px-4 py-6">
    <SEO title="About — FusionKart AI" description="Our mission is to make shopping smarter with AI." canonical="/about" />
    <h1 className="mb-4 text-2xl font-semibold">About FusionKart AI</h1>
    <section className="prose dark:prose-invert max-w-none">
      <p>We blend seamless UX with AI to help you discover products faster, compare better, and buy with confidence.</p>
    </section>
  </main>
);

export default About;
