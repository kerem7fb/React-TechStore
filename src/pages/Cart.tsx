import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-lg font-medium text-gray-900">Sepetiniz boş</h2>
          <p className="mt-2 text-sm text-gray-500">
            Alışverişe başlamak için ürünlerimize göz atın.
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sepetim</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain"
              />
              
              <div className="flex-1">
                <Link
                  to={`/product/${item.id}`}
                  className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors"
                >
                  {item.title}
                </Link>
                <div className="text-xl font-bold text-gray-900 mt-2">
                  {item.price.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Ara Toplam</span>
              <span>
                {total.toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                })}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Kargo</span>
              <span>Ücretsiz</span>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Toplam</span>
              <span>
                {total.toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                })}
              </span>
            </div>
          </div>
          <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            Ödemeye Geç
          </button>
        </div>
      </div>
    </div>
  );
}