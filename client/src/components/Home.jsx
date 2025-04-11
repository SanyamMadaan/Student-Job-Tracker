import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        onClick={() => navigate("/login")}
      >
        Login / SignUp
      </button>

      <div className="mt-6 w-full max-w-lg">
        <video
          src="/path-to-your-video.mp4" // Replace with actual video path
          controls
          className="w-full rounded-lg shadow-md"
        ></video>
      </div>
    </div>
  );
}
