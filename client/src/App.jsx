import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitle from "./pages/BlogTitle";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/ai",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "write-article",
        element: <WriteArticle />,
      },
      {
        path: "blog-titles",
        element: <BlogTitle />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
