import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [cart, setCart] = useState(0);

  const products = [
    {
      id: 1,
      name: "Черная футболка",
      price: 2500,
      image: "/img/bf0cf3f6-a40f-4c02-b7f8-efc978ce9016.jpg"
    },
    {
      id: 2,
      name: "Белый пиджак", 
      price: 12000,
      image: "/img/dc406f39-f62b-48b1-bdf1-1c6da8e92ecf.jpg"
    },
    {
      id: 3,
      name: "Серые брюки",
      price: 6500,
      image: "/img/212dde72-6838-4908-b777-69980eb17084.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black">CLOTHING STORE</h1>
            <Button variant="outline" className="relative">
              🛒 Корзина ({cart})
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-light text-black mb-6">
            Минимализм в моде
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Коллекция премиальной одежды в черно-бело-серой палитре
          </p>
          <Button size="lg" className="bg-black text-white hover:bg-gray-800">
            Перейти в каталог
          </Button>
        </div>
      </section>

      {/* Products */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-black mb-8 text-center">
          Каталог товаров
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl text-black mb-2">
                  {product.name}
                </CardTitle>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-black">
                    {product.price.toLocaleString()} ₽
                  </span>
                  <Badge variant="secondary">Premium</Badge>
                </div>
                <Button 
                  className="w-full bg-black text-white hover:bg-gray-800"
                  onClick={() => setCart(cart + 1)}
                >
                  В корзину
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Бесплатная доставка
              </h3>
              <p className="text-gray-600">При заказе от 5000 ₽</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Легкий возврат
              </h3>
              <p className="text-gray-600">30 дней на возврат</p>
            </div>
            <div>
              <div className="text-4xl mb-4">📏</div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Таблица размеров
              </h3>
              <p className="text-gray-600">Подробные замеры</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; 2024 Clothing Store. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;