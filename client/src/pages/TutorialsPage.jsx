import { useEffect, useState } from "react";
import { useTutorialService } from "../services/TutorialService";
import { Link } from 'react-router';

const TutorialsPage = () => {
  const { getAll } = useTutorialService();
  const [tutorials, setTutorials] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll(1, 10, "")
      .then((res) => {
        setTutorials(res.data || []);
      })
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg">
        Loading tutorials...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 text-lg p-4">
        {error}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        All Tutorials
      </h2>

      {tutorials.length === 0 ? (
        <p className="text-gray-600 text-lg">No tutorials found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tut) => (
            <div
              key={tut.id}
              className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition"
            >
              <Link to={`/tutorials/${tut.id}`} className="text-indigo-600 hover:underline">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tut.title}
              </h3>
              </Link>
              <p className="text-gray-700 mb-3 line-clamp-3">
                {tut.description}
              </p>
              <p className="text-sm text-gray-500">
                Created: {new Date(tut.createdAt).toLocaleDateString()}
              </p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorialsPage;
