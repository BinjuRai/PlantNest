


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUserApi, registerUserApi} from "../services/userService";
// import { useAuth } from "../hooks/useAuth";
import { useAuth } from "../auth/authProvider";

import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();
  const { login, redirectPath, setRedirectPath } = useAuth();

  // Auto-login after registration
  const loginMutation = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (response) => {
      const { token, user } = response.data;
      login(user, token);
      toast.success(`Welcome to PlantNest, ${user.name}! 🌿`);

      // Redirect to saved path or home
      const destination = redirectPath || "/";
      setRedirectPath(null);
      navigate(destination);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUserApi,
    onSuccess: () => {
      toast.success("Registration successful! Logging you in...");
      // Auto-login after successful registration
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
  {/* Floating leaves */}
  <div className="absolute top-10 left-10 w-16 h-16 bg-leaf bg-no-repeat bg-contain animate-float-slow opacity-70" data-speed="0.2"></div>
  <div className="absolute top-1/3 right-20 w-12 h-12 bg-leaf bg-no-repeat bg-contain animate-float-slow delay-2000 opacity-60" data-speed="0.3"></div>
  <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-leaf bg-no-repeat bg-contain animate-float-slow delay-4000 opacity-50" data-speed="0.1"></div>

  {/* Central container */}
  <div className="relative flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl">
    
    {/* PlantNest Logo - Top Right */}
    <div className="absolute top-4 left-4 z-10">
      <img src="src/assets/images/plantnestlogo.svg" alt="PlantNest Logo" className="w-32 h-auto" />
    </div>

    {/* Left side - Form */}
    <div className="md:w-1/2 p-8 mt-8 md:p-12 flex flex-col justify-center relative z-0">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#274E36] secondary-font">
        Connect. Grow. Thrive. <br />With PlantNest 🌿
      </h2>

      {redirectPath && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Create an account to continue with your purchase
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
            placeholder="1234567890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={registerMutation.isPending || loginMutation.isPending}
          className="w-full bg-[#274E36] hover:bg-primary-hover text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 transition"
        >
          {registerMutation.isPending || loginMutation.isPending ? "Creating account..." : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-light dark:text-muted-dark">
          Already have an account?{" "}
          <Link to="/login" className="text-[#274E36] hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>

    {/* Right side - Image */}
    <div className="hidden md:flex md:w-1/2 h-64 md:h-auto overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80"
        alt="Peaceful garden"
        className="w-full h-full object-cover transform transition-transform duration-500"
        data-speed="0.2"
      />
    </div>
  </div>

  {/* Tailwind Animations & Parallax Script */}
  <style jsx>{`
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(10deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    .animate-float-slow { animation: float 6s ease-in-out infinite; }
    .delay-2000 { animation-delay: 2s; }
    .delay-4000 { animation-delay: 4s; }
    .bg-leaf {
      background-image: url('https://images.unsplash.com/photo-1617196038006-8b0d4b7b8c6c?auto=format&fit=crop&w=64&q=80');
    }
  `}</style>

  <script>
    {`
      const parallaxElements = document.querySelectorAll('[data-speed]');
      window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.getAttribute('data-speed'));
          el.style.transform = 'translateY(' + window.scrollY * speed + 'px)';
        });
      });
    `}
  </script>
</div>



};

export default Register;