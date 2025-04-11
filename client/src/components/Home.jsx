import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Video */}
      <video
        src="https://res.cloudinary.com/dv3vxqkwd/video/upload/v1744378107/nhzwjdtnrgi8u9ryb4d9.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></video>

      {/* Overlay for better readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center">
        {/* Title / Heading */}
        <h1 className="text-white text-4xl font-bold mb-6 text-center">
          Welcome to My Project
        </h1>

        {/* Login / Signup Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
          onClick={() => navigate("/login")}
        >
          Login / Sign Up
        </button>
      </div>
    </div>
  );
}
