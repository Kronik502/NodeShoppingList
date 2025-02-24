import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/items';

// Add an item
export const addItem = createAsyncThunk('shoppingList/addItem', async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
});

// Update an item
export const updateItem = createAsyncThunk('shoppingList/updateItem', async (item) => {
  const response = await axios.put(`${API_URL}/${item.id}`, item);
  return response.data;
});

// Remove an item
export const removeItem = createAsyncThunk('shoppingList/removeItem', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // Return the item ID to remove it from the state
});

// Fetch all items
export const fetchShoppingList = createAsyncThunk('shoppingList/fetchShoppingList', async () => {
  const response = await axios.get(API_URL);
  return response.data; // Return the list of items
});
