import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { ProductMaster, ProductMasterFormData } from '../types/productMaster';

interface ProductMasterContextType {
  products: ProductMaster[];
  addProduct: (data: ProductMasterFormData) => void;
  updateProduct: (id: string, data: ProductMasterFormData) => void;
  deleteProduct: (id: string) => void;
}

const ProductMasterContext = createContext<ProductMasterContextType | null>(null);

export function ProductMasterProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductMaster[]>([]);

  const addProduct = (data: ProductMasterFormData) => {
    const newProduct: ProductMaster = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      description: data.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, data: ProductMasterFormData) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? {
              ...product,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <ProductMasterContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductMasterContext.Provider>
  );
}

export function useProductMaster() {
  const context = useContext(ProductMasterContext);
  if (!context) {
    throw new Error('useProductMaster must be used within a ProductMasterProvider');
  }
  return context;
}