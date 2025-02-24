import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/authSlice";
import shoppingListReducer from "./components/shoppingListSclice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingList: shoppingListReducer,
  },
  // No need to manually add 'redux-thunk', it's included by default
});

export default store;
