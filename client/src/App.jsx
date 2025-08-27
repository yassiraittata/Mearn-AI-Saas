import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitle from "./pages/BlogTitle";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/ai",
    element: <Layout />,
    children: [
      {
        path: "",
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
      {
        path: "generate-images",
        element: <GenerateImages />,
      },
      {
        path: "remove-background",
        element: <RemoveBackground />,
      },
      {
        path: "remove-object",
        element: <RemoveObject />,
      },
      {
        path: "review-resume",
        element: <ReviewResume />,
      },
      {
        path: "community",
        element: <Community />,
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
