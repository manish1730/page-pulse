import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-16">

        <section className="text-center">

          <h2 className="text-5xl font-bold text-gray-900">
            Analyze Any Website
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Get an instant SEO, Performance, Security and Accessibility audit
            in seconds.
          </p>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Home;