import { useCallback, useState } from "react";
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
import { MODEL_TYPES, TYPES } from "../../../constants";
import type { IAuthService } from "../../../services/interfaces";
import type { RootStore } from "@/stores";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const service = useInjection<IAuthService>(TYPES.AuthService);
  const store = useInjection<RootStore>(MODEL_TYPES.RootStore);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (payload: LoginSchema) => {
      try {
        const response = await service.login(payload);
        store.authStore.setToken(response.token);
        navigate("/orders");
      } catch (error: unknown) {
        let message = "Login failed. Please try again.";
        if (error instanceof Error) {
          message = error.message;
        }
        setErrorMessage(message);
      }
    },
    [service, store, navigate]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {errorMessage && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="please enter your email" {...field} />
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
                <Input
                  placeholder="please enter your password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          className="mt-4 text-white"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};
