import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import qrCodeImage from "../../assets/qr-code.jpg";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user || !screenshot || !customerName || !whatsappNumber) {
      return alert("Please fill in all details and upload the payment screenshot.");
    }

    try {
      for (const item of cartItems) {
        const formData = new FormData();
        formData.append("foodId", item.id);
        formData.append("customerId", user._id);
        formData.append("amount", item.price * item.quantity);
        formData.append("customerName", customerName);
        formData.append("whatsappNumber", whatsappNumber);
        formData.append("screenshot", screenshot);

        await axios.post("http://localhost:5000/api/payments", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Your order has been placed successfully!");
      clearCart();
    } catch (error) {
      console.error(error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Food Cart</h1>
        <p className="text-sm mt-1 text-gray-500">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4 text-gray-100">🍔</div>
          <h3 className="text-xl font-medium mb-2 text-gray-900">Your cart is empty</h3>
          <p className="mb-6 text-gray-500">Browse our menu to find your favorite dishes</p>
          <button className="px-6 py-3 rounded-md font-medium bg-red-600 text-white">
            Explore Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 text-sm uppercase tracking-wider text-gray-500">
                <div className="col-span-5">Dish</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-4">
                    <div className="grid grid-cols-12 items-center gap-4">
                      <div className="col-span-5 flex items-center space-x-4">
                        <img
                          src={item.image || "/placeholder-food.jpg"}
                          alt={item.title}
                          className="w-20 h-20 rounded-md object-cover bg-gray-100"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </div>

                      <div className="col-span-2 text-center text-gray-900">
                        ₹{item.price.toFixed(2)}
                      </div>

                      <div className="col-span-3 flex justify-center">
                        <div className="flex items-center border rounded-md border-gray-200">
                          <button
                            className="px-3 py-1 text-lg"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            style={{
                              color: item.quantity <= 1 ? "#D1D5DB" : "#EF4444",
                              cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                            }}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                          <button
                            className="px-3 py-1 text-lg text-red-600"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center justify-end space-x-4">
                        <span className="font-medium text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 rounded-md font-medium bg-gray-100 text-gray-900"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button className="px-4 py-2 rounded-md font-medium bg-gray-100 text-gray-900">
                Continue Browsing Menu
              </button>
            </div>
          </div>

          {/* Summary & Checkout */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-bold mb-4 text-gray-900">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-red-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 mb-2"
                  placeholder="Enter your name"
                />
                <label className="text-sm font-medium text-gray-700">WhatsApp Number</label>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="e.g. 9876543210"
                />
              </div>

              {/* QR Code */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Scan QR to Pay</h3>
                <img
                  src={qrCodeImage}
                  alt="Scan QR"
                  className="w-48 h-48 object-contain border rounded"
                />
              </div>

              {/* Screenshot Upload */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700">Upload Payment Screenshot</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files[0])}
                  className="w-full border border-gray-300 rounded p-2"
                />
                {!screenshot && (
                  <p className="text-xs text-red-500 mt-1">* Upload screenshot to proceed</p>
                )}
              </div>

              {/* Checkout Button */}
              <button
                disabled={!screenshot || !customerName || !whatsappNumber}
                onClick={handleCheckout}
                className={`w-full py-3 rounded-md font-medium transition ${
                  screenshot && customerName && whatsappNumber
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
