// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import './index.css';
// import { GoogleOAuthProvider } from "@react-oauth/google";

// import AppRouter from "./routes/AppRouter.jsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Slide, ToastContainer } from "react-toastify";
// import AuthContextProvider from "./auth/authProvider.jsx";
// const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

// const queryClient = new QueryClient();
// useEffect(() => {
//   document.documentElement.classList.add("dark");
// }, []);


// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//         <GoogleOAuthProvider clientId={CLIENT_ID}>
//     <AuthContextProvider>
//       {/* <WishlistProvider> */}
//       <QueryClientProvider client={queryClient}>
//         <AppRouter />
//         <ToastContainer
//           position="top-center"
//           autoClose={2000}
//           hideProgressBar={false}
//           theme="dark"
//           transition={Slide} //silde, bouce, zoom , flip
//         />
//       </QueryClientProvider>
//       {/* </WishlistProvider> */}
//     </AuthContextProvider>

//         </GoogleOAuthProvider>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import AppRouter from "./routes/AppRouter.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slide, ToastContainer } from "react-toastify";
import AuthContextProvider from "./auth/authProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          theme="dark"
          transition={Slide}
        />
      </QueryClientProvider>
    </AuthContextProvider>
  </StrictMode>
);



