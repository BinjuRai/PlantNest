
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/state-test" element={<StateManage />}></Route>
        <Route path="/login-text" element={<Login_text />}></Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          {/* <Route path="lesson" element={<UserLessonTable />} /> */}

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password/:token" element={<PasswordReset />} />
            <Route
              path="/request-reset-password"
              element={<RequestPasswordReset />}
            />
          </Route>

          <Route path="/normal/*" element={<NormalUserRoute />}>
            <Route path="" element={<Homepage />} />
            <Route path="lesson" element={<UserLessonTable />} />
            <Route path="course" element={<UserCourseTable />} />
            <Route path="course/:id" element={<UserViewCourseDetail />} />
            <Route path="courses/:id" element={<NotPaidViewCourseDetail />} />
            <Route path="wishlist" element={<UserWishlistTable />} />
            <Route path="course/:id/join" element={<JoinCoursePayment />} />
            <Route path="lessons/:id" element={<ViewLessonForUser />} />
            
            <Route path="dashboard" element={<DashboardScreen />} />
            <Route path="dashboard/profile" element={<Profile />} />
            <Route
              path="dashboard/profile/change-password"
              element={<ChangePassword />}
            />

            <Route path="*" element={<>404 Not Found</>} />
          </Route>
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/*">
            <Route path="user" element={<UserManagement />}></Route>
            <Route path="user/:id/edit" element={<EditUser />}></Route>
            {/* <Route path='user/:id' element={<ViewUser/>}></Route> */}
            <Route path="user/create" element={<CreateUsers />}></Route>

            {/* <Route path='Lessons' element={<LessonContent/>}></Route> */}
            <Route path="Lesson" element={<LessonTable />}></Route>
            <Route path="CreateLesson" element={<CreateLesson />}></Route>
            <Route path="lessons/:id" element={<ViewSingleLesson />} />
            <Route path="lesson/:id/edit" element={<UpdateLesson />}></Route>

            {/* <Route path="lesson/:id" element={<ViewLesson/>}></Route> */}

            {/* <Route path='courses' element={<Courses/>}></Route> */}
            <Route path="Course" element={<CourseTable />}></Route>
            <Route path="course/create" element={<CreateCourse />}></Route>
            <Route path="course/:id/edit" element={<UpdateCourse />}></Route>
            <Route path="course/:id" element={<ViewCourse />}></Route>
            <Route path="payments" element={<AdminPaymentsManager />} />

            {/* // <Route path='category/create' element={<CreateCategory/>}></Route>
            // <Route path='category/id' element={<ViewCategory/>}></Route> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
