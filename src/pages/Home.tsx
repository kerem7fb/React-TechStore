import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Product } from '../types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success('Ürün sepete eklendi!');
  };

  const handleFavoriteClick = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast.success('Ürün favorilerden çıkarıldı!');
    } else {
      addToFavorites(product);
      toast.success('Ürün favorilere eklendi!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Ürünlerimiz</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative group">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-200"
                />
              </Link>
              <button
                onClick={() => handleFavoriteClick(product)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>
            <div className="p-4">
              <Link
                to={`/product/${product.id}`}
                className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-2 mb-2"
              >
                {product.title}
              </Link>
              <div className="flex items-center mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">
                  {product.rating.rate} ({product.rating.count} değerlendirme)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  {product.price.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  })}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}