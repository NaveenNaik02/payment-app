import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useInjection } from "../../../providers";
import { TYPES } from "../../../constants";
import type { IAuthService } from "../../../services/interfaces";

export const LoginForm = () => {
  const service = useInjection<IAuthService>(TYPES.AuthService);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = useCallback(async ({ username, password }: LoginSchema) => {
    const response = await service.login(username, password);
    console.log(response);
  }, [service]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="please enter your username" {...field} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">Password</FormLabel>
              <FormControl>
                <Input placeholder="please enter your password" {...field} type="password" />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" className="mt-4">Login</Button>
      </form>
    </Form>
  );
};
