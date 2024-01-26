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
import User from './dashboard/panelPages/User/User'
import CustomerOrders from './dashboard/panelPages/CustomerOrders/CustomerOrders'
import Products from './dashboard/panelPages/Products/Products'
import NewProduct from './dashboard/panelPages/newProduct/NewProduct'
import ProductInfo from './dashboard/panelPages/ProductInfo/ProductInfo'

import Tickets from './dashboard/panelPages/Tickets/Tickets'
import Product from './dashboard/panelPages/Product/Product'
import Orders from './dashboard/panelPages/Orders/Orders'
// import NewProduct from './dashboard/panelPages/newProduct/NewProduct'
import EditProfile from "./components/userProfile/EditProfile/EditProfile"
import UserComments from "./components/userProfile/UserComments/UserComments"
import UserHelp from "./components/userProfile/UserHelp/UserHelp"
import Payment_status_page from "./pages/Payment_status_page"
import SoftLand_Plus_page from "./pages/SoftLand_Plus_page"
import UserTickets from "./components/userProfile/UserTickets/UserTickets"

const mainRoutes = [
    { path: "/", element: <MainPage /> },

    { path: '/admin-panel/', element: <Panel_main_page><Home /></Panel_main_page> },
    { path: '/admin-panel/users', element: <Panel_main_page><UserList /></Panel_main_page> },
    { path: '/admin-panel/orders', element: <Panel_main_page><Orders /></Panel_main_page> },
    { path: '/admin-panel/products', element: <Panel_main_page><Products /></Panel_main_page> },
    { path: '/admin-panel/newProduct', element: <Panel_main_page><NewProduct /></Panel_main_page> },
    { path: '/admin-panel/Tickets', element: <Panel_main_page><Tickets /></Panel_main_page> },
    { path: '/admin-panel/product/:productID', element: <Panel_main_page><Product /></Panel_main_page> },
    { path: '/admin-panel/user/:userID', element: <Panel_main_page><User /></Panel_main_page> },
    { path: '/admin-panel/ProductInfo/:productID', element: <Panel_main_page><ProductInfo /></Panel_main_page> },
    { path: '/admin-panel/customers/orders', element: <Panel_main_page><CustomerOrders /></Panel_main_page> },

    { path: "/login", element: <LoginPage /> },
    { path: "/sign-up", element: <SignupPage /> },
    { path: "/products/:productId", element: <ProductPage /> },
    { path: "/consultation", element: <ConsultationPage /> },
    { path: "/forgot-pass", element: <ForgotPassPage /> },
    { path: "/reset-pass/:userToken", element: <ResetPassPage /> },
    { path: "/checkout/cart/", element: <ShoppingCartPage /> },
    { path: "/checkout/:status", element: <Payment_status_page /> },
    { path: "/soft-land-plus", element: <SoftLand_Plus_page /> },

    { path: "/user/profile/", element: <UserProfilePage><EditProfile /></UserProfilePage> },
    { path: "/user/profile/edit", element: <UserProfilePage><EditProfile /></UserProfilePage> },
    { path: "/user/profile/comments", element: <UserProfilePage><UserComments /></UserProfilePage> },
    { path: "/user/profile/help", element: <UserProfilePage><UserHelp /></UserProfilePage> },
    { path: "/user/profile/ticket", element: <UserProfilePage><UserTickets /></UserProfilePage> },
    { path: "*", element: <NotFoundPage /> }
]

export default mainRoutes