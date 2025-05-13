import { RenderCart } from "@/features/cart/components";

export const CartPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>
      <RenderCart />
      <div className="mt-8 border-t pt-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
