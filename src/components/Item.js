import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem, removeItem } from '../actions/shoppingListActions';
import './Item.css'
const Item = ({ item }) => {
  const dispatch = useDispatch();
  const [updatedItem, setUpdatedItem] = useState(item);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Ensure price and quantity are numbers
    if (isNaN(updatedItem.quantity) || updatedItem.quantity <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    if (isNaN(updatedItem.price) || updatedItem.price <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    // Convert to appropriate types before dispatching
    const updatedData = {
      ...updatedItem,
      quantity: parseInt(updatedItem.quantity, 10),  // Ensure quantity is an integer
      price: parseFloat(updatedItem.price),          // Ensure price is a float
    };

    dispatch(updateItem(updatedData));  // Send update request
    setIsEditing(false);
  };

  const handleRemove = () => {
    const confirmation = window.confirm('Are you sure you want to remove this item?');
    if (confirmation) {
      dispatch(removeItem(item.id));  // Send delete request
    }
  };

  return (
    <div className="item">
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={updatedItem.name}
            onChange={handleInputChange}
            placeholder="Item Name"
          />
          <input
            type="number"
            name="quantity"
            value={updatedItem.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            min="1"
          />
          <input
            type="number"
            name="price"
            value={updatedItem.price}
            onChange={handleInputChange}
            placeholder="Price"
            min="0.01"
            step="any"
          />
          <input
            type="text"
            name="description"
            value={updatedItem.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <button className ='button' onClick={handleSave}>Save</button>
          <button  className ='button' onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{item.name}</h3>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Price:</strong> ${item.price}</p>
          <p><strong>Description:</strong> {item.description || "No description available."}</p>
          <button className='edit-btn' onClick={() => setIsEditing(true)}>Edit</button>
          <button className='remove-btn' onClick={handleRemove}>Remove</button>
        </>
      )}
    </div>
  );
};

export default Item;
