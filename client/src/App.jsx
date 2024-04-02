import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";

import ErrorPage from "./pages/errorPage";
import Login from "./pages/Login";
import StudentDetails from "./pages/StudentDetails";
import AddStudent from "./pages/AddStudent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/student-details/:registrationId",
    element: <StudentDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/add-student",
    element: <AddStudent />,
    errorElement: <ErrorPage />,
  },
]);

// 4️⃣ RouterProvider added
export default function App() {
  return <RouterProvider router={router} />;
}
