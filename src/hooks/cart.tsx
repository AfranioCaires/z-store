import { Product } from "@/interfaces/product";

import { client } from "@/network/api";
import { createContext, useState, ReactNode } from "react";
interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  getProductQuantity: (id: string) => number;
  addOneToCart: (id: string) => void;
  removeOneFromCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
  getTotalCost: () => number;
}

export const CartContext = createContext<CartContextValue>({
  items: [],
  getProductQuantity: () => 0,
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => 0,
});

const { data } = await client.get<Product[]>(`/products/`);
console.log(data);
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  function getProductQuantity(id: string) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(id: string) {
    const quantity = getProductQuantity(id);
    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id: string) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => currentProduct.id != id)
    );
  }

  function removeOneFromCart(id: string) {
    const quantity = getProductQuantity(id);
    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function getTotalCost() {
    let totalCost = 0;

    cartProducts.map((cartItem) => {
      const filtered = data.find((productInData) => {
        return productInData.id == cartItem.id;
      });
      console.log(filtered);
      if (filtered) {
        totalCost += filtered.price * cartItem.quantity;
      }
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
