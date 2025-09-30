import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";
import ProductList from "../pages/customer/ProductList";
import Cart from "../pages/customer/Cart";
import CustomerLogin from "../pages/customer/CustomerLogin";
import CustomerSignup from "../pages/customer/CustomerSignup";
import ProductDetails from "../pages/customer/ProductDetails";

const CustomerRoutes = {
  path: '/',
  element: <CustomerLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'productlist', element: <ProductList /> },
    { path: 'cart', element: <Cart /> },
    { path: 'customer/login', element: <CustomerLogin /> },
    { path: 'customer/signup', element: <CustomerSignup /> },
     { path: "products/:id", element: <ProductDetails /> },
  ],
};

export default CustomerRoutes;