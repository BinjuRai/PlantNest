// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout.jsx";
// import Homepage from "../pages/homepage.jsx";
// import LoginPage from "../pages/login.jsx";
// import RegisterPage from "../pages/register.jsx";

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* <Route path="/state-test" element={<StateManage />}></Route>
//         <Route path="/login-text" element={<Login_text />}></Route> */}

//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Homepage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />

//           {/* <Route path="lesson" element={<UserLessonTable />} /> */}

//           {/* <Route element={<GuestRoute />}>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/reset-password/:token" element={<PasswordReset />} />
//             <Route
//               path="/request-reset-password"
//               element={<RequestPasswordReset />}
//             />
//           </Route> */}

//           {/* <Route path="/normal/*" element={<NormalUserRoute />}>
//             <Route path="" element={<Homepage />} />
//             <Route path="lesson" element={<UserLessonTable />} />
//             <Route path="course" element={<UserCourseTable />} />
//             <Route path="course/:id" element={<UserViewCourseDetail />} />
//             <Route path="courses/:id" element={<NotPaidViewCourseDetail />} />
//             <Route path="wishlist" element={<UserWishlistTable />} />
//             <Route path="course/:id/join" element={<JoinCoursePayment />} />
//             <Route path="lessons/:id" element={<ViewLessonForUser />} />

//             <Route path="dashboard" element={<DashboardScreen />} />
//             <Route path="dashboard/profile" element={<Profile />} />
//             <Route
//               path="dashboard/profile/change-password"
//               element={<ChangePassword />}
//             />

//             <Route path="*" element={<>404 Not Found</>} />
//           </Route> */}
//         </Route>

//         {/* <Route element={<AdminLayout />}>
//           <Route path="/admin/*">
//             <Route path="user" element={<UserManagement />}></Route>
//             <Route path="user/:id/edit" element={<EditUser />}></Route>
//             {/* <Route path='user/:id' element={<ViewUser/>}></Route> */}
//             {/* <Route path="user/create" element={<CreateUsers />}></Route> */}

//             {/* <Route path='Lessons' element={<LessonContent/>}></Route> */}
//             {/* <Route path="Lesson" element={<LessonTable />}></Route>
//             <Route path="CreateLesson" element={<CreateLesson />}></Route>
//             <Route path="lessons/:id" element={<ViewSingleLesson />} />
//             <Route path="lesson/:id/edit" element={<UpdateLesson />}></Route> */}

//             {/* <Route path="lesson/:id" element={<ViewLesson/>}></Route> */}

//             {/* <Route path='courses' element={<Courses/>}></Route> */}
//             {/* <Route path="Course" element={<CourseTable />}></Route>
//             <Route path="course/create" element={<CreateCourse />}></Route>
//             <Route path="course/:id/edit" element={<UpdateCourse />}></Route>
//             <Route path="course/:id" element={<ViewCourse />}></Route>
//             <Route path="payments" element={<AdminPaymentsManager />} /> */}

//             {/* // <Route path='category/create' element={<CreateCategory/>}></Route>
//             // <Route path='category/id' element={<ViewCategory/>}></Route> */}
//           {/* </Route>
//         </Route> } */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout.jsx";
// import AdminLayout from "../layouts/AdminLayout.jsx";

// // Pages
// import Homepage from "../pages/homepage.jsx";
// import LoginPage from "../pages/login.jsx";
// import RegisterPage from "../pages/register.jsx";
// import Checkout from "../pages/Checkout.jsx";

// // Admin Pages
// import AdminDashboard from "../pages/admin/Dashboard.jsx";
// import Products from "../pages/admin/Products.jsx";
// import AddProduct from "../pages/admin/AddProduct.jsx";
// import EditProduct from "../pages/admin/EditProduct.jsx";
// import Categories from "../pages/admin/Category.jsx";
// import AddCategory from "../pages/admin/AddCategory.jsx";

