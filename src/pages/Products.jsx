import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdStar, MdShoppingCart, MdLocalOffer } from 'react-icons/md';
import ProductBanner from '../components/ProductBanner';
import EditProductModal from '../components/EditProductModal';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: updatedProduct.title,
          description: updatedProduct.description,
          price: updatedProduct.price,
          discountPercentage: updatedProduct.discountPercentage,
          stock: updatedProduct.stock,
          brand: updatedProduct.brand,
          category: updatedProduct.category
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      
      // Update local state with the returned data
      setProducts(products.map(p => p.id === data.id ? { ...p, ...data } : p));
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      // You might want to show an error message to the user here
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProductBanner />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Our Products</h2>
          <div className="flex space-x-4">
            {/* Add filter/sort options here if needed */}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-56">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                    <MdLocalOffer className="w-4 h-4 mr-1" />
                    {Math.round(product.discountPercentage)}% OFF
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-md flex items-center">
                  <MdStar className="text-yellow-400 w-4 h-4" />
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
                  <span className="text-sm font-medium text-gray-500">{product.brand}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                      {product.discountPercentage > 0 && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${Math.round(product.price * (100 + product.discountPercentage) / 100)}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                  >
                    <MdEdit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
}

export default Products;