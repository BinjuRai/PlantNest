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

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
      <div className="max-w-md w-full bg-surface-light dark:bg-surface-dark p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Join PlantNest 🌿
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
            <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              placeholder="1234567890"
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
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending || loginMutation.isPending}
            className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 transition"
          >
            {registerMutation.isPending || loginMutation.isPending
              ? "Creating account..."
              : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-light dark:text-muted-dark">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;