import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="px-4 py-8" style={{ backgroundColor: '#F97316' }}> {/* Orange background */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            Our Products
          </h2>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 rounded-md font-medium transition-colors duration-200"
              style={{
                backgroundColor: '#F3F4F6',
                color: '#111827'
              }}
            >
              Filter
            </button>
            <button
              className="px-4 py-2 rounded-md font-medium transition-colors duration-200"
              style={{
                backgroundColor: '#EF4444', // Red-orange button
                color: 'white'
              }}
            >
              Sort
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex justify-center space-x-2">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors duration-200"
            style={{
              backgroundColor: '#EF4444', // Red-orange
              color: 'white'
            }}
          >
            1
          </button>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors duration-200 hover:bg-[#F3F4F6]"
            style={{ color: '#111827' }}
          >
            2
          </button>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors duration-200 hover:bg-[#F3F4F6]"
            style={{ color: '#111827' }}
          >
            3
          </button>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors duration-200"
            style={{
              backgroundColor: '#F3F4F6',
              color: '#111827'
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
