import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { UserCircle2, CalendarCheck,CalendarSync ,ArrowLeft } from "lucide-react";

export default function TutorialDetail() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const { data } = await api.get(`/tutorials/${id}`);
        setTutorial(data);
        setUsername(data.user.username);
        
      } catch (err) {
        console.error("Error fetching tutorial:", err);
      }
    };

    fetchTutorial();
  }, [id]);

  if (!tutorial)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading tutorial...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Back Links */}
      <div className="flex flex-wrap justify-between items-center mb-8">
        <Link
          to="/tutorials"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to All Tutorials
        </Link>

        <Link
          to="/tutorials/my"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to My Tutorials
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        {tutorial.title}
      </h1>

      {/* Author & Meta Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 text-gray-600">
        <div className="flex items-center gap-2">
          <UserCircle2 className="w-6 h-6 text-indigo-500" />
          <span className="font-medium">{username || "Unknown Author"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CalendarCheck className="w-4 h-4 text-indigo-500" />
          <span>
            {new Date(tutorial.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <CalendarSync className="w-4 h-4 text-indigo-500" />
          <span>
            {new Date(tutorial.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-indigo-500 pl-4 bg-indigo-50 p-3 rounded-md transition-all">
        {tutorial.description}
      </p>

      {/* Published Status */}
      <div className="mt-6">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            tutorial.published
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {tutorial.published ? "Published" : "Draft"}
        </span>
      </div>
    </div>
  );
}
