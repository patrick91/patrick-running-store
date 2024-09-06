"use client";
import { useState } from "react";
import { useCart } from "./cart-context";
import { TShirtCard } from "./tshirt-card";

export function Cart() {
  const [cartOpen, setCartOpen] = useState(true);

  const { cart } = useCart();

  return (
    <div>
      <button onClick={() => setCartOpen(!cartOpen)}>🛒</button>

      {cartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setCartOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 bg-white p-4 shadow-lg overflow-y-auto min-w-56 z-20">
            <h2>Your Cart</h2>
            {cart.length === 0 && <p>Your cart is empty</p>}

            <ul className="grid gap-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <TShirtCard product={item} variant="cart" />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
