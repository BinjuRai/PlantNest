// import { Children, createContext, useEffect, useState } from "react"

// export const AuthContext = createContext()

// const AuthContextProvider = ({children}) => {
//     const [ user, setUser ] = useState(null)
//     const [ loading, setLoading ] = useState(true)

//     const login = (userData , token) => {
//         setLoading(true)
//         localStorage.setItem("token", token)
//         localStorage.setItem("user", JSON.stringify(userData))
//         setUser(userData)
//         setLoading(false)
//     }
//    const logout = (callback) => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     if (callback) callback(); // trigger navigation after logout
// };

//     useEffect(() => {
//         setLoading(true)
//         const token =localStorage.getItem("token")
//         const storedUser = localStorage.getItem("user")
//         if (token && storedUser){
//             setUser(JSON.parse(storedUser))
//         }else{
//             logout()
//         }
//         setLoading(false)
//     }, [])
//     return (
//         <AuthContext.Provider 
//             value = { {user,login, loading,logout,isAuthenticated: user !== null}}
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }
// export default AuthContextProvider


import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setRedirectPath(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const value = {
    user,
    isLoading,
    loading: isLoading, // Alias for backward compatibility
    login,
    logout,
    isAuthenticated,
    isAdmin,
    redirectPath,
    setRedirectPath, // ✅ MAKE SURE THIS IS INCLUDED
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;