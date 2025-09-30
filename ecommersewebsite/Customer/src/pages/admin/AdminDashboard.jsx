const AdminDashboard = () => {
  return (
    <div className="p-6" style={{ backgroundColor: '#F97316' }}> {/* Orange background for page */}
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Food Delivery Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-100">
          Welcome Admin! Track orders, manage your menu, and monitor users easily.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-lg shadow-sm bg-white border-t-4 border-orange-600">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Total Orders</h2>
          <p className="text-3xl font-bold text-orange-600">1,245</p>
          <p className="text-sm mt-1 text-green-500">↑ 12% from last month</p>
        </div>

        <div className="p-6 rounded-lg shadow-sm bg-white border-t-4 border-orange-500">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Total Customers</h2>
          <p className="text-3xl font-bold text-orange-600">320</p>
          <p className="text-sm mt-1 text-green-500">↑ 8% from last month</p>
        </div>

        <div className="p-6 rounded-lg shadow-sm bg-white border-t-4 border-orange-400">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Revenue</h2>
          <p className="text-3xl font-bold text-orange-600">$56,300</p>
          <p className="text-sm mt-1 text-green-500">↑ 15% from last month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Quick Actions
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-6 py-3 rounded-md font-medium bg-orange-600 text-white hover:bg-orange-700 transition">
            Manage Orders
          </button>
          <button className="px-6 py-3 rounded-md font-medium bg-orange-600 text-white hover:bg-orange-700 transition">
            Manage Menu
          </button>
          <button className="px-6 py-3 rounded-md font-medium bg-orange-600 text-white hover:bg-orange-700 transition">
            Manage Customers
          </button>
        </div>
      </div>

      {/* Popular Foods */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Popular Foods
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-orange-200">
            <h3 className="font-semibold text-gray-900">Margherita Pizza</h3>
            <p className="text-sm text-gray-500">Ordered 320 times</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-orange-200">
            <h3 className="font-semibold text-gray-900">Veg Burger</h3>
            <p className="text-sm text-gray-500">Ordered 280 times</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-orange-200">
            <h3 className="font-semibold text-gray-900">Pasta Alfredo</h3>
            <p className="text-sm text-gray-500">Ordered 190 times</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Recent Admin Activity
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-gray-200">
          <p className="text-center text-gray-500">
            Recent admin actions like adding menu items, updating orders, and managing customers will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
