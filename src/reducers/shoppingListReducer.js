const initialState = {
  items: [],
};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ITEMS_SUCCESS":
      return { ...state, items: action.payload };
      
    case "ADD_ITEM_SUCCESS":
      return { ...state, items: [...state.items, action.payload] };
      
    case "UPDATE_ITEM_SUCCESS":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
      
    case "DELETE_ITEM_SUCCESS":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
      
    default:
      return state;
  }
};

export default shoppingListReducer;
