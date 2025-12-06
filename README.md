# Clothify - Shopping Cart Demo

A responsive e-commerce demo application built with React and Vite. This student project showcases a clean, accessible shopping experience with product search, filtering, size/color selection, and cart management.

## Features

- **Product Catalog**: Browse through various clothing items including T-shirts, shirts, jeans, jackets, dresses, and hoodies
- **Search & Filter**: Search products by name/description and filter by category
- **Size & Color Selection**: Choose from available sizes and colors for each product
- **Shopping Cart**: Add/remove items, update quantities, and view cart summary
- **Persistent Cart**: Cart data is saved to localStorage and persists across browser sessions
- **Responsive Design**: Mobile-friendly layout with cart drawer for small screens
- **Theme Toggle**: Switch between light and dark themes
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## Tech Stack

- **Frontend**: React 19 with Hooks
- **Build Tool**: Vite
- **Styling**: CSS with CSS custom properties for theming
- **State Management**: React useState and useEffect
- **Data Persistence**: localStorage

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd shopping-cart-demo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Project

### Development Server

To start the development server with hot reload:

```bash
npm run dev
```

This will start the Vite development server. Open your browser and navigate to `http://localhost:5173` (or the URL shown in the terminal).

### Build for Production

To build the project for production:

```bash
npm run build
```

This creates an optimized build in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To run ESLint for code quality checks:

```bash
npm run lint
```

## Project Structure

```
shopping-cart-demo/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css          # Main application styles
│   ├── App.jsx          # Main React component
│   ├── index.css        # Global styles and CSS variables
│   └── main.jsx         # React app entry point
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## Usage

1. **Browse Products**: View the product catalog on the main page
2. **Search**: Use the search bar to find specific products
3. **Filter**: Select a category from the dropdown to filter products
4. **Sort**: Choose sorting options (Popular, Price Low to High, Price High to Low)
5. **Select Options**: Choose size and color for each product
6. **Add to Cart**: Click "Add" to add items to your cart
7. **Manage Cart**: View cart items, update quantities, or remove items
8. **Checkout**: Click "Checkout" to complete your purchase (demo only)
9. **Theme Toggle**: Click the sun/moon icon to switch themes

## Features in Detail

### Cart Management
- Items are grouped by product + size + color combination
- Quantity can be adjusted with +/- buttons or direct input
- Cart persists across browser sessions using localStorage
- Mobile-responsive cart drawer

### Product Data
The application includes 6 sample products with:
- Unique IDs and names
- Prices in Indian Rupees (₹)
- Categories for filtering
- Descriptions
- Available sizes and colors

### Responsive Design
- Desktop: Side-by-side layout with fixed cart panel
- Mobile: Cart opens as a drawer overlay

## Customization

### Adding New Products
Edit the `PRODUCTS` array in `src/App.jsx` to add new items:

```javascript
{ id: 7, name: 'New Product', price: 999, category: 'Category', desc: 'Description', colors: ['color1','color2'], sizes: ['S','M','L'] }
```

### Styling
- Global styles and theme variables are in `src/index.css`
- Component-specific styles are in `src/App.css`
- CSS custom properties are used for theming

## Browser Support

This project works in all modern browsers that support:
- ES6+ JavaScript features
- CSS custom properties
- React 19

## Contributing

This is a student project for learning purposes. Feel free to fork and experiment!

## License

This project is for educational purposes only.

## Author

Ved - [GitHub](https://github.com/Veddd018)
<img width="1899" height="918" alt="Screenshot 2025-12-06 185751" src="https://github.com/user-attachments/assets/4abd6819-ec37-4bfa-9029-214a1ddfe8aa" />

<img width="1898" height="911" alt="image" src="https://github.com/user-attachments/assets/70aa0f67-4a5e-4f9d-ab30-420a818b1e82" />
