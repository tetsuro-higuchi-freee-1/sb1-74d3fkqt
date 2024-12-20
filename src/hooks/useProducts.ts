import { useState } from 'react';
import type { Product } from '../types/roadmap';

export function useProducts(initialProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product = {
      ...newProduct,
      id: Math.random().toString(36).substr(2, 9)
    };
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: string, updatedProduct: Omit<Product, 'id'>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...updatedProduct, id } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };
}