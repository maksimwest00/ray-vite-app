// let baseUrl = process.env.REACT_APP_API_URL
let baseUrl = "https://rayhan24.ru/api"

export const ENDPOINTS = {
  signup: `${baseUrl}/create-user`,
  login: `${baseUrl}/login`,
  adminLogin: `${baseUrl}/admin-login`,
  getProducts: `${baseUrl}/products`,
  product: `${baseUrl}/product`,
  getCategories: `${baseUrl}/categories`,
  getCategory: `${baseUrl}/category`,
  getRecipes: `${baseUrl}/recipes`,
  getAllOrders: `${baseUrl}/orders`,
  getUserOrders: `${baseUrl}/orders`, // + user_id
  confirmOrder: `${baseUrl}/orders/confirm`,
  userDetails: `${baseUrl}/user`,
  getMenu: `${baseUrl}/menu`,
  orderDetails: `${baseUrl}/order-details`,
  changeOrderStatus: `${baseUrl}/order-status`,
  user: `${baseUrl}/user`,

  forgetPassword: `${baseUrl}/forget-password`,
  resetPassword: `${baseUrl}/reset-password`,
}
