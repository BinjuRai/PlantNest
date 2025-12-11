// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import Header from "@/components/layout/Header"
// import Footer from "@/components/layout/Footer"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log("Login:", { email, password })
//   }

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-gradient-to-r from-primary/5 to-accent/5 py-20">
//         <div className="container max-w-md">
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
//             <p className="text-gray-600 mb-8">Sign in to your Plant Nest account</p>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="input-base"
//                   placeholder="you@example.com"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Password</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="input-base"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>

//               <button type="submit" className="btn-primary w-full mt-6">
//                 Sign In
//               </button>
//             </form>

//             <div className="my-6 text-center text-sm text-gray-600">
//               {"Don't have an account? "}
//               <Link href="/register" className="text-primary font-bold hover:underline">
//                 Create one
//               </Link>
//             </div>

//             <button className="w-full py-2 border-2 border-gray-200 rounded-lg hover:border-primary transition text-sm font-medium">
//               Continue with Google
//             </button>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   )
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}
