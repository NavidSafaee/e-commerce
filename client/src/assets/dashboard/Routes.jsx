import Home from'./panelPages/home/Home'
import UserList from'./panelPages/Users/UserList'
import Comments from'./panelPages/Comments/Comments'
import Products from'./panelPages/Products/Products'
import Product from './panelPages/Product/Product'
import Orders from './panelPages/Orders/Orders'
import NewProduct from'./panelPages/newProduct/NewProduct'

let panel_routes = [
    {path: '/', element: <Home />},
    {path: '/users', element: <UserList />},
    {path: '/Comments', element: <Comments />},
    {path: '/products', element: <Products />},
    {path: '/product/:productID', element: <Product />},
    {path: '/Orders', element: <Orders />},
    {path: '/NewProduct', element: <NewProduct />},
]

export default panel_routes