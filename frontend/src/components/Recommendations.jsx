const RecommendationSection = ({
  title,
  issues = [],
  recommendations = [],
}) => {
  if (issues.length === 0 && recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        {title}
      </h3>

      {issues.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-red-600 mb-3">
            Issues Found
          </h4>

          <div className="space-y-3">
            {issues.map((issue, index) => (
              <div
                key={index}
                className="border border-red-200 bg-red-50 rounded-lg p-4"
              >
                <p className="font-semibold">
                  {issue.header || issue.type}
                </p>

                <p className="text-sm text-red-600 capitalize">
                  Severity: {issue.severity}
                </p>

                <p className="text-gray-700 mt-2">
                  {issue.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h4 className="font-semibold text-green-600 mb-3">
            Recommendations
          </h4>

          <ul className="list-disc ml-5 space-y-2">
            <div className="space-y-2">
          {recommendations.map((rec, index) => (
        <p key={index} className="text-gray-700">
         • {typeof rec === "string"
          ? rec
          : rec.recommendation}
        </p>
       ))}
      </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecommendationSection;