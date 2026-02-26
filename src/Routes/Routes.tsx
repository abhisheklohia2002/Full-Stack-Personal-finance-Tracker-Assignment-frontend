import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Dashboard from "../layout/Dashboard";
import NonAuth from "../layout/NonAuth";
import Login from "../components/Login";
import Protected from "../layout/Protected";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <Protected />,
        children: [
          { index: true, element: <Dashboard /> },
          // later: { path: "transactions", element: <Transactions /> }
        ],
      },
      {
        path: "auth",
        element: <NonAuth />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);
