Shopping List Application

A simple shopping list application built with React and Redux. This app allows users to add, update, and remove items from their shopping list with ease. The UI is designed to be user-friendly, with clear input fields and buttons that toggle between viewing and editing modes.

Features:
- Add Items: Add new items to your shopping list with a name, quantity, price, and description.
- Edit Items: Toggle between viewing and editing item details by clicking the "Edit" button.
- Remove Items: Easily remove items from your shopping list.
- Responsive Design: The application is fully responsive and works well on both desktop and mobile devices.
- Styled UI: The user interface is designed to be simple, intuitive, and visually appealing with smooth transitions.

Technologies Used:
- React: For building the user interface.
- Redux: For managing the state of the shopping list.
- CSS: Custom CSS for styling the components and ensuring a pleasant user experience.

Setup:
To run this project locally, follow these steps:

1. Clone the Repository
   git clone https://github.com/Kronik502/shopping-list-app.git
   cd shopping-list-app

2. Install Dependencies
   Make sure you have Node.js and npm installed. Then, run the following command to install the required dependencies:
   npm install

3. Start the Development Server
   Once the dependencies are installed, run the following command to start the development server:
   npm start

   Your app will be available at http://localhost:3000/ in your browser.

Folder Structure:
- /src
  - /actions
    shoppingListActions.js    # Redux actions for updating/removing items
  - /components
    Item.js                   # The item component (editable/viewable)
  - /reducers
    shoppingListReducer.js    # Redux reducer to handle state changes for items
  - App.js                    # Main React component
  - index.js                  # Entry point for the React app
  - /styles
    Item.css                  # Styles for the Item component
  - package.json              # Project metadata and dependencies

Usage:
1. View an Item: The item details are displayed with the name, quantity, price, and description. You can toggle between the view and edit modes by clicking the "Edit" button.

2. Edit an Item: In edit mode, modify the details of the item, and then click "Save" to update it. You can also cancel the edit by clicking the "Cancel" button.

3. Remove an Item: To remove an item from the list, click the "Remove" button. This action will remove the item from the shopping list.

Future Improvements:
- Add Validation: Currently, the app doesn't have validation for input fields. Adding validation would improve the user experience.
- Persist Data: Integrating a backend or local storage to persist the shopping list would allow the app to remember the list across sessions.
- Enhanced UI: We can add more interactive elements, such as sorting and filtering the shopping list.

License:
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments:
- Thanks to React and Redux for their powerful state management features.
- Special thanks to CSS for making it easy to style the app and ensure it looks good across devices.

  image
  ![image](https://github.com/user-attachments/assets/fb4cc96a-59e0-4095-bc46-d4778e95e5d6)

