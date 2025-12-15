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








import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Homepage from "../pages/homepage.jsx";
import LoginPage from "../pages/login.jsx";
import RegisterPage from "../pages/register.jsx";
import Checkout from "../pages/Checkout.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import GuestRoute from "./GuestRouter.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes WITHOUT MainLayout (No Header/Footer) */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Routes WITH MainLayout (Header + Footer) */}
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />

          {/* Protected Routes - Only accessible when logged in */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen flex items-center justify-center text-2xl">
                404 - Page Not Found 🌿
              </div>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}