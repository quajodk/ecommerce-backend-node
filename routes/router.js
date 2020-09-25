const express = require("express");
const Router = express.Router();

const {
  addItems,
  checkout,
  clearCart,
  removeItem,
} = require("../controllers/cart");
const {
  createUser,
  login,
  logout,
  loginById,
  loginAdmin,
} = require("../controllers/user");
const {
  addProduct,
  editProduct,
  getProduct,
  getProducts,
  deleteProduct,
  addCategory,
  getCategories,
} = require("../controllers/product");

// users route
Router.route("/auth/register").post(createUser);
Router.route("/auth/admin/login").post(loginAdmin);
Router.route("/auth/login").post(login);
Router.route("/auth/me/login").post(loginById);
Router.route("/auth/me/:token").get(logout);

// products route
Router.route("/products").post(addProduct);
Router.route("/products").get(getProducts);
Router.route("/products/:id").put(editProduct).delete(deleteProduct);
Router.route("/products/:id").get(getProduct);
Router.route("/products/category").post(addCategory);
Router.route("/products/categories").get(getCategories);

// cart route
Router.route("/me/cart?item").post(addItems);
Router.route("/me/cart/:id").put(removeItem);
Router.route("/checkout/:id").put(checkout);
Router.route("/cart/:id").delete(clearCart);

module.exports = Router;
