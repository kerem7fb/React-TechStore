import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Product } from '../types';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success('Ürün sepete eklendi!');
    }
  };

  const handleFavoriteClick = () => {
    if (product) {
      if (isFavorite(product.id)) {
        removeFromFavorites(product.id);
        toast.success('Ürün favorilerden çıkarıldı!');
      } else {
        addToFavorites(product);
        toast.success('Ürün favorilere eklendi!');
      }
    }
  };

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count} değerlendirme)
              </span>
            </div>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="text-3xl font-bold text-gray-900">
            {product.price.toLocaleString('tr-TR', {
              style: 'currency',
              currency: 'TRY',
            })}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Sepete Ekle</span>
            </button>
            <button
              onClick={handleFavoriteClick}
              className={`p-3 rounded-lg border ${
                isFavorite(product.id)
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              } transition-colors`}
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite(product.id) ? 'fill-current' : ''
                }`}
              />
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <Truck className="w-5 h-5" />
              <span>2-4 iş günü içinde kargo</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Shield className="w-5 h-5" />
              <span>24 ay garanti</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <RefreshCw className="w-5 h-5" />
              <span>14 gün içinde ücretsiz iade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}