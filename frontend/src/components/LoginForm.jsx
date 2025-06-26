import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error);
    }

    setLoading(false);
  };
  return (
    <div className="flex w-full items-center">
    <div className="login-form flex flex-col gap-6 w-full max-w-sm m-auto justify-center">
      <Card >
        <CardHeader className="text-center">
          <CardTitle>Login to LocalTreasure</CardTitle>
          <CardDescription>
            Explore everything happening in your area
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label  htmlFor="email">Email:</Label >
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label  htmlFor="password">Password:</Label >
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

            <Button  type="submit" disabled={loading} >
              {loading ? "Logging in..." : "Login"}
            </Button >
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default LoginForm;
