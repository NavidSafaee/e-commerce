import ConsultationPage from "./pages/ConsultationPage"
import LoginPage from "./pages/LoginPage"
import MainPage from "./pages/MainPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProductPage from "./pages/ProductPage"
import SignupPage from "./pages/SignupPage"
import ForgotPassPage from "./pages/ForgotPassPage"
import ResetPassPage from "./pages/ResetPassPage"

const routes = [
    {path: "/", element: <MainPage />},
    {path: "/login", element: <LoginPage />},
    {path: "/sign-up", element: <SignupPage />},
    {path: "/products/:productID", element: <ProductPage />},
    {path: "/consultation", element: <ConsultationPage />},
    {path: "/forgot-pass", element: <ForgotPassPage />},
    {path: "/reset-pass/:userId", element: <ResetPassPage />},
    {path: "*", element: <NotFoundPage />}
]

export default routes