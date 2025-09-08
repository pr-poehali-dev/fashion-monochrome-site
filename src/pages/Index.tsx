import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  sizes: string[];
  colors: string[];
  brand: string;
  category: string;
}

interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filters, setFilters] = useState({
    size: '',
    color: '',
    brand: '',
    minPrice: 0,
    maxPrice: 15000,
    category: ''
  });

  const products: Product[] = [
    {
      id: 1,
      name: "Классическая черная футболка",
      price: 2500,
      originalPrice: 3200,
      image: "/img/bf0cf3f6-a40f-4c02-b7f8-efc978ce9016.jpg",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Черный", "Белый", "Серый"],
      brand: "MINIMAL",
      category: "Футболки"
    },
    {
      id: 2,
      name: "Минималистичный пиджак",
      price: 12000,
      image: "/img/dc406f39-f62b-48b1-bdf1-1c6da8e92ecf.jpg",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Белый", "Черный", "Серый"],
      brand: "ELEGANCE",
      category: "Пиджаки"
    },
    {
      id: 3,
      name: "Стильные брюки",
      price: 6500,
      originalPrice: 8000,
      image: "/img/212dde72-6838-4908-b777-69980eb17084.jpg",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Черный", "Серый", "Белый"],
      brand: "CLASSIC",
      category: "Брюки"
    }
  ];

  const addToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => 
        item.product.id === product.id && item.size === size && item.color === color
      );
      
      if (existingItem) {
        return prev.map(item => 
          item === existingItem 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { product, size, color, quantity: 1 }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = products.filter(product => {
    return (
      (!filters.size || product.sizes.includes(filters.size)) &&
      (!filters.color || product.colors.includes(filters.color)) &&
      (!filters.brand || product.brand === filters.brand) &&
      (!filters.category || product.category === filters.category) &&
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice
    );
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black tracking-wide">CLOTHING STORE</h1>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-black hover:text-neutral-600 transition-colors">Новинки</a>
              <a href="#" className="text-black hover:text-neutral-600 transition-colors">Мужское</a>
              <a href="#" className="text-black hover:text-neutral-600 transition-colors">Женское</a>
              <a href="#" className="text-black hover:text-neutral-600 transition-colors">Аксессуары</a>
              <a href="#" className="text-black hover:text-neutral-600 transition-colors">Распродажа</a>
              <a href="#" className="text-black hover:text-neutral-600 transition-colors">О нас</a>
            </nav>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {getItemsCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-black text-white">
                      {getItemsCount()}
                    </Badge>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Корзина покупок</DrawerTitle>
                  <DrawerDescription>
                    {cart.length === 0 ? 'Корзина пуста' : `Товаров в корзине: ${getItemsCount()}`}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="px-4 max-h-96 overflow-y-auto">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-neutral-600">
                            {item.size} • {item.color} • Кол-во: {item.quantity}
                          </p>
                          <p className="font-medium">{item.product.price.toLocaleString()} ₽</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFromCart(index)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <DrawerFooter>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Итого: {getTotalPrice().toLocaleString()} ₽</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-black text-white hover:bg-neutral-800">
                        Оформить заказ
                      </Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Закрыть</Button>
                      </DrawerClose>
                    </div>
                  </DrawerFooter>
                )}
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-light text-black mb-6 tracking-wide">
            Минимализм в моде
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Откройте для себя коллекцию премиальной одежды в черно-бело-серой палитре
          </p>
          <Button size="lg" className="bg-black text-white hover:bg-neutral-800 px-8">
            Перейти в каталог
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">Фильтры</h3>
              
              {/* Size Filter */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-black">Размер</label>
                <Select value={filters.size} onValueChange={(value) => setFilters(prev => ({ ...prev, size: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите размер" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все размеры</SelectItem>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                    <SelectItem value="XXL">XXL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Color Filter */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-black">Цвет</label>
                <Select value={filters.color} onValueChange={(value) => setFilters(prev => ({ ...prev, color: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите цвет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все цвета</SelectItem>
                    <SelectItem value="Черный">Черный</SelectItem>
                    <SelectItem value="Белый">Белый</SelectItem>
                    <SelectItem value="Серый">Серый</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Brand Filter */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-black">Бренд</label>
                <Select value={filters.brand} onValueChange={(value) => setFilters(prev => ({ ...prev, brand: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите бренд" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все бренды</SelectItem>
                    <SelectItem value="MINIMAL">MINIMAL</SelectItem>
                    <SelectItem value="ELEGANCE">ELEGANCE</SelectItem>
                    <SelectItem value="CLASSIC">CLASSIC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-black">Категория</label>
                <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все категории</SelectItem>
                    <SelectItem value="Футболки">Футболки</SelectItem>
                    <SelectItem value="Пиджаки">Пиджаки</SelectItem>
                    <SelectItem value="Брюки">Брюки</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-black">Цена</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="От"
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      minPrice: Number(e.target.value) || 0
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="До"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      maxPrice: Number(e.target.value) || 15000 
                    }))}
                  />
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={() => setFilters({ size: '', color: '', brand: '', minPrice: 0, maxPrice: 15000, category: '' })}
                className="w-full"
              >
                Сбросить фильтры
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-black">Каталог товаров</h2>
              <p className="text-neutral-600">{filteredProducts.length} товаров найдено</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 animate-fade-in">
                  <CardHeader className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg bg-neutral-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg text-black">{product.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">{product.brand}</Badge>
                    </div>
                    <CardDescription className="text-neutral-600 mb-3">
                      {product.category}
                    </CardDescription>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl font-semibold text-black">
                        {product.price.toLocaleString()} ₽
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-neutral-500 line-through">
                          {product.originalPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Размеры:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.map(size => (
                            <Badge key={size} variant="outline" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Цвета:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.colors.map(color => (
                            <Badge key={color} variant="outline" className="text-xs">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full bg-black text-white hover:bg-neutral-800"
                      onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                    >
                      <Icon name="ShoppingBag" className="w-4 h-4 mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Package" size={48} className="mx-auto text-neutral-400 mb-4" />
                <h3 className="text-xl font-medium text-black mb-2">Товары не найдены</h3>
                <p className="text-neutral-600">Попробуйте изменить фильтры поиска</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <Icon name="Truck" size={48} className="mx-auto text-black" />
              <h3 className="text-xl font-semibold text-black">Бесплатная доставка</h3>
              <p className="text-neutral-600">При заказе от 5000 ₽</p>
            </div>
            <div className="space-y-4">
              <Icon name="RotateCcw" size={48} className="mx-auto text-black" />
              <h3 className="text-xl font-semibold text-black">Легкий возврат</h3>
              <p className="text-neutral-600">30 дней на возврат товара</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto flex items-center justify-center">
                <span className="text-3xl">📏</span>
              </div>
              <h3 className="text-xl font-semibold text-black">Таблица размеров</h3>
              <p className="text-neutral-600">Подробные замеры всех моделей</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-black mb-4">О нас</h3>
              <ul className="space-y-2 text-neutral-600">
                <li><a href="#" className="hover:text-black transition-colors">История бренда</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Философия</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Карьера</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Помощь</h3>
              <ul className="space-y-2 text-neutral-600">
                <li><a href="#" className="hover:text-black transition-colors">Доставка и оплата</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Возврат и обмен</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Таблица размеров</a></li>
                <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Контакты</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>+7 (495) 123-45-67</li>
                <li>info@clothingstore.ru</li>
                <li>Москва, ул. Тверская, 1</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Социальные сети</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-600 hover:text-black transition-colors">
                  <Icon name="Instagram" size={24} />
                </a>
                <a href="#" className="text-neutral-600 hover:text-black transition-colors">
                  <Icon name="Facebook" size={24} />
                </a>
                <a href="#" className="text-neutral-600 hover:text-black transition-colors">
                  <Icon name="Twitter" size={24} />
                </a>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-neutral-600">
            <p>&copy; 2024 Clothing Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;