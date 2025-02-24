import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingList } from './actions/shoppingListActions';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access loading and error state for shoppingList and auth
  const { loading, error } = useSelector((state) => state.shoppingList);
  const { user } = useSelector((state) => state.auth || {});  // Include error here

  useEffect(() => {
    dispatch(fetchShoppingList());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Shopping List</h1>

      {/* Conditional rendering based on user authentication */}
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<AddItem />  }/>
          <Route path="/" element={<ItemList />  }/>
        </Routes>
      ) : (
        <>
          <AddItem />
          <ItemList />
        </>
      )}

      {loading && <p>Loading items...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if it exists */}
    </div>
  );
};

export default App;
