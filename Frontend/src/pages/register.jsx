// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import Header from "@/components/layout/Header"
// import Footer from "@/components/layout/Footer"

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log("Register:", formData)
//   }

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-gradient-to-r from-primary/5 to-accent/5 py-20">
//         <div className="container max-w-md">
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
//             <p className="text-gray-600 mb-8">Join Plant Nest today</p>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="input-base"
//                   placeholder="Your name"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="input-base"
//                   placeholder="you@example.com"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="input-base"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="input-base"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>

//               <button type="submit" className="btn-primary w-full mt-6">
//                 Create Account
//               </button>
//             </form>

//             <div className="my-6 text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link href="/login" className="text-primary font-bold hover:underline">
//                 Sign in
//               </Link>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   )
// }








// this bottom works

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import UserService from "../services/userService";
// import { GoogleLogin } from "@react-oauth/google";
// import * as jwt_decode from "jwt-decode";

// export default function RegisterPage() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await UserService.register(form); // { user, token optional }
      
//       // Optional: auto-login after registration
//       if (data.user && data.token) {
//         login(data.user, data.token);
//         navigate("/");
//       } else {
//         navigate("/login"); // navigate to login if no auto-login
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const decoded = jwt_decode(credentialResponse.credential);
//       const userData = {
//         name: decoded.name,
//         email: decoded.email,
//         picture: decoded.picture,
//       };

//       // Call backend if needed: await UserService.registerWithGoogle(userData)
//       login(userData, credentialResponse.credential);
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       setError("Google registration failed");
//     }
//   };

//   const handleGoogleError = () => {
//     setError("Google registration failed");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-100 p-6">
//       <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full">
//         <h3 className="text-lg mb-6 text-center">Create your account</h3>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="name"
//             placeholder="Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2"
//             required
//           />
//           <input
//             name="email"
//             placeholder="Email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2"
//             required
//           />
//           <input
//             name="phone"
//             placeholder="Phone"
//             value={form.phone}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2"
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2"
//             required
//           />
//           <button type="submit" className="w-full bg-green-700 text-white py-2 rounded">
//             Register
//           </button>
//         </form>

//         <div className="my-4 text-center">
//           <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
//         </div>

//         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <button onClick={() => navigate("/login")} className="text-green-700 font-bold">
//             Login
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }


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

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
  //     <div className="max-w-md w-full bg-surface-light dark:bg-surface-dark p-8 rounded-lg shadow-lg">
  //       <h2 className="text-3xl font-bold text-center mb-6 text-primary">
  //         Join PlantNest 🌿
  //       </h2>

  //       {redirectPath && (
  //         <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
  //           <p className="text-sm text-yellow-800 dark:text-yellow-200">
  //             Create an account to continue with your purchase
  //           </p>
  //         </div>
  //       )}

  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         <div>
  //           <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
  //             Full Name
  //           </label>
  //           <input
  //             type="text"
  //             name="name"
  //             value={formData.name}
  //             onChange={handleChange}
  //             required
  //             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
  //             placeholder="John Doe"
  //           />
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
  //             Email
  //           </label>
  //           <input
  //             type="email"
  //             name="email"
  //             value={formData.email}
  //             onChange={handleChange}
  //             required
  //             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
  //             placeholder="your@email.com"
  //           />
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
  //             Phone
  //           </label>
  //           <input
  //             type="tel"
  //             name="phone"
  //             value={formData.phone}
  //             onChange={handleChange}
  //             required
  //             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
  //             placeholder="1234567890"
  //           />
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             name="password"
  //             value={formData.password}
  //             onChange={handleChange}
  //             required
  //             minLength={6}
  //             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
  //             placeholder="••••••••"
  //           />
  //         </div>

  //         <button
  //           type="submit"
  //           disabled={registerMutation.isPending || loginMutation.isPending}
  //           className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 transition"
  //         >
  //           {registerMutation.isPending || loginMutation.isPending
  //             ? "Creating account..."
  //             : "Register"}
  //         </button>
  //       </form>

  //       <div className="mt-6 text-center">
  //         <p className="text-sm text-muted-light dark:text-muted-dark">
  //           Already have an account?{" "}
  //           <Link to="/login" className="text-primary hover:underline font-semibold">
  //             Login here
  //           </Link>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
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