// // Route Guards
// import GuestRoute from "./GuestRouter.jsx";
// import ProtectedRoute from "./ProtectedRoutes.jsx";
// import AdminRoute from "./AdminRouter.jsx";
// import Aboutus from "../pages/aboutus.jsx";
// import CategoryPage from "../pages/Categories.jsx";
// import EditCategory from "../pages/admin/EditCategory.jsx";
// import WishlistPage from "../pages/wishlistPage.jsx";
// import AllProductsPage from "../pages/allProductPage.jsx";
// import CartPage from "../pages/cart.jsx";
// import ProductDetailsPage from "../pages/plantDetails.jsx";

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* ================= PUBLIC ROUTES ================= */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Homepage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/aboutus" element={<Aboutus />} />
//           <Route path="/categories" element={<CategoryPage />} />
//           <Route path="products" element={<AllProductsPage />} />
//           {/* Other public pages like About, Contact can go here */}
//         </Route>

//         {/* ================= GUEST-ONLY ROUTES ================= */}
//         <Route element={<GuestRoute />}>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//                 <Route path="/aboutus" element={<Aboutus />} />
//         </Route>

//         {/* ================= AUTHENTICATED USER ROUTES ================= */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/wishlist" element={<WishlistPage />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/products/:id" element={<ProductDetailsPage />} />
//           {/* Add Wishlist or Profile pages here */}
//         </Route>

//         {/* ================= ADMIN ROUTES ================= */}
//         <Route element={<AdminRoute />}>
//           <Route element={<AdminLayout />}>
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/admin/products" element={<Products />} />
//             <Route path="/admin/products/add" element={<AddProduct />} />
//             <Route path="/admin/products/edit/:id" element={<EditProduct />} />
//             <Route path="/admin/categories" element={<Categories />} />
//             <Route path="/admin/categories/add" element={<AddCategory />} />
//             <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
//           </Route>
//         </Route>

//         {/* ================= 404 PAGE ================= */}
//         <Route
//           path="*"
//           element={
//             <div className="min-h-screen flex items-center justify-center text-2xl">
//               404 - Page Not Found 🌿
//             </div>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

// Pages
import Homepage from "../pages/homepage.jsx";
import LoginPage from "../pages/login.jsx";
import RegisterPage from "../pages/register.jsx";
import Checkout from "../pages/Checkout.jsx";
import OrderSuccess from "../pages/orderSuccess.jsx";
import MyOrders from "../pages/MyOrder.jsx";
import NotificationsPage from "../pages/Notfication.jsx";
import BlogDetails from "../pages/BlogDetails.jsx";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard.jsx";
import Products from "../pages/admin/Products.jsx";
import AddProduct from "../pages/admin/AddProduct.jsx";
import EditProduct from "../pages/admin/EditProduct.jsx";
import Categories from "../pages/admin/Category.jsx";
import AddCategory from "../pages/admin/AddCategory.jsx";
import AdminOrdersPage from "../pages/admin/AdminOrderpage.jsx";

// Route Guards
import GuestRoute from "./GuestRouter.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import AdminRoute from "./AdminRouter.jsx";
import Aboutus from "../pages/aboutus.jsx";
import CategoryPage from "../pages/Categories.jsx";
import EditCategory from "../pages/admin/EditCategory.jsx";
import WishlistPage from "../pages/wishlistPage.jsx";
import AllProductsPage from "../pages/allProductPage.jsx";
import CartPage from "../pages/cart.jsx";
import ProductDetailsPage from "../pages/plantDetails.jsx";
import AdminUsersPage from "../pages/admin/AdminUsersPage.jsx";
import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage.jsx";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage.jsx";
import Blogs from "../pages/blogs.jsx";
import BlogForm from "../pages/admin/BlogForm.jsx";
import AdminBlogs from "../pages/admin/AdminBlogs.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Route>

        {/* ================= GUEST-ONLY ROUTES ================= */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* ================= AUTHENTICATED USER ROUTES ================= */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route path="/admin/products/edit/:id" element={<EditProduct />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/categories/add" element={<AddCategory />} />
            <Route
              path="/admin/categories/edit/:id"
              element={<EditCategory />}
            />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/customers" element={<AdminUsersPage />} />{" "}
            {/* Same as users */}
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/blogs" element={<AdminBlogs />} />
            <Route path="/admin/create" element={<BlogForm />} />
            <Route path="/admin/edit/:id" element={<BlogForm />} />
          </Route>
        </Route>

        {/* ================= 404 PAGE ================= */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-2xl">
              404 - Page Not Found 🌿
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
