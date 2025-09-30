import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../../components/ProductGrid"; // assumes you have a grid component

const dummyFoods = [
  {
    id: 1,
    title: "Margherita Pizza",
    description: "Classic cheese pizza with tomato sauce and fresh basil",
    category: "pizza",
    price: 499,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    title: "Veg Burger",
    description: "Delicious vegetable burger with fresh lettuce and tomato",
    category: "burger",
    price: 299,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "Pasta Alfredo",
    description: "Creamy white sauce pasta with mushrooms and herbs",
    category: "pasta",
    price: 399,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    title: "Chocolate Shake",
    description: "Rich chocolate milkshake with whipped cream topping",
    category: "beverages",
    price: 199,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    title: "Grilled Sandwich",
    description: "Toasted sandwich with cheese, tomatoes, and basil",
    category: "sandwich",
    price: 249,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    title: "Pepperoni Pizza",
    description: "Spicy pepperoni with mozzarella cheese",
    category: "pizza",
    price: 599,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
  id: 7,
  title: "Chicken Burger",
  description: "Juicy chicken patty with special sauce",
  category: "burger",
  price: 349,
  rating: 4.4,
  image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=500&q=80",
}
,
  {
    id: 8,
    title: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice, no added sugar",
    category: "beverages",
    price: 149,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  }
];

const staticCategories = ["pizza", "burger", "pasta", "beverages", "sandwich"];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories] = useState(staticCategories);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(dummyFoods);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>
          <p className="text-sm mt-1 text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"} available
          </p>
        </div>
      </div>

      <div className="mb-8 p-6 rounded-lg bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Search</label>
            <input
              type="text"
              placeholder="Search food..."
              className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Filter by Category</label>
            <select
              className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🧐</div>
          <h3 className="text-xl font-medium mb-2 text-gray-900">No food items found</h3>
          <p className="mb-6 text-gray-500">Try adjusting your search or filter criteria</p>
          <button
            className="px-6 py-2 rounded-md font-medium bg-indigo-600 text-white"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <ProductGrid products={filteredProducts} />
          <div className="flex justify-between items-center mt-12 text-gray-500">
            Showing 1 to {filteredProducts.length} of {filteredProducts.length} items
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;