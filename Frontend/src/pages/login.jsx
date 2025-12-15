// // "use client"

// // import { useState } from "react"
// // import Link from "next/link"
// // import Header from "@/components/layout/Header"
// // import Footer from "@/components/layout/Footer"

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")

// //   const handleSubmit = (e) => {
// //     e.preventDefault()
// //     console.log("Login:", { email, password })
// //   }

// //   return (
// //     <>
// //       <Header />
// //       <main className="min-h-screen bg-gradient-to-r from-primary/5 to-accent/5 py-20">
// //         <div className="container max-w-md">
// //           <div className="bg-white rounded-lg shadow-lg p-8">
// //             <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
// //             <p className="text-gray-600 mb-8">Sign in to your Plant Nest account</p>

// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   className="input-base"
// //                   placeholder="you@example.com"
// //                   required
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">Password</label>
// //                 <input
// //                   type="password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   className="input-base"
// //                   placeholder="••••••••"
// //                   required
// //                 />
// //               </div>

// //               <button type="submit" className="btn-primary w-full mt-6">
// //                 Sign In
// //               </button>
// //             </form>

// //             <div className="my-6 text-center text-sm text-gray-600">
// //               {"Don't have an account? "}
// //               <Link href="/register" className="text-primary font-bold hover:underline">
// //                 Create one
// //               </Link>
// //             </div>

// //             <button className="w-full py-2 border-2 border-gray-200 rounded-lg hover:border-primary transition text-sm font-medium">
// //               Continue with Google
// //             </button>
// //           </div>
// //         </div>
// //       </main>
// //       <Footer />
// //     </>
// //   )
// // }
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(form);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="email" placeholder="Email" onChange={handleChange} required />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Login</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// }





// this is bottom one is the working one

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import UserService from "../services/userService";
// import { GoogleLogin } from "@react-oauth/google";
// import * as jwt_decode from "jwt-decode";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await UserService.login(form); // { user, token }
//       login(data.user, data.token);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
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

//       // Demo: login with Google info as token
//       login(userData, credentialResponse.credential);
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       setError("Google login failed");
//     }
//   };

//   const handleGoogleError = () => {
//     setError("Google login failed");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-100 p-6">
//       <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full">
//         <h3 className="text-lg mb-6 text-center">Welcome back! Please sign in.</h3>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2"
//             required
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
//             Login
//           </button>
//         </form>

//         <div className="my-4 text-center">
//           <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
//         </div>

//         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//         {/* New Register button */}
//         <p className="text-center mt-4 text-sm">
//           Don’t have an account?{" "}
//           <button
//             onClick={() => navigate("/register")}
//             className="text-green-700 font-semibold"
//           >
//             Register now
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "../services/userService";
// import { useAuth } from "../hooks/useAuth";
import { useAuth } from "../auth/authProvider";

import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { login, redirectPath, setRedirectPath } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (response) => {
      const { token, user } = response.data;
      login(user, token);
      toast.success(`Welcome back, ${user.name}! 🌿`);

      // Redirect to saved path or home
      const destination = redirectPath || location.state?.from?.pathname || "/";
      setRedirectPath(null); // Clear redirect path
      navigate(destination);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
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
    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
      <div className="max-w-md w-full bg-surface-light dark:bg-surface-dark p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Login to PlantNest 🌿
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
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
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
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 transition"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-muted-light dark:text-muted-dark">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-semibold">
              Register here
            </Link>
          </p>
          <Link
            to="/forgot-password"
            className="block text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;