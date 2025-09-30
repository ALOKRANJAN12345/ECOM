const Orders = () => {
  const orders = [
    { 
      id: '#FD1001', 
      customer: 'John Doe', 
      date: '2023-09-29', 
      items: ['Margherita Pizza', 'Coke'], 
      status: 'Delivered', 
      payment: 'Paid', 
      total: '$25.99' 
    },
    { 
      id: '#FD1002', 
      customer: 'Jane Smith', 
      date: '2023-09-29', 
      items: ['Veg Burger'], 
      status: 'On the way', 
      payment: 'Pending', 
      total: '$10.50' 
    },
    { 
      id: '#FD1003', 
      customer: 'Robert Johnson', 
      date: '2023-09-28', 
      items: ['Pasta Alfredo', 'Coke'], 
      status: 'Preparing', 
      payment: 'Paid', 
      total: '$18.75' 
    },
    { 
      id: '#FD1004', 
      customer: 'Emily Davis', 
      date: '2023-09-28', 
      items: ['Chicken Wrap'], 
      status: 'Pending', 
      payment: 'Pending', 
      total: '$12.20' 
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'On the way': return 'bg-blue-100 text-blue-800';
      case 'Preparing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (payment) => {
    return payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: '#F97316' }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Food Delivery Orders</h1>
          <p className="text-sm text-gray-100">View and manage all food orders</p>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 rounded-md text-sm font-medium bg-white text-gray-900">Export Orders</button>
          <button className="px-4 py-2 rounded-md text-sm font-medium bg-orange-600 text-white hover:bg-orange-700 transition">Create New Order</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 rounded-lg bg-white">
        <select className="px-3 py-2 rounded-md text-sm border border-gray-300">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Preparing</option>
          <option>On the way</option>
          <option>Delivered</option>
        </select>
        <select className="px-3 py-2 rounded-md text-sm border border-gray-300">
          <option>All Payment</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
        <input type="date" className="px-3 py-2 rounded-md text-sm border border-gray-300" />
        <input type="text" placeholder="Search orders..." className="px-3 py-2 rounded-md text-sm border border-gray-300" />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Food Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.items.join(', ')}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPaymentColor(order.payment)}`}>{order.payment}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.total}</td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button className="text-white hover:underline">View</button>
                    <button className="text-white hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-white">Showing 1 to {orders.length} of {orders.length} orders</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md text-sm bg-white text-gray-900">Previous</button>
          <button className="px-3 py-1 rounded-md text-sm bg-orange-600 text-white">1</button>
          <button className="px-3 py-1 rounded-md text-sm bg-white text-gray-900">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
