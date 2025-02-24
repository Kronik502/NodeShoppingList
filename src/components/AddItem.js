import React, { useState } from 'react';
import './AddItem.css';

const AddItem = () => {
  const [item, setItem] = useState({ name: '', quantity: '', description: '', price: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset any previous error

    // Validate fields
    if (!item.name || !item.quantity || !item.description || !item.price) {
      setError('Please fill in all fields!');
      return;
    }

    // Ensure quantity is a positive integer
    const quantity = parseInt(item.quantity, 10);
    if (isNaN(quantity) || quantity <= 0) {
      setError('Quantity must be a positive number!');
      return;
    }

    // Ensure price is a positive number
    const price = parseFloat(item.price);
    if (isNaN(price) || price <= 0) {
      setError('Price must be a positive number!');
      return;
    }

    // Create a new item with correct data types
    const newItem = {
      ...item,
      quantity: quantity,
      price: price,
    };

    // Sending the new item to the backend (or dispatch to Redux if necessary)
    try {
      const response = await fetch('http://localhost:5000/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to add item');
        return;
      }

      // Reset the form after successful submission
      setItem({ name: '', quantity: '', description: '', price: '' });
    } catch (err) {
      setError('An error occurred while adding the item. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="add-item-form">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleInputChange}
          placeholder="Item Name"
        />
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          min="1"
        />
        <input
          type="text"
          name="description"
          value={item.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={item.price}
          onChange={handleInputChange}
          placeholder="Price"
          min="0.01"
          step="any"
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
