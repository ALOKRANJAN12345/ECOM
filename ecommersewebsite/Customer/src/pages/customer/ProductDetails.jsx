import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext"; // Cart context
import { useAuth } from "../../context/AuthContext"; 
import axios from "axios";
import qrCodeImage from "../../assets/qr-code.jpg";

const dummyFoods = [
  {
    id: 1,
    title: "Margherita Pizza",
    description: "Classic cheese pizza with tomato sauce",
    category: "pizza",
    price: 499,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1601924582975-88bb69b1680f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    title: "Veg Burger",
    description: "Delicious vegetable burger with fresh lettuce",
    category: "burger",
    price: 299,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1606756792556-8f1b7c0a7f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "Pasta Alfredo",
    description: "Creamy white sauce pasta with vegetables",
    category: "pasta",
    price: 399,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1601050693812-19fbc0d4d2a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    title: "Chocolate Shake",
    description: "Rich chocolate milkshake with whipped cream",
    category: "beverages",
    price: 199,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    title: "Grilled Sandwich",
    description: "Toasted sandwich with cheese and veggies",
    category: "sandwich",
    price: 249,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screenshot, setScreenshot] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const { addToCart } = useContext(CartContext);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    const foundProduct = dummyFoods.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  const handleBuyNow = async () => {
    if (!user || !product || !screenshot || !customerName || !whatsappNumber) {
      return alert("Please fill in all details and upload the screenshot.");
    }

    const formData = new FormData();
    formData.append('productId', product.id);
    formData.append('customerId', user._id);
    formData.append('amount', product.price);
    formData.append('customerName', customerName);
    formData.append('whatsappNumber', whatsappNumber);
    formData.append('screenshot', screenshot);

    try {
      await axios.post('http://localhost:5000/api/payments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Payment submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Payment failed');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Product not found</h2>
      <Link to="/products" className="inline-block px-6 py-2 rounded-md font-medium bg-orange-500 text-white">
        Browse Products
      </Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" style={{ backgroundColor: '#F97316' }}> {/* Orange background */}
      <div className="text-sm mb-6 text-white">
        <Link to="/" className="hover:text-yellow-200">Home</Link> / 
        <Link to="/products" className="hover:text-yellow-200"> Menu</Link> / 
        <span className="font-medium"> {product.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 border border-gray-200">
            <img src={product.image} alt={product.title} className="w-full h-96 object-contain p-4" />
          </div>
        </div>

        <div className="lg:w-1/2 text-white">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </div>
            <span className="text-sm opacity-90">
              {product.rating} ({product.stock} available)
            </span>
          </div>

          <div className="mb-6 p-4 rounded-lg bg-orange-200 text-orange-900 font-bold text-3xl">
            ₹{product.price}
          </div>

          <p className="text-lg mb-6">{product.description}</p>

          {/* Customer Details */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />
            <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="e.g. 9876543210"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          {/* Screenshot Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Upload Payment Screenshot</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
              className="border border-gray-300 rounded p-2 w-full"
            />
            {!screenshot && (
              <p className="text-xs text-red-500 mt-1">* Upload screenshot to proceed</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 px-6 py-3 rounded-md font-medium bg-orange-500 text-white hover:bg-orange-600 transition duration-200"
              onClick={() => addToCart({ ...product, quantity: 1 })} // Add to Cart
            >
              Add to Cart
            </button>

            <button
              disabled={!screenshot || !customerName || !whatsappNumber}
              className={`flex-1 px-6 py-3 rounded-md font-medium border transition duration-200 ${
                screenshot && customerName && whatsappNumber
                  ? 'hover:bg-gray-50 border-orange-500 text-orange-500'
                  : 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
              }`}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-16 text-white">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="bg-orange-200 rounded-lg shadow-sm p-6 border border-orange-300 text-orange-900">
          <p className="text-center">No reviews yet. Be the first to review!</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
