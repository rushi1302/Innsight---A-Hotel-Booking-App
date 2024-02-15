import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useAppSelector } from "./store/hook";
import { userSelector } from "./store/userSlice";
import Hotels from "./pages/Hotels";
import Cookies from "js-cookie";

function App() {
  const state = useAppSelector(userSelector);
  const user = state.user;
  const isAuthenticate = state.isAuthenticated;
  const cookie = Cookies.get("accessToken");
  console.log(cookie);

  console.log(user);
  console.log(isAuthenticate);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/sign-in",
          element: <Signin />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/hotels",
      element: <Hotels />,
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
