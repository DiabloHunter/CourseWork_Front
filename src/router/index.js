import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddCategory from '../views/Category/AddCategory'
import Category from '../views/Category/Category'
import Product from '../views/Product/Product'
import AddProduct from '../views/Product/AddProduct'

import EditCategory from "@/views/Category/EditCategory";
import EditProduct from "@/views/Product/EditProduct";
import ShowDetails from "@/views/Product/ShowDetails";
import ListProducts from "@/views/Category/ListProducts";
import Signup from "@/views/Signup";
import Signin from "@/views/Signin";
import WishList from "@/views/Product/WishList";
import Cart from "@/views/Cart";
import Success from "@/views/Payment/Success";
import Failed from "@/views/Payment/Failed";
import Checkout from "@/views/Checkout/Checkout";
import UserOrders from "@/views/Order/UserOrders";
import OrderDetails from "@/views/Order/OrderDetails";
import Profile from "@/views/User/Profile";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
    /*category detail page*/
  {
    path: '/category/show/:id',
    name: 'ListProducts',
    component: ListProducts,
  },
  {
    path: '/admin/category/add',
    name: 'AddCategory',
    component: AddCategory
  },
  {
    path: '/admin/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/admin/product',
    name: 'AdminProduct',
    component: Product,
  },
  {
    path: '/admin/product/new',
    name: 'AddProduct',
    component: AddProduct,
  },
  {
    path: '/admin/category/:id',
    name: 'EditCategory',
    component: EditCategory,
  },
  {
    path: '/admin/product/:id',
    name: 'EditProduct',
    component: EditProduct,
  },
  {
    path: '/product/show/:id',
    name: 'ShowDetails',
    component: ShowDetails,
  },
  {
    path: '/product/show/:id',
    name: 'ShowDetails',
    component: ShowDetails,
  },
    //signUp and signIn
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/wishlist',
    name: 'WishList',
    component: WishList,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component: Success,
  },
  {
    path: '/payment/failed',
    name: 'PaymentFail',
    component: Failed,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/orders',
    name: 'UserOrders',
    component: UserOrders,
  },
  {
    path: '/orders/:id',
    name: 'OrderDetails',
    component: OrderDetails,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
