import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoppingList } from "../actions/shoppingListActions"; // Ensure correct import
import Item from "./Item";
import "./Item.css";

const ItemList = () => {
  const dispatch = useDispatch();
  
  // Access items and loading state from Redux store
  const { items, loading } = useSelector((state) => state.shoppingList); // Destructure to access both items and loading
  const error = useSelector((state) => state.shoppingList.error); // Access error if there is one

  useEffect(() => {
    dispatch(fetchShoppingList());
  }, [dispatch]);
  
  console.log(items); // Log this to see the state of items
  
  return (
    <div className="item-list">
      {loading ? (
        <p>Loading items...</p>
      ) : error ? (
        <p>Error: {error}</p> // Display error if there's one
      ) : items?.length === 0 ? (
        <p>No items in your shopping list.</p>
      ) : (
        items.map((item) => <Item key={item.id} item={item} />)
      )}
    </div>
  );
};

export default ItemList;
