const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            PagePulse
          </h1>

          <p className="text-gray-500 text-sm">
            Production Website Audit Tool
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          v1.0
        </span>
      </div>
    </header>
  );
};

export default Header;