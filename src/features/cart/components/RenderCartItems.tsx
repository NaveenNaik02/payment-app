import { TYPES } from "@/constants";
import { useInjection } from "@/providers";
import type { CartLineItem, IOrderService } from "@/services/interfaces";
import { useCallback, useEffect, useState } from "react";
import { CartItem } from "./CartItem";

export const RenderCart = () => {
  const orderService = useInjection<IOrderService>(TYPES.OrderService);
  const [cartItems, setCartItems] = useState<CartLineItem[]>([]);

  const getCartItems = useCallback(async () => {
    try {
      const response = await orderService.getCart();
      setCartItems(response.lineItems);
    } catch (error) {
      console.log(error);
    }
  }, [orderService]);

  const renderCartItems = useCallback(() => {
    return cartItems.map((cart) => <CartItem {...cart} key={cart.id} />);
  }, [cartItems]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
      {renderCartItems()}
    </div>
  );
};
