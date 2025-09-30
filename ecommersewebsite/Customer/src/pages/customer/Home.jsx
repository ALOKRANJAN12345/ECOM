import { Link } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { RiArrowUpLine, RiArrowDownLine } from "react-icons/ri";

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      title: "Margherita Pizza",
      price: 9.99,
      category: "Pizza",
      thumbnail: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Cheeseburger",
      price: 7.99,
      category: "Burgers",
      thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "Sushi Platter",
      price: 14.99,
      category: "Sushi",
      thumbnail: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      title: "Chocolate Cake",
      price: 6.99,
      category: "Desserts",
      thumbnail: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Enthusiast",
      comment: "The food is delicious and arrives piping hot! Highly recommended.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular Customer",
      comment: "Fast delivery and tasty meals every time. Love the variety!",
      rating: 4.5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "First-time Buyer",
      comment: "Amazing flavors! The packaging is also very neat. Will order again.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const salesData = [
    { month: "Jan", sales: 12500, trend: "up", percentage: 12 },
    { month: "Feb", sales: 11800, trend: "down", percentage: 5 },
    { month: "Mar", sales: 14500, trend: "up", percentage: 23 },
    { month: "Apr", sales: 16200, trend: "up", percentage: 12 },
    { month: "May", sales: 18900, trend: "up", percentage: 17 },
    { month: "Jun", sales: 21000, trend: "up", percentage: 11 }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (i === fullStars + 1 && hasHalfStar) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
    
    return stars;
  };

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center text-center px-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80')",
          backgroundColor: "#F3F4F6",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 max-w-2xl sm:max-w-4xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Delicious Food, Delivered Fast
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white">
            Pizza, burgers, sushi, and desserts — all in one place!
          </p>
          <Link 
            to="/foodlist" 
            className="inline-block px-8 py-3 bg-[#EF4444] hover:bg-[#DC2626] text-white font-medium rounded-md transition-colors duration-200"
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-gray-900">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { 
              name: "Pizza", 
              image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
            },
            { 
              name: "Burgers", 
              image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
            },
            { 
              name: "Sushi", 
              image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
            },
            { 
              name: "Desserts", 
              image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
            },
          ].map((category, index) => (
            <Link key={index} to="/foodlist" className="relative group">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover rounded-lg shadow-md group-hover:opacity-75 transition"
              />
              <span className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-semibold text-lg rounded-lg">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Collection */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 bg-gray-50">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-gray-900">
          Popular Dishes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="text-[#EF4444] font-bold text-md">${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-gray-900">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">{renderStars(testimonial.rating)}</div>
              <p className="text-gray-600 italic">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;