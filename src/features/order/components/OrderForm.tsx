import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { orderSchema, type OrderSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";
import { useInjection } from "@/providers";
import type { ICatalogService, IOrderService } from "@/services/interfaces";
import { TYPES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const OrderForm = () => {
  const catalogService = useInjection<ICatalogService>(TYPES.CatalogService);
  const cartService = useInjection<IOrderService>(TYPES.OrderService);
  const form = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      productId: "",
      qty: 1,
    },
  });

  const [options, setOptions] = useState<{ name: string; value: string }[]>([]);
  const navigate = useNavigate();

  const getProducts = useCallback(async () => {
    const products = await catalogService.getProducts();
    if (products.length) {
      const newOptions = products.map((product) => ({
        name: product.name,
        value: String(product.id),
      }));
      setOptions(newOptions);
    }
  }, [catalogService]);

  const renderOptions = useCallback(() => {
    return options.map((option) => (
      <SelectItem key={option.value} value={option.value}>
        {option.name}
      </SelectItem>
    ));
  }, [options]);

  const onSubmit = useCallback(
    async (payload: OrderSchema) => {
      try {
        await cartService.createCart(payload);
        navigate("/cart");
      } catch (error) {
        console.log(error);
      }
    },
    [cartService, navigate]
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Item For Adding to Cart</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="min-w-56 text-white">
                    <SelectValue placeholder="select item" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{renderOptions()}</SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qty"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">Quantity</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={1}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 1)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          className="text-white mt-4"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Please wait..!" : "Add to cart"}
        </Button>
      </form>
    </Form>
  );
};
