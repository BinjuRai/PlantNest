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
import { useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
}
