import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

export default function Favorites() {
  const { addToCart } = useCart();
  const { favorites, removeFromFavorites } = useFavorites();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success('Ürün sepete eklendi!');
  };

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Heart className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-lg font-medium text-gray-900">
            Favori listeniz boş
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Beğendiğiniz ürünleri favorilere ekleyerek takip edebilirsiniz.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Favorilerim</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map(product => (
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
                onClick={() => removeFromFavorites(product.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              >
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
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