import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { LoginForm } from "../features/auth/components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center bg-gray-100">
      <Card className="w-96 h-auto">
        <CardHeader>
          <CardTitle>Login Form</CardTitle>
          <CardDescription>Please Enter Your Credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};
