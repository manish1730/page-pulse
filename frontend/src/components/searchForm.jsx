import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchForm = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim()) return;

    onSubmit(url);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 flex flex-col md:flex-row gap-4 justify-center"
    >
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full md:w-[500px] px-5 py-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <FaSearch />

        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </form>
  );
};
export default SearchForm;