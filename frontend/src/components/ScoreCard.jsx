const ScoreCard = ({ title, score, status, icon }) => {
  const getColor = () => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6 transition hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>

        <span className="text-3xl">{icon}</span>
      </div>

      <div className="mt-5">
        <h2 className="text-4xl font-bold">{score}</h2>

        <div className="w-full h-3 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <div
            className={`${getColor()} h-full`}
            style={{ width: `${score}%` }}
          />
        </div>

        <p className="text-gray-500 mt-4">
          {status}
        </p>
      </div>
    </div>
  );
};

export default ScoreCard;