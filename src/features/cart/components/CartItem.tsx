import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CartLineItem } from "@/services/interfaces";
import { memo } from "react";

export const CartItem = memo(({ itemName, price, qty }: CartLineItem) => {
  return (
    <Card className="min-w-80">
      <CardHeader>
        <CardTitle className="text-lg">{itemName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Quantity: {qty}</p>
      </CardContent>
      <CardFooter>
        <p className="font-bold">${price}</p>
      </CardFooter>
    </Card>
  );
});
