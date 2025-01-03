import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import Shop from "./routes/Shop.jsx";
import Cart from "./routes/Cart.jsx";
import ErrorComponent from "./components/ErrorComponent.jsx";
import Home from "./routes/Home.jsx";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorComponent />,
        children: [
            {
                errorElement: <ErrorComponent />,
                children: [
                    { index: true, element: <Home /> },
                    { path: "/shop", element: <Shop /> },
                    { path: "/cart", element: <Cart /> },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
