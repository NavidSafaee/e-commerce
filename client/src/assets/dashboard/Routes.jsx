import Home from'./panelPages/home/Home'
import UserList from'./panelPages/Users/UserList'
import Comments from'./panelPages/Comments/Comments'
import Tickets from'./panelPages/Comments/Comments'
import Products from'./panelPages/Products/Products'
import Product from './panelPages/Product/Product'
import Orders from './panelPages/Orders/Orders'
import NewProduct from'./panelPages/newProduct/NewProduct'
import ProductInfo from './panelPages/ProductInfo/ProductInfo'
import User from './panelPages/User/User'


let panel_routes = [
    {path: '/', element: <Home />},
    {path: '/users', element: <UserList />},
    {path: '/Comments', element: <Comments />},
    {path: '/productInfo', element: <ProductInfo />},
    {path: '/user', element: <User />},
    {path: '/tickets', element: <Tickets />},
    {path: '/productInfo/:productID', element: <ProductInfo />},
    {path: '/products', element: <Products />},
    {path: '/product/:productID', element: <Product />},
    {path: '/Orders', element: <Orders />},
    {path: '/NewProduct', element: <NewProduct />},
]

export default panel_routes