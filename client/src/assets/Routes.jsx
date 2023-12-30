import ConsultationPage from "./pages/ConsultationPage"
import LoginPage from "./pages/LoginPage"
import MainPage from "./pages/MainPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProductPage from "./pages/ProductPage"
import SignupPage from "./pages/SignupPage"
import ForgotPassPage from "./pages/ForgotPassPage"
import ResetPassPage from "./pages/ResetPassPage"
import ShoppingCartPage from "./pages/ShoppingCartPage"
import UserProfilePage from "./pages/UserProfilePage"

import Panel_main_page from "./dashboard/Panel_main_page"
import Home from './dashboard/panelPages/home/Home'
import UserList from './dashboard/panelPages/Users/UserList'
import Comments from './dashboard/panelPages/Comments/Comments'
import Products from './dashboard/panelPages/Products/Products'
import Product from './dashboard/panelPages/Product/Product'
import Orders from './dashboard/panelPages/Orders/Orders'
import NewProduct from './dashboard/panelPages/newProduct/NewProduct'
import UserActivity from "./components/userProfile/UserActivity/UserActivity"
import EditProfile from "./components/userProfile/EditProfile/EditProfile"
import UserComments from "./components/userProfile/UserComments/UserComments"
import UserHelp from "./components/userProfile/UserHelp/UserHelp"

const mainRoutes = [
    { path: "/", element: <MainPage /> },

    { path: "/admin-panel", element: <Panel_main_page /> },
    { path: '/admin-panel/', element: <Panel_main_page><Home /></Panel_main_page> },
    { path: '/admin-panel/users', element: <Panel_main_page><UserList /></Panel_main_page> },
    { path: '/admin-panel/Comments', element: <Panel_main_page><Comments /></Panel_main_page> },
    { path: '/admin-panel/products', element: <Panel_main_page><Products /></Panel_main_page> },
    { path: '/admin-panel/product/:productID', element: <Panel_main_page><Product /></Panel_main_page> },
    { path: '/admin-panel/Orders', element: <Panel_main_page><Orders /></Panel_main_page> },
    { path: '/admin-panel/NewProduct', element: <Panel_main_page><NewProduct /></Panel_main_page> },

    { path: "/login", element: <LoginPage /> },
    { path: "/sign-up", element: <SignupPage /> },
    { path: "/products/:productId", element: <ProductPage /> },
    { path: "/consultation", element: <ConsultationPage /> },
    { path: "/forgot-pass", element: <ForgotPassPage /> },
    { path: "/reset-pass/:userToken", element: <ResetPassPage /> },
    { path: "/checkout/cart/", element: <ShoppingCartPage /> },

    { path: "/user/profile/", element: <UserProfilePage><UserActivity /></UserProfilePage> },
    { path: "/user/profile/edit", element: <UserProfilePage><EditProfile /></UserProfilePage> },
    { path: "/user/profile/comments", element: <UserProfilePage><UserComments /></UserProfilePage> },
    { path: "/user/profile/help", element: <UserProfilePage><UserHelp /></UserProfilePage> },
    { path: "/user/profile/edit", element: <UserProfilePage><EditProfile /></UserProfilePage> },
    { path: "*", element: <NotFoundPage /> }
]

export default mainRoutes