
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "../services/userService";
import { useAuth } from "../auth/authProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { login, redirectPath, setRedirectPath } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginUserApi,

  onSuccess: (response) => {
  console.log("Login response:", response);

  const { token, user } = response.data.data;

  if (!token || !user) {
    toast.error("Login failed: invalid response from server");
    return;
  }

  login(user, token);
  toast.success(`Welcome back, ${user.name}! 🌿`);

  if (user.role === "admin") {
    navigate("/admin"); // Admin dashboard
  } else {
    const destination = redirectPath || location.state?.from?.pathname || "/";
    setRedirectPath(null);
    navigate(destination);
  }
},

    onError: (error) => {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Floating leaves */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-leaf bg-no-repeat bg-contain animate-float-slow opacity-70"></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-leaf bg-no-repeat bg-contain animate-float-slow delay-2000 opacity-60"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-leaf bg-no-repeat bg-contain animate-float-slow delay-4000 opacity-50"></div>

      {/* Central container */}
      <div className="relative flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl">
        {/* Logo */}
        <div className="absolute top-4 left-4 z-10">
          <img src="src/assets/images/plantnestlogo.svg" alt="PlantNest Logo" className="w-32 h-auto" />
        </div>

        {/* Left Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80"
            alt="Peaceful garden"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-0">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#274E36] secondary-font">
            Your Next Plant Adventure Awaits on PlantNest 🌿
          </h2>

          {redirectPath && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Please login to continue with your purchase
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loginMutation.isLoading}
              className="w-full bg-[#274E36] hover:bg-primary-hover text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 transition"
            >
              {loginMutation.isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-light dark:text-muted-dark">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#274E36] hover:underline font-semibold">
                Register here
              </Link>
            </p>
            <Link
              to="/forgot-password"
              className="block text-sm text-[#274E36] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
        .bg-leaf {
          background-image: url('https://images.unsplash.com/photo-1617196038006-8b0d4b7b8c6c?auto=format&fit=crop&w=64&q=80');
        }
      `}</style>
    </div>
  );
};

export default Login;
