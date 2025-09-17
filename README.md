# Interactive_Data_Explorer
A responsive Interactive Data Explorer built with React, TailwindCSS, and Framer Motion. This project fetches product data from the DummyJSON API , displays it in an engaging UI, and allows users to filter, sort, and explore product details with smooth animations.
🚀 Features: 
        Fetch & Display Products: Responsive product grid with pagination.
        Product Detail View: Modal with extended product info (description, rating, stock, brand, category, and images).
        Filtering: Browse products by category.
        Sorting: Sort by price (low-high, high-low) and title (A-Z, Z-A).
        Loading & Error States: Spinners and graceful error handling.
        Responsive Design: Works seamlessly on mobile, tablet, and desktop.
        Animations:
            Staggered fade-in of product cards.
            Smooth modal transitions for product details.
            Hover micro-interactions for better UX.
🛠️ Tech Stack
Frontend Framework: React (Vite setup)
Language: TypeScript
Styling: Tailwind CSS
Animations: Framer Motion
API: DummyJSON Products API
HTTP Client: Fetch API / Axios
├── src
│   ├── components      # Reusable UI components (Cards, Modals, etc.)
│   ├── pages           # Main pages (Home, Product Details)
│   ├── hooks           # Custom hooks for data fetching
│   ├── utils           # Helper functions (sorting, formatting)
│   └── styles          # Tailwind config & global styles
