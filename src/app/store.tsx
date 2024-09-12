import {configureStore} from "@reduxjs/toolkit";
import cart from "./features/CartSlice";
import products from "./features/ProductsSlice";
import categories from "./features/CategoriesSlice";
import orders from "./features/OrderSlice";
import users from "./features/UserSlice";
import admin from "./features/AdminSlice";

export const store = configureStore({
  reducer: {
    categories,
    products,
    cart,
    orders,
    users,
    admin
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch