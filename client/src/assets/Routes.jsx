import ConsultationPage from "./pages/ConsultationPage"
import LoginPage from "./pages/LoginPage"
import MainPage from "./pages/MainPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProductPage from "./pages/ProductPage"
import SignupPage from "./pages/SignupPage"

const routes = [
    {path: "/", element: <MainPage />},
    {path: "/login", element: <LoginPage />},
    {path: "/sign-up", element: <SignupPage />},
    {path: "/products/:productID", element: <ProductPage />},
    {path: "/consultation", element: <ConsultationPage />},
    {path: "*", element: <NotFoundPage />}
]

export default routes