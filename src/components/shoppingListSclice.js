import { createSlice } from '@reduxjs/toolkit';
import { fetchShoppingList, addItem, updateItem, removeItem } from '../actions/shoppingListActions'; // Correct path

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchShoppingList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShoppingList.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Populate items with the fetched data
      })
      .addCase(fetchShoppingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle error if fetching fails
      })

      // Add item
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); // Add the new item to the list
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle error if any
      })

      // Update item
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; // Update the item
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Remove item
      .addCase(removeItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload); // Remove the item by ID
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default shoppingListSlice.reducer;
