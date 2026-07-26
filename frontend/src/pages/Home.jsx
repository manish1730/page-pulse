import { useState } from "react";
import {
  FaSearch,
  FaImage,
  FaLink,
  FaLock,
  FaRobot,
  FaBolt,
} from "react-icons/fa";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchForm from "../components/SearchForm";
import api from "../services/api";
import ScoreCard from "../components/ScoreCard";
import RecommendationSection from "../components/Recommendations";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

 const handleAudit = async (url) => {
  try {
    setLoading(true);
    setError("");
    setResult(null);

    const response = await api.post("/audit", {
      url,
    });
    if (response.data.success) {
   setResult(response.data.data);
  }
  } catch (err) {
   setError(
  err.response?.data?.message ||
  err.message ||
  "Unable to analyze the website."
);
  } finally {
    setLoading(false);
  }
};

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

          <SearchForm
            onSubmit={handleAudit}
            loading={loading}
          />
          {error && (
         <div className="mt-6 rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3">
          {error}
         </div>
         )}
         {result && (
  <div className="mt-12">
    {/* Overall */}
    <div className="bg-white rounded-2xl shadow-lg border p-8 mb-8">
      <h2 className="text-2xl font-bold">
        Overall Website Health
      </h2>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
        <div>
          <p className="text-6xl font-bold text-blue-600">
            {result?.overall?.score}
          </p>

          <p className="text-xl text-gray-600 mt-2">
            Grade {result.overall?.grade}
          </p>
        </div>

        <div className="text-left max-w-lg mt-6 md:mt-0">
          <p className="font-semibold text-lg">
           {result.overall?.status}
          </p>

          <p className="text-gray-600 mt-2">
            {result.overall?.summary}
          </p>
        </div>
      </div>
    </div>

    {/* Individual Scores */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ScoreCard
  title="SEO"
  score={result.seo?.score ?? 0}
status={result.seo?.status ?? "N/A"}
  icon={<FaSearch />}
/>

<ScoreCard
  title="Images"
  score={result.images.score}
  status={result.images.status}
  icon={<FaImage />}
/>

<ScoreCard
  title="Links"
  score={result.links.score}
  status={result.links.status}
  icon={<FaLink />}
/>

<ScoreCard
  title="Security"
  score={result.security.score}
  status={result.security.status}
  icon={<FaLock />}
/>

<ScoreCard
  title="Robots"
  score={result.robots.score}
  status={result.robots.status}
  icon={<FaRobot />}
/>

<ScoreCard
  title="Performance"
  score={result.performance.score}
  status={result.performance.status}
  icon={<FaBolt />}
/>
    </div>
  </div>
)}
{result && (
  <div className="mt-10 space-y-6">
    <RecommendationSection
      title="SEO"
      issues={result.seo.issues || []}
      recommendations={result.seo.recommendations || []}
    />

    <RecommendationSection
      title="Images"
      issues={result.images.issues || []}
      recommendations={result.images.recommendations || []}
    />

    <RecommendationSection
      title="Links"
      issues={result.links.issues || []}
      recommendations={result.links.recommendations || []}
    />

    <RecommendationSection
      title="Security"
      issues={result.security.issues || []}
      recommendations={result.security.recommendations || []}
    />

    <RecommendationSection
      title="Robots"
      issues={result.robots.issues || []}
      recommendations={result.robots.recommendations || []}
    />

    <RecommendationSection
      title="Performance"
      issues={result.performance.issues || []}
      recommendations={result.performance.recommendations || []}
    />
  </div>
)}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;